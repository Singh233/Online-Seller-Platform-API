/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const Seller = require("../../../models/seller");
const env = require("../../../config/environment");

const saltRounds = 10;

const fieldsValidator = Joi.object({
  email: Joi.string().email().required(),
  businessName: Joi.string(),
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
      const { password } = value;

      // encrypt password using bcrypt
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      const newSeller = await Seller.create({ ...value, password: hash });

      // expires in 11 days
      const expiresIn = 11 * 24 * 60 * 60 * 1000;

      return handleResponse(
        response,
        200,
        "Sign up successfull",
        {
          token: jwt.sign(newSeller.toJSON(), env.jwt_secret, { expiresIn }), //
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

// function to sign in to the application
module.exports.signInSeller = async function (request, response) {
  try {
    // validate the fields
    const { value, error } = fieldsValidator.validate(request.body);

    if (error) {
      return handleResponse(response, 422, "Invalid fields", { error }, false);
    }

    const seller = await Seller.findOne({ email: value.email }).select(
      "+password"
    );

    // seller not found
    if (!seller) {
      return handleResponse(
        response,
        422,
        "Invalid username or password",
        {},
        false
      );
    }

    const result = await bcrypt.compare(value.password, seller.password);

    // password doesn't match
    if (!result) {
      return handleResponse(
        response,
        422,
        "Invalid username or password",
        {},
        false
      );
    }

    // remove the password from the user object
    seller.password = undefined;

    // expires in 11 days
    const expiresIn = 11 * 24 * 60 * 60 * 100;

    return handleResponse(
      response,
      200,
      "Sign in successfull, here is your token, please keep it safe!",
      {
        token: jwt.sign(seller.toJSON(), env.jwt_secret, { expiresIn }), //
        user: seller,
      },
      true
    );
  } catch (error) {
    return handleResponse(response, 500, "Internal server error", {}, false);
  }
};
