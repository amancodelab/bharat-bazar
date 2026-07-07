const Coupon = require("../models/Coupon");

const createCoupon = async (couponData) => {
  const existingCoupon = await Coupon.findOne({
    code: couponData.code.toUpperCase(),
  });

  if (existingCoupon) {
    throw new Error("Coupon code already exists");
  }

  const coupon = await Coupon.create({
    ...couponData,
    code: couponData.code.toUpperCase(),
  });

  return coupon;
};

const getAllCoupons = async () => {
  return await Coupon.find().sort({ createdAt: -1 });
};

const getCouponById = async (couponId) => {
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  return coupon;
};

const updateCoupon = async (couponId, data) => {
  if (data.code) {
    const existingCoupon = await Coupon.findOne({
      code: data.code.toUpperCase(),
      _id: { $ne: couponId },
    });

    if (existingCoupon) {
      throw new Error("Coupon code already exists");
    }

    data.code = data.code.toUpperCase();
  }

  const coupon = await Coupon.findByIdAndUpdate(couponId, data, {
    new: true,
    runValidators: true,
  });

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  return coupon;
};

const deleteCoupon = async (couponId) => {
  const coupon = await Coupon.findByIdAndDelete(couponId);

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  return coupon;
};

const getCouponByCode = async (code) => {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
  });

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  return coupon;
};

const applyCoupon = async (code, orderAmount) => {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
  });

  if (!coupon) {
    throw new Error("Invalid coupon code");
  }

  if (!coupon.isActive) {
    throw new Error("Coupon is inactive");
  }

  if (coupon.expiryDate < new Date()) {
    throw new Error("Coupon has expired");
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    throw new Error("Coupon usage limit reached");
  }

  if (orderAmount < coupon.minOrderAmount) {
    throw new Error(
      `Minimum order amount should be ₹${coupon.minOrderAmount}`
    );
  }

  let discountAmount = (orderAmount * coupon.discount) / 100;

  discountAmount = Math.min(
    discountAmount,
    coupon.maxDiscountAmount
  );

  const finalAmount = Math.max(
    0,
    orderAmount - discountAmount
  );

  return {
    coupon,
    orderAmount,
    discountAmount,
    finalAmount,
  };
};

const incrementCouponUsage = async (couponId) => {
  return await Coupon.findByIdAndUpdate(
    couponId,
    {
      $inc: { usedCount: 1 },
    },
    { new: true }
  );
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  incrementCouponUsage,
};