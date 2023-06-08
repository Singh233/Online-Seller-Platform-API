/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default:
      "https://techcrunch.com/wp-content/uploads/2022/12/lensa-ai-magic-avatar.jpg",
  },
  storeTimings: {
    type: String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
