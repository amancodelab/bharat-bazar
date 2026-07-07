const User = require("../models/User");
const UserServices = require("../services/UserServices");
const JwtProvider = require("../utils/JwtProvider");
const errorResponse = require("../utils/response/errorResponse");
const successResponse = require("../utils/response/successResponse");

const userAuthMiddleware = async (req, res, next) => {
  try {
    console.log("middleware running");
    if (!req.headers.authorization) {
      console.log("printing the error in getting the middileware");
      console.log(req.headers.authorization);
      return errorResponse(res, 400, "Missing the token");
    };

    const authHead = req.headers.authorization;

    if (!authHead.startsWith("Bearer ")) {
      console.log("Testing the bearer Token:", authHead);
      console.log("Missing Bearer in Token");
      return errorResponse(res, 400, "Missing the Bearer in Starting in token");
    };
    const token = authHead.split(" ")[1];
    const email = JwtProvider.getEmailFromJwt(token);
    if (!email) {
      return errorResponse(res, 400, "Missing the email in token")
    };
    console.log("email in userAuth:", email);
    const user = await UserServices.getUserByEmail(email);
    req._id = user._id;
    req.user = user;
    next();
    console.log("middlew successufully finished");
  } catch (error) {
    console.log("middlewareEnter in Error");
    return errorResponse(res, 401, `Failed to Verify or missing the user User and Error Message:${error.message}`)
  };
}


module.exports = userAuthMiddleware;