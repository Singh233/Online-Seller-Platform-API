const express = require("express");

const router = express.Router();
const passport = require("passport");

router.get("/", (request, response) =>
  response.status(200).send({
    success: true,
  })
);

module.exports = router;
