const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    discount: {
      type: Number,
      required: true,
    },

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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deal", dealSchema);