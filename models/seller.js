const mongoose = require("mongoose");

// Creating user schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    businessName: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://techcrunch.com/wp-content/uploads/2022/12/lensa-ai-magic-avatar.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model("Seller", userSchema);

module.exports = Seller;
