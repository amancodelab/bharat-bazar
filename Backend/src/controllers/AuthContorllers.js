const SellerServices = require("../services/SellerServices");
const successResponse = require("../utils/response/successResponse");
const errorResponse = require("../utils/response/errorResponse");
const VerifyEmailServices = require("../services/Auth/VerifyEmailServices");
const UserService = require("../services/UserServices");
const { generateOtp } = require("../utils/OtpProvider");
const UserServices = require("../services/UserServices");
const AdminServies = require("../services/AdminServies");
const createAccessTokenFromRefreshToken = require("../services/Auth/createAccessTokenByRefreshToken");
const UserRole = require("../domain/UserRole");
const Admin = require("../models/Admin");

class AuthControllers {

  // CREATE SELLER
  async createSeller(req, res) {

    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Enter the data carefully");
      }

      const seller = await SellerServices.createSeller(req.body);

      try {

        await VerifyEmailServices.generatedOtp(req.body.email);

      } catch (error) {
        await Seller.findOneAndDelete({
          email: req.body.email
        });
        await Address.findByIdAndDelete(
          savePickupAddress._id
        );
        throw new Error(
          error.message
        );
      }



      return successResponse(res, 201, "Seller registered successfully. OTP sent to email.", seller);
    } catch (error) {

      return errorResponse(res, 500, error.message);
    }
  }

  async createUser(req, res) {

    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Enter the data carefully");
      }
      const userdata = req.body;

      const user = await UserServices.createUser(userdata);

      try {

        await VerifyEmailServices.generatedOtp(req.body.email);

      } catch (error) {
        await User.findOneAndDelete({
          email: req.body.email
        });
        await Address.findByIdAndDelete(
          savePickupAddress._id
        );
        return errorResponse(res, 400, "Failed to generated Otp")
      }


      return successResponse(res, 201, "Seller registered successfully. OTP sent to email.", user);
    } catch (error) {

      return errorResponse(res, 500, error.message);
    }
  }

  // create Admin 
  async createAdmin(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Enter the data carefully");
      }
      const admindata = req.body;

      const admin = await AdminServies.createAdmin(admindata);

      try {

        await VerifyEmailServices.generatedOtpForAdmin(admin.email);

      } catch (error) {
        console.log(error.message);
        return errorResponse(res, 400, error.message);
      }
      return successResponse(res, 201, "Admin registered successfully. OTP sent to email.", admin);
    } catch (error) {

      return errorResponse(res, 500, error.message);
    }
  }


  async verifyAdmin(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Enter the data carefully");
      }

      const { email, otp } = req.body;

      if (!email || !otp) {
        return errorResponse(
          res,
          400,
          "Missing OTP or Email in body"
        );
      }

      const method = req.body.method || req.params.method || "signup"

      const {
        accessToken,
        refreshToken,
        adminId,
      } = await VerifyEmailServices.verifyOtpForAdmin(
        otp,
        email,
        method
      );

      res.cookie("refreshToken_admin", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return successResponse(
        res,
        200,
        "Admin verified successfully",
        {
          adminId,
          accessToken,
        }
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async adminLogin(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Enter the data carefully");
      }
      const admindata = req.body;
      if (!admindata.email) {
        return errorResponse(res, 400, "Missing the email in body");
      }

      await AdminServies.fetchAdmin(admindata.email);

      await VerifyEmailServices.generatedOtpForAdmin(admindata.email);

      return successResponse(res, 200, " OTP sent to email.");
    } catch (error) {

      return errorResponse(res, 500, error.message);
    }
  }

  async createAccessToken(req, res) {
    try {
      console.log("req.user in controller:", req.user);
      const role = req.params?.role;
      if (!role) {
        return errorResponse(res, 400, "Missing the role in params");
      }
      let refreshToken = "";
      if (role === UserRole.CUSTOMER) {
        refreshToken = req.cookies?.refreshToken;
      } else if (role === UserRole.SELLER) {
        refreshToken = req.cookies?.refreshToken_seller;
      } else if (role === UserRole.ADMIN) {
        refreshToken = req.cookies?.refreshToken_admin;
      } else {
        return errorResponse(res, 400, "Invalid the User Role check the userRole in the Router Correctly")
      }

      if (!refreshToken) {
        return errorResponse(res, 401, "Refresh token not found");
      }

      const result = await createAccessTokenFromRefreshToken(refreshToken);

      return successResponse(
        res,
        200,
        "Access token generated successfully",
        result
      );
    } catch (error) {
      return errorResponse(res, 401, error.message);
    }
  }

  async getAdminProfile(req, res) {
    try {
      const admin = await Admin.findById(req.user._id).select("-password");

      if (!admin) {
        return errorResponse(res, 404, "Admin not found");
      }

      return successResponse(
        res,
        200,
        "Admin profile fetched successfully",
        admin
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }


  async adminLogout(req, res) {
    try {
      res.cookie("refreshToken_admin", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(0),
      });

      return successResponse(
        res,
        200,
        "Admin logged out successfully"
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async sellerLogout(req, res) {
    try {
      res.clearCookie("refreshToken_seller", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      });
      return successResponse(
        res,
        200,
        "Admin logged out successfully"
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

}


module.exports = new AuthControllers();