const SellerServices = require("../services/SellerServices");
const successResponse = require("../utils/response/successResponse");
const errorResponse = require("../utils/response/errorResponse");
const VerifyEmailServices = require("../services/Auth/VerifyEmailServices");
const AccountStatus = require("../domain/AccouontStatus");

class SellerControllers {

  // controller for the getSellerProfile

  async getSellerProfile(req, res) {
    try {
      if (!req.seller) {
        return errorResponse(res, 401, "unauthorise access and access denied!")
      };

      return successResponse(res, 200, "fetch the Seller Profile success", req.seller.profileImage);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
  // to get all seller list
  async getAllSellers(req, res) {
    try {
      const sellers = await SellerServices.getAllSellers();
      if (sellers.length === 0) {
        return errorResponse(res, 404, "No seller is Registered till now");
      };
      return successResponse(res, 200, "Successfully fetch all seller list", sellers);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getAllSellerByAccountStatus(req, res) {
    try {
      if (!req.body.accountStatus) {
        return errorResponse(res, 400, "Missing the accountStatus");
      };
      const sellers = await SellerServices.getAllSellerAccountStatus(req.body.accountStatus);

      if (sellers.length === 0) {
        return errorResponse(res, 404, "No seller is Registered till now");
      };
      return successResponse(res, 200, "Successfully fetch all seller list", sellers);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
  // update seller with id
  async updateSeller(req, res) {
    try {
      if (!req.seller) {
        return errorResponse(res, 401, "unauthorise access and access denied!")
      };
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "seller details");
      };

      const sellerData = {
        sellerName: req.body.sellerName | req.params.sellerName,
        mobile: req.body.mobile | req.params.mobile,
        profileImage: req.body.profileImage | req.params.profileImage,
        pickupAddress: req.body.pickupAddress | req.params.pickupAddress,
      };
      const seller = await SellerServices.updateSeller(req.seller._id, sellerData);

      return successResponse(res, 200, "Successfully updated the Seller", seller);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }


  async updateSellerAccountStatus(req, res) {
    try {
      // if (!req.seller) {
      //   return errorResponse(res, 401, "unauthorise access and access denied!")
      // };

      if (!req.params.id) {
        return errorResponse(res, 400, "Missing the id");
      };

      // if (req.seller.role !== "admin") {
      //   if (req.params.id !== req.seller._id.toString()) {
      //     return errorResponse(res, 401, "unauthorise Activity You can't access to someone else account")
      //   }
      // }

      if (!req.params.accountStatus) {
        return errorResponse(res, 400, "Missing the Account Status");
      };
      const seller = await SellerServices.updateSellerAccountStatus(req.params.id, req.params.accountStatus);

      return successResponse(res, 200, "Seller account status updated successfully", seller);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // find the seller by email
  async getSellerByEmail(req, res) {
    try {
      if (!req.body.email) {
        return errorResponse(res, 400, "Missing the email");
      };
      const seller = await SellerServices.getSellerByEmail(req.body.email);
      return successResponse(res, 200, "Successfully found the seller", seller);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // find the seller by id
  async getSellerById(req, res) {
    try {
      if (!req.params.id) {
        return errorResponse(res, 400, "Missing the Id");
      };
      const seller = (await SellerServices.getSellerById(req.params.id));
      return successResponse(res, 200, "Successfully found the seller", seller);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // delete the seller by id
  async deleteSeller(req, res) {
    try {

      if (!req.seller) {
        return errorResponse(res, 401, "unauthorise access and access denied!")
      };

      if (!req.params.id) {
        return errorResponse(res, 400, "Missing the Id");
      };
      if (req.seller.role !== "admin") {
        if (req.params.id !== req.seller._id.toString()) {
          return errorResponse(res, 401, "unauthorise Activity You can't access to someone else account")
        }
      }
      const seller = await SellerServices.deleteSeller(req.params.id);
      return successResponse(res, 200, "Seller deleted successfully", seller);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // generated  otp for login 

  async generatedOtpforLogin(req, res) {
    try {
      if (!req.body.email) {
        return errorResponse(res, 400, "missing the email");
      }
      await VerifyEmailServices.generatedOtp(req.body.email, "login");
      return successResponse(res, 201, "New Otp is Generated");
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // generated  otp for login 

  async generatedOtpforcreate(req, res) {
    try {
      if (!req.body.email) {
        return errorResponse(res, 400, "missing the email");
      }
      const otp = await VerifyEmailServices.generatedOtp(req.body.email);
      return successResponse(res, 201, "New Otp is Generated");
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async verifyOtp(req, res) {
    try {
      const { otp, email } = req.body;

      if (!otp || !email) {
        return errorResponse(res, 400, "Missing otp or email");
      }

      // This endpoint is for LOGIN verification
      const { accessToken, refreshToken } =
        await VerifyEmailServices.verifyOtp(otp, email, "login");

      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("refreshToken_seller", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const seller = await SellerServices.getSellerByEmail(email);

      return res.status(200).json({
        status: true,
        msg: "Successfully Account Verified",
        data: accessToken,
        id: seller._id,
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async verifyRegisterOtp(req, res) {
    try {
      const { otp, email } = req.body;

      if (!otp || !email) {
        return errorResponse(res, 400, "Missing otp or email");
      }

      await VerifyEmailServices.verifyOtp(otp, email);

      const seller = await SellerServices.getSellerByEmail(email);

      seller.accountStatus = AccountStatus.ACTIVE;
      await seller.save();

      return successResponse(
        res,
        200,
        "Successfully Account Verified",
        seller
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new SellerControllers();