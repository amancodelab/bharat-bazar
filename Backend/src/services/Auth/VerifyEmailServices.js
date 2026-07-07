const SellerServices = require("../SellerServices");
const OtpProvider = require("../../utils/OtpProvider");
const UserServices = require("../UserServices");
const bcryptHash = require("../../utils/Auth/bcryptHash");
const Otp = require("../../models/Otp");
const JwtProvider = require("../../utils/JwtProvider");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../EmailServices");
const AccountStatus = require("../../domain/AccouontStatus");
const Cart = require('../../models/Cart');
const AdminServies = require("../AdminServies");

class VerifyEmailService {
  async generatedOtp(email, method = "create") {
    try {
      console.log("generated is method is running")
      if (method === "login") {
        await SellerServices.getSellerByEmail(email);
      }
      email = email.toLowerCase().trim();
      await Otp.deleteOne({ email });

      const otp = OtpProvider.generateOtp();
      console.log(otp);
      const html = OtpProvider.getOtpHtml(otp);
      const otpHash = await bcryptHash(otp);
      await Otp.create({
        email,
        otpHash,
      });

      //send Email 
      await sendEmail(
        email,
        "Otp Verification for Bharat bazar",
        otp,
        html
      );

      return true

    } catch (error) {
      console.error(`Failed to generate OTP\nError Message:${error.message}`);
      throw new Error("Failed to generate OTP")
    };
  }

  async generatedOtpForUser(email, method = "create") {
    try {
      console.log("generated is method is running")
      if (method === "login") {
        await UserServices.getUserByEmail(email);
      }
      email = email.toLowerCase().trim();
      await Otp.deleteOne({ email });

      const otp = OtpProvider.generateOtp();
      console.log("new otp");
      console.log(otp);
      const html = OtpProvider.getOtpHtml(otp);
      const otpHash = await bcryptHash(otp);
      await Otp.create({
        email,
        otpHash,
      });

      //send Email 
      await sendEmail(
        email,
        "Otp Verification for Bharat bazar",
        otp,
        html
      );

      return true

    } catch (error) {
      console.error(`Failed to generate OTP\nError Message:${error.message}`);
      throw new Error("Failed to generate OTP")
    };
  }

  async verifyOtp(otp, email, method = "create") {
    try {

      email = email.toLowerCase().trim();

      const otpData = await Otp.findOne({ email });

      if (!otpData) {
        console.log("NO Otp found in Otp model")
        throw new Error('Please generate OTP');
      }


      const isVerified = await bcrypt.compare(otp, otpData.otpHash);
      if (!isVerified) {
        throw new Error('Invalid Otp');
      };

      const seller = await SellerServices.getSellerByEmail(email);

      if (method === "create") {

        seller.accountStatus = AccountStatus.ACTIVE;
        await seller.save();
        await Otp.deleteOne({ email });

      }

      if (method !== "login") {
        return true;
      };

      const payload = {
        id: seller._id,
        email: seller.email,
        role: seller.role
      };

      if (seller.accountStatus !== AccountStatus.ACTIVE) {
        console.log("failed to login Seller as First complete the Accouont verification:", seller.accountStatus, "===", AccountStatus.ACTIVE);
        throw new Error('Please complete account verification');
      };

      const refreshToken = JwtProvider.createJwt(payload);
      if (!refreshToken) {
        throw new Error("Failed to created the Refresh token");
      }
      const accessToken = JwtProvider.createJwtAccessToken(payload);
      if (!accessToken) {
        throw new Error('Failed to created the Access token');
      };
      await Otp.deleteOne({ email });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Failed to Verify the Otp\n${error.message}`)
    }
  };

  async verifyOtpForUser(otp, email, method = "create") {
    try {
      email = email.toLowerCase().trim();
      const otpData = await Otp.findOne({ email });
      if (!otpData) {
        console.log("NO Otp found in Otp model")
        throw new Error('Please generate OTP');
      }
      const isVerified = await bcrypt.compare(otp, otpData.otpHash);
      if (!isVerified) {
        throw new Error('Invalid Otp');
      };


      const user = await UserServices.getUserByEmail(email);

      if (method === "create") {
        const cart = await Cart.create({ user: user._id });
        user.cart = cart._id;
        user.accountStatus = AccountStatus.ACTIVE;
        await Otp.deleteOne({ email });
        await user.save();

      }

      console.log("OTP verified successfully");

      if (method !== "login") {
        return true;
      };

      const payload = {
        id: user._id,
        email: user.email,
        role: user.role
      };

      if (user.accountStatus !== AccountStatus.ACTIVE) {
        throw new Error('Please complete account verification');
      };

      const refreshToken = JwtProvider.createJwt(payload);
      if (!refreshToken) {
        throw new Error("Failed to created the Refresh token");
      }
      const accessToken = JwtProvider.createJwtAccessToken(payload);
      if (!accessToken) {
        throw new Error('Failed to created the Access token');
      };
      await Otp.deleteOne({ email });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Failed to Verify the Otp\n${error.message}`)
    }

  }

  // generate the Opt for email verifaction 

  async generatedOtpForAdmin(email) {
    try {

      email = email.toLowerCase().trim();
      await Otp.deleteOne({ email });

      const otp = OtpProvider.generateOtp();
      console.log("new otp");
      console.log(otp);

      const html = OtpProvider.getOtpHtml(otp);
      const otpHash = await bcryptHash(otp);
      await Otp.create({
        email,
        otpHash,
      });

      //send Email 
      await sendEmail(
        email,
        "Otp Verification for Bharat bazar",
        otp,
        html
      );

      return true

    } catch (error) {
      console.error(`Failed to generate OTP\nError Message:${error.message}`);
      throw new Error("Failed to generate OTP")
    };
  }
  // for admin email verification 
  async verifyOtpForAdmin(otp, email, method = "signup") {
    try {
      email = email.toLowerCase().trim();
      const otpData = await Otp.findOne({ email });
      if (!otpData) {
        console.log("No Otp found in Otp model")
        throw new Error('Please generate OTP');
      }
      const isVerified = await bcrypt.compare(otp, otpData.otpHash);
      if (!isVerified) {
        throw new Error('Invalid Otp');
      };


      const admin = await AdminServies.fetchAdmin(email);

      if (method === "signup") {
        admin.accountStatus = AccountStatus.ACTIVE;
        await admin.save();

      }

      if (admin.accountStatus !== AccountStatus.ACTIVE) {
        throw new Error('Please complete account verification');
      };

      await Otp.deleteOne({ email });
      console.log("OTP verified successfully");

      const payload = {
        id: admin._id,
        email: admin.email,
        role: admin.role
      };



      const refreshToken = JwtProvider.createJwt(payload);
      if (!refreshToken) {
        throw new Error("Failed to created the Refresh token");
      }
      const accessToken = JwtProvider.createJwtAccessToken(payload);
      if (!accessToken) {
        throw new Error('Failed to created the Access token');
      };

      return { adminId: admin._id, accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Failed to Verify the Otp\n${error.message}`)
    }

  }
}

module.exports = new VerifyEmailService();