/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("joi");

const Seller = require("../../../models/seller");
const Store = require("../../../models/store");
const uploadImage = require("../../../helper/imageUpload");

const env = require("../../../config/environment");
const { Category, Subcategory } = require("../../../models/category");
const Product = require("../../../models/product");

const fieldsValidator = Joi.object({
  address: Joi.string().required(),
  gst: Joi.string().required(),
  storeTimings: Joi.string().required(),
});

// helper function to handle the response
const handleResponse = (res, status, message, data, success) => {
  const response = {
    message,
    data,
    success,
  };
  return res.status(status).json(response);
};

module.exports.createStore = async function (request, response) {
  try {
    const { user } = request;
    if (!user) {
      return handleResponse(response, 401, "Unauthorized", {}, false);
    }

    // validate the fields
    const { value, error } = fieldsValidator.validate(request.body);

    if (error) {
      return handleResponse(response, 422, "Invalid fields", { error }, false);
    }
    const { file } = request;

    if (!file) {
      return handleResponse(response, 400, "File not uploaded", {}, false);
    }

    let imageUrl = null;
    try {
      imageUrl = await uploadImage(file);
    } catch {
      return handleResponse(response, 400, "File not uploaded", {}, false);
    }

    // this is saving the path of the uploaded file into the field in the seller
    const newStore = await Store.create({
      address: value.address,
      seller: user._id,
      logo: imageUrl,
      gst: value.gst,
      storeTimings: value.storeTimings,
    });

    // populate the seller of newStore
    await newStore.populate("seller");

    return handleResponse(
      response,
      200,
      "Store created successfully",
      { store: newStore },
      true
    );
  } catch (error) {
    return handleResponse(response, 500, "Internal server error", {}, false);
  }
};

// Get store
module.exports.getStore = async function (request, response) {
  try {
    // validate the request params
    const { value, error } = Joi.object({
      storeName: Joi.string().required().min(1).max(100),
    }).validate(request.params);

    if (error) {
      return handleResponse(response, 422, "Invalid fields", { error }, false);
    }

    const seller = await Seller.findOne({ businessName: value.storeName });

    if (!seller) {
      return handleResponse(
        response,
        404,
        "Business doesn't exists!",
        { error },
        false
      );
    }
    const store = await Store.findOne({ seller: seller._id });
    const categories = await Category.find({ seller: seller._id });
    const subCategories = await Subcategory.find({ seller: seller._id });
    const products = await Product.find({ seller: seller._id });

    return handleResponse(
      response,
      200,
      "Seller profile",
      { seller, store, categories, subCategories, products },
      true
    );
  } catch (error) {
    return handleResponse(response, 500, "Internal server error", {}, false);
  }
};
