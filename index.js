/* eslint-disable consistent-return */
const express = require("express");
const cors = require("cors");

const db = require("./config/mongoose");

const port = process.env.PORT || 8000;

// instance of express app
const app = express();

// urlencoded to decode the data send by forms
app.use(express.urlencoded());

// json to decode the data send in form of json
app.use(express.json());

app.use("/api/v1/", require("./routes/api/v1/index"));

app.listen(port, (error) => {
  if (error) return console.log("Error in running express server: ", error);
  console.log(`Server running at http://localhost:${port}/api/v1`);
});
