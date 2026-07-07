const CouponServices = require("../services/CouponServices");
const errorResponse = require("../utils/response/errorResponse");
const successResponose = require("../utils/response/successResponse");

class CouponControllers {
  // Get all coupons
  async getAllCoupons(req, res) {
    try {
      const coupons = await CouponServices.getAllCoupons();

      return successResponose(
        res,
        200,
        "Successfully found all coupons",
        coupons
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Create coupon
  async createCoupon(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Request body is empty");
      }

      const coupon = await CouponServices.createCoupon(req.body);

      return successResponose(
        res,
        201,
        "Successfully created the coupon",
        coupon
      );
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  // Update coupon
  async updateCoupon(req, res) {
    try {
      const { couponId } = req.params;

      if (!couponId) {
        return errorResponse(res, 400, "Missing couponId");
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Request body is empty");
      }

      const coupon = await CouponServices.updateCoupon(
        couponId,
        req.body
      );

      return successResponose(
        res,
        200,
        "Successfully updated the coupon",
        coupon
      );
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  // Delete coupon
  async deleteCoupon(req, res) {
    try {
      const { couponId } = req.params;

      if (!couponId) {
        return errorResponse(res, 400, "Missing couponId");
      }

      const coupon = await CouponServices.deleteCoupon(couponId);

      return successResponose(
        res,
        200,
        "Successfully deleted the coupon",
        coupon
      );
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  // Find coupon by ID
  async findCouponById(req, res) {
    try {
      const { couponId } = req.params;

      if (!couponId) {
        return errorResponse(res, 400, "Missing couponId");
      }

      const coupon = await CouponServices.getCouponById(couponId);

      return successResponose(
        res,
        200,
        "Successfully found the coupon",
        coupon
      );
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  }

  // Find coupon by code
  async findCouponByCode(req, res) {
    try {
      const { code } = req.params;

      if (!code) {
        return errorResponse(res, 400, "Missing coupon code");
      }

      const coupon = await CouponServices.getCouponByCode(code);

      return successResponose(
        res,
        200,
        "Successfully found the coupon",
        coupon
      );
    } catch (error) {
      return errorResponse(res, 404, error.message);
    }
  }

  // Apply coupon
  async applyCoupon(req, res) {
    try {
      const { code, orderAmount } = req.body;

      if (!code || orderAmount == null) {
        return errorResponse(
          res,
          400,
          "Missing coupon code or order amount"
        );
      }

      const result = await CouponServices.applyCoupon(
        code,
        Number(orderAmount)
      );

      return successResponose(
        res,
        200,
        "Coupon applied successfully",
        result
      );
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}

module.exports = new CouponControllers();