/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("joi");

const Seller = require("../../../models/seller");
const env = require("../../../config/environment");

const fieldsValidator = Joi.object({
  email: Joi.string().email().required(),
  businessName: Joi.string().required(),
  password: Joi.string().required(),
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

// Function to create a new seller
module.exports.signUpSeller = async function (request, response) {
  try {
    // validate the fields
    const { value, error } = fieldsValidator.validate(request.body);

    if (error) {
      return handleResponse(response, 422, "Invalid fields", { error }, false);
    }

    // find seller
    const seller = await Seller.findOne({ email: value.email });

    // if doesn't exists create one
    if (!seller) {
      const newSeller = await Seller.create(value);

      // expires in 11 days
      const expiresIn = 11 * 24 * 60 * 60 * 1000;

      return handleResponse(
        response,
        200,
        "Sign up successfull",
        {
          seller: newSeller,
        },
        true
      );
    }

    // else if existss return response
    return handleResponse(response, 422, "User already exists", {}, false);
  } catch (error) {
    return handleResponse(response, 500, "Internal server error", {}, false);
  }
};
