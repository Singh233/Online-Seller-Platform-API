/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("joi");

const Product = require("../../../models/product");
const Store = require("../../../models/store");
const uploadImage = require("../../../helper/imageUpload");

const fieldsValidator = Joi.object({
  sellerId: Joi.string().required(),
  storeId: Joi.string().required(),
  categoryId: Joi.string().required(),
  subCategoryId: Joi.string().required(),
  productName: Joi.string().required(),
  MRP: Joi.number().required(),
  SP: Joi.number().required(),
  quantity: Joi.number().required(),
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

module.exports.createProduct = async function (request, response) {
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
    const newProduct = await Product.create({
      seller: value.sellerId,
      store: value.storeId,
      category: value.categoryId,
      subcategory: value.subCategoryId,
      productName: value.productName,
      MRP: value.MRP,
      SP: value.SP,
      quantity: value.quantity,
      images: [imageUrl],
    });

    return handleResponse(
      response,
      200,
      "Product created successfully",
      { product: newProduct },
      true
    );
  } catch (error) {
    return handleResponse(response, 500, "Internal server error", {}, false);
  }
};
