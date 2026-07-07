const mongoose = require('mongoose');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const User = require('../models/User');
const Seller = require('../models/Seller');
const Address = require("../models/Address");
const OrderStatus = require('../domain/OrderStatus');
const calculateDiscountPercent = require("../utils/calculateDiscountPercent");
const PaymentOrderServices = require('../services/PaymentOrderServices');
const paymentMethod = require('../domain/PaymentMethod');
const SellerReportServices = require("./SellerReportServices");



class OrderService {

  // create the Order 
  async createOrder(user, shippingAddress, cart, PaymentMethod = paymentMethod.RAZORPAY) {

    // If new shipping address provided
    // Handle shipping address
    if (shippingAddress) {

      // Existing saved address selected (address ID)
      if (typeof shippingAddress === "string") {

        shippingAddress = await Address.findById(shippingAddress);

        if (!shippingAddress) {
          throw new Error("Shipping address not found");
        }

      }

      // New address object
      else if (!shippingAddress._id) {

        shippingAddress = await Address.create(shippingAddress);

        if (!Array.isArray(user.shippingAddress)) {
          user.shippingAddress = [];
        }

        const exists = user.shippingAddress.some(
          id => id.toString() === shippingAddress._id.toString()
        );

        if (!exists) {
          user.shippingAddress.push(shippingAddress._id);
        }

        await user.save();
      }

    } else {

      // Use latest shipping address
      if (
        Array.isArray(user.shippingAddress) &&
        user.shippingAddress.length > 0
      ) {
        shippingAddress = await Address.findById(
          user.shippingAddress[user.shippingAddress.length - 1]
        );
      }

      // Fallback to permanent address
      if (!shippingAddress && user.address) {
        shippingAddress = await Address.findById(user.address);
      }

      if (!shippingAddress) {
        throw new Error("No shipping address found");
      }
    }


    // Group cart items by seller

    const itemsBySeller = cart.cartItems.reduce((acc, item) => {

      const sellerId = item.product.seller._id.toString();

      if (!acc[sellerId]) {
        acc[sellerId] = [];
      }

      acc[sellerId].push(item);

      return acc;

    }, {});

    const orders = [];

    // Create order for each seller

    for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {

      // Totals
      const totalOrderPrice = cartItems.reduce(
        (sum, item) =>
          sum + (item.sellingPrice * item.quantity),
        0
      );

      const totalMrp = cartItems.reduce(
        (sum, item) =>
          sum + (item.mrp * item.quantity),
        0
      );

      const totalDiscount = calculateDiscountPercent(
        totalMrp,
        totalOrderPrice
      );

      const totalItem = cartItems.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );

      // Create order items

      const orderItems = await Promise.all(

        cartItems.map(async (cartItem) => {

          const orderItem = new OrderItem({

            product: cartItem.product._id,
            quantity: cartItem.quantity,
            sellingPrice: cartItem.sellingPrice,
            mrp: cartItem.mrp,
            size: cartItem.size,
            user: user._id,

            discount: calculateDiscountPercent(
              cartItem.mrp,
              cartItem.sellingPrice
            )

          });

          return await orderItem.save();

        })

      );

      // Create order

      const newOrder = new Order({

        user: user._id,

        shippingAddress: shippingAddress._id,

        orderItems: orderItems.map(
          item => item._id
        ),

        totalMrp,

        totalSellingPrice: totalOrderPrice,

        totalDiscount,

        totalItem,

        seller: sellerId

      });

      const savedOrder = await newOrder.save();

      orders.push(savedOrder);
    }

    const response = {};

    const paymentOrder =
      await PaymentOrderServices
        .createPaymentOrder(user, orders);

    if (PaymentMethod === paymentMethod.RAZORPAY) {

      const payment =
        await PaymentOrderServices
          .createRazorpayPaymentLink(
            user,
            paymentOrder.amount,
            paymentOrder._id
          );

      response.paymentLinkUrl = payment.short_url;

      response.paymentLinkId = payment.id;

      response.paymentOrderId = paymentOrder._id;

      paymentOrder.paymentLinkId = payment.id;

      await paymentOrder.save();

      return response;
    }

    response.orders = orders;

    response.msg =
      "Order created successfully";

    return response;
  }

  // find the Order By Id

  async findOrderById(orderId) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error('Invalid Order Id')
    };
    const order = await Order.findById(orderId).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" },
      { path: "user" }
    ])
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
  // user history 
  async userOrderHistory(userId) {
    return await Order.find({ user: userId }).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" }
    ]);
  }

  async getSellerOrders(sellerId) {
    const orders = await Order.find({ seller: sellerId }).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" }
    ])

    return orders
  };

  // update teh order status 
  async updateOrders(orderId, status) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error("Invalid Order Id");
    }

    const previousOrder = await Order.findById(orderId);

    if (!previousOrder) {
      throw new Error("Order not found");
    }

    const previousStatus = previousOrder.orderStatus;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" },
    ]);

    // Delivered for the first time
    if (
      previousStatus !== OrderStatus.DELIVERED &&
      status === OrderStatus.DELIVERED
    ) {
      const gst = order.totalSellingPrice * 0.18;

      await SellerReportServices.updateSellerReport(order.seller._id, {
        totalEarning: order.totalSellingPrice,
        totalSales: order.totalSellingPrice,
        totalOrders: 1,
        totalTransaction: 1,
        totalTax: gst,
      });
    }

    // Cancel after delivery
    if (
      previousStatus === OrderStatus.DELIVERED &&
      status === OrderStatus.CANCELLED
    ) {
      const gst = order.totalSellingPrice * 0.18;

      await SellerReportServices.updateSellerReport(order.seller._id, {
        totalEarning: -order.totalSellingPrice,
        totalSales: -order.totalSellingPrice,
        cancelOrders: 1,
        totalTax: -gst,
      });
    }
    return order;
  }
  // cancel the oder 
  async cancelOrders(orderId, user) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error('Invalid Order Id')
    };

    const isValid = await Order.findOne({
      _id: orderId,
      user: user._id
    });
    if (!isValid) {
      throw new Error('Unauthorised Activity in order cancel');
    }
    // find and update 
    const order = await Order.findByIdAndUpdate(orderId, { orderStatus: OrderStatus.CANCELLED }, { returnDocument: "after" }).populate([
      { path: "seller" },
      { path: "orderItems", populate: { path: "product" } },
      { path: "shippingAddress" }
    ]);

    if (!order) {
      throw new Error('failed to Cancel the order Status')
    }
    return order;

  }

  async findOrderItemById(orderItemId) {

    if (!mongoose.Types.ObjectId.isValid(orderItemId)) {
      throw new Error("Invalid Order Item ID");
    }

    const orderItem = await OrderItem
      .findById(orderItemId)
      .populate("product");

    if (!orderItem) {
      throw new Error("Order Item not found");
    }

    return orderItem;

  }

}


module.exports = new OrderService();
