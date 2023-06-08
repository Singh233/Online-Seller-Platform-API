const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  SP: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
