const Otp = require("../../models/Otp");
const bcrypt = require("bcrypt");

const VerifyOtp = async (otp, email) => {
  try {
    const otpData = await Otp.findOne({ email });
    if (!otpData) {
      console.log("No Otp found")
      throw new Error('Please generate OTP');
    }
    const isverified = await bcrypt.compare(otp, otpData.otpHash);
    if (!isverified) {
      console.log("Invalid Otp");
      throw new Error('Invalid Otp');
    }
    console.log("OTP verified successfully");
    return true
  } catch (error) {
    throw new Error(`Failed to Verify the Otp\n${error.message}`)
  }
}

module.exports = VerifyOtp;