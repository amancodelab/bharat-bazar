const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true
  },
  mrp: {
    type: Number,
    required: [true, "MRP is required"],

  },
  sellingPrice: {
    type: Number,
    required: [true, "Selling Price is required"],
  },
  discountPercent: {
    type: Number,
    required: [true, "discount percentage is required"],

  },
  quantity: {
    type: Number,
    required: [true, "Quanity  is required"],

  },
  images: {
    type: [String],
    required: [true, "image  is required"],

  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "Seller is required"],
  },
  size: {
    type: String,
    required: [true, "size is required"]
  },
  color: {
    type: String,
    default: "none"
  }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
