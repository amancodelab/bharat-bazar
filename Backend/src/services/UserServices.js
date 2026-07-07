const User = require("../models/User");
const Address = require('../models/Address');
const JwtProvider = require("../utils/JwtProvider");
const bcryptHash = require("../utils/Auth/bcryptHash");
const UserRole = require("../domain/UserRole");
const VerifyEmailServices = require("./Auth/VerifyEmailServices");
const Cart = require("../models/Cart");
const AccountStatus = require("../domain/AccouontStatus");


class UserServices {

  async createUser(userdata) {
    try {
      userdata.email = userdata.email.toLowerCase().trim();
      const user = await User.findOne({ email: userdata.email });
      if (user) {
        if (user.accountStatus === AccountStatus.ACTIVE) {
          throw new Error('user is Already Registerd')
        } else if (user.accountStatus === AccountStatus.PENDING_VERFICATION) {
          const deletedUser = await User.findOneAndDelete({ email: userdata.email });

          if (!deletedUser) {
            throw new Error('Failed to Deleted the Registered User');
          }
        } else {
          throw new Error('user is Already Registerd');
        }
      }
      const saveAddress = await Address.create(userdata.address);
      if (!saveAddress) {
        console.log("Please fill the pickup Address Correctly");
        throw new Error('Kindly fill the pickup Address Carefully')
      };

      const hashPassword = await bcryptHash(userdata.password);
      const newUser = await User.create({
        name: userdata.name,
        email: userdata.email,
        password: hashPassword,
        mobile: userdata.mobile,
        profileImage: userdata.profileImage,
        address: saveAddress._id,
        role: UserRole.CUSTOMER

      })


      if (!newUser) {
        console.log("Failed to created the new User");
        await Address.findByIdAndDelete(saveAddress._id);
        throw new Error('kindly fill the User details Carefully')
      };

      console.log("!!!Congratulations a new User is Listed successfully");

      return newUser;

    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to Register User from the given data\nError Message:${error.message}`);
    };

  }

  async getUserByEmail(email) {
    try {
      const normalizeEmail = { email };
      console.log(email);
      console.log("Normalize Email:", normalizeEmail);
      const user = await User.findOne({ email: normalizeEmail });
      if (!user) {
        console.log("Invalid email");
        throw new Error("Invalid Email");
      };
      return user;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to get user from email\nError Message:${error.message}`);
    }
  }
  // to get user By Id
  async getUserByEmail(email) {
    try {
      if (!email || typeof email !== "string") {
        throw new Error("Email must be a valid string");
      }

      const normalizeEmail = email.trim().toLowerCase();

      console.log("Email:", email);
      console.log("Normalized Email:", normalizeEmail);

      const user = await User.findOne({ email: normalizeEmail });

      if (!user) {
        throw new Error("Invalid Email");
      }

      return user;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(
        `Failed to get user from email\nError Message: ${error.message}`
      );
    }
  }

  async getUserProfileFromJwt(token) {
    try {
      const email = JwtProvider.getEmailFromJwt(token);
      const user = await this.getUserByEmail(email);
      if (!user.profileImage) {
        throw new Error("No profile image is found")
      }
      return user.profileImage

    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to get User's profile from the token\nError Message:${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await User.findByIdAndUpdate(id, userData, { new: true });
      console.log(id);
      if (!user) {
        console.log("Wrong User Id or Fail to Update the User");
        throw new Error('Wrong User Id or Fail to Update the User')
      }
      return user;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to find and update the user\nError Message:${error.message}`);
    }
  }

  async deleteUser(id) {
    try {

      const user = await User.findByIdAndDelete(id);
      if (!user) {
        console.log('No user found to delete');
        throw new Error("Failed to find the delete the user")
      }
      return user;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to find and delete the user\nError Message:${error.message}`);
    }
  };
  async getUserById(id) {
    try {
      const user = await User.findById(id).populate("address").populate("shippingAddress");

      if (!user) {
        console.log("No user found");
        throw new Error("Failed to find the user");
      }

      return user;
    } catch (error) {
      console.log(error.message);
      throw new Error(
        `Failed to find the user and get data: ${error.message}`
      );
    }
  }

}

module.exports = new UserServices();


