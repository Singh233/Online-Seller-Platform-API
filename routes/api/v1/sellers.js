const express = require("express");

const router = express.Router();

const sellerController = require("../../../controllers/api/v1/sellersController");

// Sign up seller route
router.post("/sign-up", sellerController.signUpSeller);

// Sign in seller router
router.post("/sign-in", sellerController.signInSeller);

// Route for seller profile
router.get("/profile/:id", sellerController.profile);

module.exports = router;
