const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },

  otpHash: {
    type: String,
    required: [true, "OTP hash is required"],
  },

  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 600
  }

}, {
  timestamps: true,
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;