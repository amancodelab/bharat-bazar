const mongoose = require("mongoose");
const OrderStatus = require("../domain/OrderStatus");
const PaymentStatus = require("../domain/PaymentStatus");
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  },
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderItem",
    required: true
  }],
  totalMrp: {
    type: Number,
    required: [true, "Total Mrp is required"]
  },
  totalSellingPrice: {
    type: Number,
    required: [true, "Total Selling is required"]
  },
  totalDiscount: {
    type: Number,
    required: [true, "Total Discount is required"]
  },
  shippingAddress: {
    type:
      mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
  totalItem: {
    type: Number,
    required: [true, "Total Item is required"]
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date,
    default: function () {
      return Date.now() + 7 * 24 * 60 * 60 * 1000;
    }
  },
  orderStatus: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING
  }

});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;