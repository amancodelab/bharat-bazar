const mongoose = require("mongoose");
const UserRole = require('../domain/UserRole');
const AccountStatus = require('../domain/AccouontStatus');

const sellerSchema = new mongoose.Schema(
  {
    sellerName: {
      type: String,
      required: [true, "Seller name is required"],
    },
    profileImage: {
      type: String,

    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    businessDetails: {
      businessName: {
        type: String,
      },

      businessEmail: {
        type: String,
      },

      businessMobile: {
        type: String,
      },

      businessAddress: {
        type: String,
      },
      logo: {
        type: String
      },
      banner: {
        type: [String]
      }
    },

    bankDetails: {
      accountNumber: {
        type: String,
      },

      accountHolderName: {
        type: String,
      },

      bankName: {
        type: String,
      },

      ifscCode: {
        type: String,
      },
    },

    pickupAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    GSTIN: {
      type: String,
      required: [true, "GSTIN is required"],
    },

    role: {
      type: String,
      enum: [UserRole.SELLER],
      default: UserRole.SELLER,
    },

    accountStatus: {
      type: String,
      enum: [
        AccountStatus.PENDING_VERFICATION,
        AccountStatus.ACTIVE,
        AccountStatus.SUPSENDED,
        AccountStatus.DEACTIVATED,
        AccountStatus.BANNED,
        AccountStatus.CLOSED,
      ],

      default: AccountStatus.PENDING_VERFICATION,
    },

  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;