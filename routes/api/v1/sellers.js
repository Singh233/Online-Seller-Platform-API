const express = require("express");

const router = express.Router();

const sellerController = require("../../../controllers/api/v1/sellersController");

// Sign up seller route
router.post("/sign-up", sellerController.signUpSeller);

module.exports = router;
