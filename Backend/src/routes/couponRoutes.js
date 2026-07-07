const express = require("express");
const CouponControllers = require("../controllers/CouponControllers");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const couponRoutes = express.Router();

couponRoutes.get("/all", adminAuthMiddleware, CouponControllers.getAllCoupons);

couponRoutes.post("/add", adminAuthMiddleware, CouponControllers.createCoupon);

couponRoutes.put(
  "/update/:couponId", adminAuthMiddleware,
  CouponControllers.updateCoupon
);

couponRoutes.delete(
  "/delete/:couponId", adminAuthMiddleware,
  CouponControllers.deleteCoupon
);

couponRoutes.get(
  "/code/:code", adminAuthMiddleware,
  CouponControllers.findCouponByCode
);

couponRoutes.get(
  "/:couponId",
  CouponControllers.findCouponById
);

couponRoutes.post(
  "/apply",
  CouponControllers.applyCoupon
);

module.exports = couponRoutes;