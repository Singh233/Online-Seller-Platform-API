/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const db = require("./config/mongoose");

const port = process.env.PORT || 8000;

// instance of express app
const app = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(multerMid.single("filepond"));

// urlencoded to decode the data send by forms
app.use(express.urlencoded({ extended: true }));

// json to decode the data send in form of json
app.use(express.json());

// use cors
app.use(
  cors({
    origin: [
      "https://sellerplatform.sanam.tech",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://192.168.0.5:5173",
      "http://192.168.0.8:5173",
    ],
  })
);

app.use("/api/v1/", require("./routes/api/v1/index"));

app.listen(port, (error) => {
  if (error) return console.log("Error in running express server: ", error);
  console.log(`Server running at http://localhost:${port}/api/v1`);
});
