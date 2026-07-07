const mongoose = require('mongoose');
const UserRole = require('../domain/UserRole');
const AccountStatus = require('../domain/AccouontStatus');

const userModel = mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name is required to create the user"],
    trim: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },

  profileImage: String,

  mobile: String,

  // Permanent address
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },

  // Multiple shipping addresses
  shippingAddress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    }
  ],

  role: {
    type: String,
    enum: [UserRole.CUSTOMER, UserRole.ADMIN],
    default: UserRole.CUSTOMER
  },

  accountStatus: {
    type: String,
    enum: [
      AccountStatus.PENDING_VERFICATION,
      AccountStatus.ACTIVE,
      AccountStatus.SUPSENDED,
      AccountStatus.DEACTIVATED,
      AccountStatus.BANNED,
      AccountStatus.CLOSED
    ],
    default: AccountStatus.PENDING_VERFICATION
  },

  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  }

}, { timestamps: true });

const User = mongoose.model("User", userModel);

module.exports = User;