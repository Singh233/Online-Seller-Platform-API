const express = require("express");
const passport = require("passport");

const router = express.Router();

const productController = require("../../../controllers/api/v1/productController");

// router for creating new product
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  productController.createProduct
);

module.exports = router;
