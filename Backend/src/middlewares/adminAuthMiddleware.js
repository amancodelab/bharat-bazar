const UserRole = require("../domain/UserRole");
const AdminServices = require("../services/AdminServies");
const JwtProvider = require("../utils/JwtProvider");
const errorResponse = require("../utils/response/errorResponse");
const successResponse = require("../utils/response/successResponse");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    console.log("middleware running");
    if (!req.headers.authorization) {
      console.log("printing the error in getting the middileware");
      console.log(req.headers.authorization);
      return errorResponse(res, 401, "Missing the token");
    };

    const authHead = req.headers.authorization;

    if (!authHead.startsWith("Bearer ")) {
      console.log("Testing the bearer Token:", authHead);
      console.log("Missing Bearer in Token");
      return errorResponse(res, 400, "Missing the Bearer in Starting in token");
    };
    const token = authHead.split(" ")[1];

    const payload = JwtProvider.verifyJwtToken(token);

    if (!payload) {
      return errorResponse(res, 401, "Invalid token");
    }

    if (payload.role !== UserRole.ADMIN) {
      return errorResponse(res, 403, "Access denied");
    }

    const admin = await AdminServices.fetchAdmin(payload.email);

    req.user = admin;

    console.log("middlew successufully finished");
    next();

  } catch (error) {
    console.log("middlewareEnter in Error");
    return errorResponse(
      res,
      401,
      error.message
    );
  };
}


module.exports = adminAuthMiddleware;