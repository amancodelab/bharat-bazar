const AccountStatus = require("../domain/AccouontStatus");
const successResponse = require("../utils/response/successResponse");
const errorResponse = require("../utils/response/errorResponse");
const VerifyEmailServices = require("../services/Auth/VerifyEmailServices");
const UserServices = require("../services/UserServices");

class UserControllers {

  async verifyOtp(req, res) {
    try {
      if (!req.body.otp || !req.body.email) {
        return errorResponse(res, 400, "Missing otp or email");
      }
      const { otp, email, method } = req.body;

      // LOGIN FLOW
      if (method === "login") {

        const { accessToken, refreshToken } = await VerifyEmailServices.verifyOtpForUser(otp, email, "login");

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const user = await UserServices.getUserByEmail(email);


        return res.status(200).json({
          status: true,
          msg: "Successfully Account Verified",
          data: accessToken,
          id: user._id
        })
      }

      // REGISTRATION FLOW
      await VerifyEmailServices.verifyOtpForUser(otp, email);

      const user = await UserServices.getUserByEmail(email);

      user.accountStatus = AccountStatus.ACTIVE;

      await user.save();

      return successResponse(res, 200, "User account verified successfully", user);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getUserProfile(req, res) {
    try {
      if (!req.user) {
        console.log("problem");
        console.log(req.user);

        return errorResponse(res, 401, "unauthorise access and access denied!")
      };

      return successResponse(res, 200, "fetch the User Profile success", req.user.profileImage);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }


  async updateUser(req, res) {
    try {
      if (!req.user) {
        return errorResponse(res, 401, "unauthorise access and access denied!")
      };
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "user details");
      };

      const userData = {

        name: req.body.name,

        mobile: req.body.mobile,

        address: req.body.address
      };
      const user = await UserServices.updateUser(req.user._id, userData);

      return successResponse(res, 200, "Successfully updated the User", user);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async updateUserAccountStatus(req, res) {
    try {
      if (!req.user) {
        return errorResponse(res, 401, "unauthorise access and access denied!")
      };

      if (!req.params.id) {
        return errorResponse(res, 400, "Missing the id");
      };

      if (req.user.role !== "admin") {
        if (req.params.id !== req.user._id.toString()) {
          return errorResponse(res, 401, "unauthorise Activity You can't access to someone else account")
        }
      }

      if (!req.params.accountStatus) {
        return errorResponse(res, 400, "Missing the Account Status");
      };
      const user = await UserServices.updateUserAccountStatus(req.params.id, req.params.accountStatus);

      return successResponse(res, 200, "User account status updated successfully", user);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // find the user by email
  async getUserByEmail(req, res) {
    try {
      if (!req.user) {
        return errorResponse(res, 401, "authorise Acitvity");
      }
      if (!req.body.email) {
        return errorResponse(res, 400, "Missing the email");
      };
      const user = await UserServices.getUserByEmail(req.body.email);
      return successResponse(res, 200, "Successfully found the user", user);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // find the user by id
  async getUserById(req, res) {
    try {
      if (!req.user) {
        return errorResponse(res, 401, "unauthorise access and access denied!")
      };
      const id = req.user?._id || req.params?.id || req.body?.id;

      if (!id) {
        return errorResponse(res, 400, "Missing the ID");
      }
      const user = await UserServices.getUserById(id);
      return successResponse(res, 200, "Successfully found the user", user);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

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

  // delete the user by id
  async deleteUser(req, res) {
    try {

      if (!req.user) {
        return errorResponse(res, 401, "unauthorise access and access denied!")
      };

      if (!req.params.id) {
        return errorResponse(res, 400, "Missing the Id");
      };
      if (req.user.role !== "admin") {
        if (req.params.id !== req.user._id.toString()) {
          return errorResponse(res, 401, "unauthorise Activity You can't access to someone else account")
        }
      }
      const user = await UserServices.deleteUser(req.params.id);
      return successResponse(res, 200, "User deleted successfully", user);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async logout(req, res) {
    try {
      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        expires: new Date(0),
      });

      return successResponse(
        res,
        200,
        "User logout successfully"
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

}

module.exports = new UserControllers();