const SellerServices = require("../services/SellerServices");
const JwtProvider = require("../utils/JwtProvider");
const errorResponse = require("../utils/response/errorResponse");
const successResponse = require("../utils/response/successResponse");

const sellerAuthMiddleware = async (req, res, next) => {
  try {
    console.log("enter");
    if (!req.headers.authorization) {
      return errorResponse(res, 400, "Missing the token");
    };

    const authHead = req.headers.authorization;

    if (!authHead.startsWith("Bearer ")) {
      console.log("Missing Bearer in Token");
      return errorResponse(res, 400, "Missing the Bearer in Starting in token");
    };
    const token = authHead.split(" ")[1];
    const email = JwtProvider.getEmailFromJwt(token);
    if (!email) {
      return errorResponse(res, 400, "Missing the email in token")
    };
    const seller = await SellerServices.getSellerByEmail(email);
    req._id = seller._id;
    req.seller = seller;
    console.log("last stage");
    next();
  } catch (error) {
    return errorResponse(res, 401, `Failed to Verify or missing the seller and Error Message:${error.message}`)
  };
}

module.exports = sellerAuthMiddleware;