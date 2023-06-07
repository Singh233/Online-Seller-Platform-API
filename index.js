/* eslint-disable consistent-return */
const express = require("express");

const port = process.env.PORT || 8000;
const cors = require("cors");

// instance of express app
const app = express();

app.use("/api/v1/", require("./routes/api/v1/index"));

app.listen(port, (error) => {
  if (error) return console.log("Error in running express server: ", error);
  console.log(`Server running at http://localhost:${port}/api/v1`);
});
