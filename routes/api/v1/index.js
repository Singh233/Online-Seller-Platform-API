const express = require("express");

const router = express.Router();
const passport = require("passport");

router.use("/sellers", require("./sellers"));

router.use("/store", require("./store"));

module.exports = router;
