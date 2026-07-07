const mongoose = require("mongoose");
const UserRole = require("../domain/UserRole");
const AccountStatus = require("../domain/AccouontStatus");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.ADMIN,
    },

    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.PENDING_VERFICATION,
    },
  },
  {
    timestamps: true,
  }
);

// TTL Index: delete after 5 minutes if still pending
adminSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 315,
    partialFilterExpression: {
      accountStatus: AccountStatus.PENDING_VERFICATION,
    },
  }
);

module.exports = mongoose.model("Admin", adminSchema);