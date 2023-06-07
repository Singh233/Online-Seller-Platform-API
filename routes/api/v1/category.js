const express = require("express");
const passport = require("passport");

const router = express.Router();

const categoryController = require("../../../controllers/api/v1/categoryController");

// router for creating new category
router.post(
  "/create-category",
  passport.authenticate("jwt", { session: false }),
  categoryController.createCategory
);

// router for creating new sub category
router.post(
  "/create-subcategory",
  passport.authenticate("jwt", { session: false }),
  categoryController.createSubCategory
);

module.exports = router;
