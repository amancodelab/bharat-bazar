const mongoose = require('mongoose');

const PaymentStatus = require("../domain/PaymentStatus");
const PaymentMethod = require("../domain/PaymentMethod");

const paymentOrderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "amount is required"]
  },
  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING
  },
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethod),
    default: PaymentMethod.RAZORPAY
  },
  paymentLinkId: {
    type: String
  },
  paymentLinkUrl: {
    type: String
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
  { timestamps: true });


const PaymentOrder = mongoose.model("PaymentOrder", paymentOrderSchema);

module.exports = PaymentOrder;
