const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cartItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CartItem"
  }],
  totalSellingPrice: {
    type: Number,
    default: 0
  },
  totalItem: {
    type: Number,
    default: 0
  },
  totalMrp: {
    type: Number,
    default: 0
  },
  totalDiscount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;