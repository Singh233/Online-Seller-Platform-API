const express = require("express");
const passport = require("passport");

const router = express.Router();

const storeController = require("../../../controllers/api/v1/storeController");

// router for creating new store
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  storeController.createStore
);

module.exports = router;
