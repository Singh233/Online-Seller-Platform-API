const express = require("express");

const router = express.Router();

router.use("/sellers", require("./sellers"));

router.use("/store", require("./store"));

router.use("/category", require("./category"));

router.use("/products", require("./product"));

module.exports = router;
