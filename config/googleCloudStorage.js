/* eslint-disable import/no-extraneous-dependencies */
const Cloud = require("@google-cloud/storage");
const path = require("path");

const serviceKey = path.join(__dirname, "../gcKey.json");

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "online-seller-platform",
});

module.exports = storage;
