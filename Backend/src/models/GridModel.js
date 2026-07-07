const mongoose = require("mongoose");

const gridSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    level1: {
      type: String,
      required: true,
    },

    level2: {
      type: String,
      required: true,
    },

    level3: {
      type: String,
      default: "",
    },

    position: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grid", gridSchema);