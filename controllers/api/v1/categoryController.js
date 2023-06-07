/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("joi");

const Seller = require("../../../models/seller");
const { Category, Subcategory } = require("../../../models/category");

const fieldsValidator = Joi.object({
  name: Joi.string().required().min(0).max(100),
  categoryId: Joi.string(),
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

module.exports.createCategory = async function (request, response) {
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

    // check if the category already exists
    const category = await Category.findOne({
      name: value.name,
      seller: user._id,
    });

    if (category) {
      return handleResponse(
        response,
        401,
        "Category already exists!",
        {},
        false
      );
    }

    // create new category
    const newCategory = await Category.create({
      name: value.name,
      seller: user._id,
    });

    return handleResponse(
      response,
      200,
      "Category created successfully",
      { category: newCategory },
      true
    );
  } catch (error) {
    return handleResponse(response, 500, "Internal server error", {}, false);
  }
};

module.exports.createSubCategory = async function (request, response) {
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

    // check if the subcategory already exists
    const subcategory = await Subcategory.findOne({
      name: value.name,
      seller: user._id,
    });

    if (subcategory) {
      return handleResponse(
        response,
        401,
        "SubCategory already exists!",
        {},
        false
      );
    }

    // create new subcategory
    const newSubcategory = await Subcategory.create({
      name: value.name,
      category: value.categoryId,
      seller: user._id,
    });

    // push subcategory to category subcategories array
    const category = await Category.findById(value.categoryId);
    category.subcategories.push(newSubcategory._id);
    await category.save();

    return handleResponse(
      response,
      200,
      "Subcategory created successfully",
      { subCategory: newSubcategory },
      true
    );
  } catch (error) {
    return handleResponse(response, 500, "Internal server error", {}, false);
  }
};
