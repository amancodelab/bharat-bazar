const Seller = require("../models/Seller");
const Address = require('../models/Address');
const JwtProvider = require("../utils/JwtProvider");
const bcryptHash = require("../utils/Auth/bcryptHash");
const AccountStatus = require("../domain/AccouontStatus");


class SellerServices {

  async createSeller(sellerdata) {
    try {
      sellerdata.email = sellerdata.email.toLowerCase().trim();
      const seller = await Seller.findOne({ email: sellerdata.email });

      if (seller) {
        if (seller.accountStatus === AccountStatus.ACTIVE) {
          throw new Error("Seller is already registered");
        } else if (
          seller.accountStatus === AccountStatus.PENDING_VERFICATION
        ) {
          const deletedSeller = await Seller.findOneAndDelete({
            email: sellerdata.email,
          });

          if (!deletedSeller) {
            throw new Error("Failed to delete existing seller");
          }
        } else {
          throw new Error("Seller is already registered");
        }
      }

      const savePickupAddress = await Address.create(sellerdata.pickupAddress);
      if (!savePickupAddress) {
        console.log("Please fill the pickup Address Correctly");
        throw new Error('Kindly fill the pickup Address Carefully')
      };

      const hashPassword = await bcryptHash(sellerdata.password);
      const newSeller = await Seller.create({
        "sellerName": sellerdata.sellerName,
        "profileImage": sellerdata.profileImage,
        "mobile": sellerdata.mobile,
        "email": sellerdata.email,
        "password": hashPassword,
        "businessDetails": {
          "businessName": sellerdata.businessDetails.businessName,
          "businessEmail": sellerdata.businessDetails.businessEmail,
          "businessMobile": sellerdata.businessDetails.businessMobile,
          "businessAddress": sellerdata.businessDetails.businessAddress
        },
        "bankDetails": {
          "accountNumber": sellerdata.bankDetails.accountNumber,
          "accountHolderName": sellerdata.bankDetails.accountHolderName,
          "bankName": sellerdata.bankDetails.bankName,
          "ifscCode": sellerdata.bankDetails.ifscCode
        },
        "pickupAddress": savePickupAddress._id,
        "GSTIN": sellerdata.GSTIN,


      });



      if (!newSeller) {
        console.log("Failed to created the new Seller");
        await Address.findByIdAndDelete(savePickupAddress._id);
        throw new Error('kindly fill the Seller details Carefully')
      };



      console.log("!!!Congratulations a new Seller is Listed successfully");

      return newSeller;

    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to Register Seller from the given data\nError Message:${error.message}`);
    };

  }

  // to get the profile of the seller from the token
  async getSellerProfileFromJwt(token) {
    try {
      const email = JwtProvider.getEmailFromJwt(token);
      const seller = await this.getSellerByEmail(email);
      if (!seller.profileImage) {
        throw new Error("No profile image is found")
      }
      return seller.profileImage

    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to get Seller's profile from the token\nError Message:${error.message}`);
    }
  }

  // to get seller from email
  async getSellerByEmail(email) {
    try {
      const seller = await Seller.findOne({ email });
      if (!seller) {
        const allEmails = await Seller.find({}, { email: 1 });
        console.log("All seller emails:", allEmails);
        console.log("Error in GetsellerByemal");
        throw new Error("Invalid Email");
      }
      return seller;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to get seller from email\nError Message:${error.message}`);
    }
  }
  // to get seller By Id
  async getSellerById(id) {
    try {
      const seller = await Seller.findById(id).populate("pickupAddress");
      if (!seller) {
        console.log("NO seller is found with such Id");
        throw new Error('No seller is found with such Id')
      };
      return seller;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to get seller from Id\nError Message:${error.message}`);
    }
  }

  // to get all sellers from the bank Account Status
  async getAllSellerAccountStatus(accountStatus) {
    try {
      const sellers = await Seller.find({ accountStatus });
      if (sellers.length === 0) {
        return [];
      };
      return sellers
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to find the seller wiht give account Status\nError Message:${error.message}`);
    }
  }

  // to get seller all Sellers 
  async getAllSellers() {
    try {
      const sellers = await Seller.find();
      if (sellers.length === 0) {
        console.log("No Seller is Registered");
        return [];
      }
      return sellers;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to find the seller \nError Message:${error.message}`);
    }
  }

  // to get update sellers details
  async updateSeller(id, sellerData) {
    try {
      const seller = await Seller.findByIdAndUpdate(id, sellerData, { new: true });
      console.log(id);
      if (!seller) {
        console.log("Wrong Seller Id or Fail to Update the Seller");
        throw new Error('Wrong Seller Id or Fail to Update the Seller')
      }
      return seller;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to find and update the seller\nError Message:${error.message}`);
    }
  }

  // get update seller Account status

  async updateSellerAccountStatus(id, accountStatus) {
    try {
      const seller = await Seller.findByIdAndUpdate(id, { $set: { accountStatus } }, { new: true });

      if (!seller) {
        console.log("Wrong Seller Id or Fail to Update the Seller Account Status");
        throw new Error('Wrong Seller Id or Fail to Update the Seller Account Status')
      }
      return seller;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to find and update the seller Account status\nError Message:${error.message}`);
    }
  }

  async deleteSeller(id) {
    try {
      const seller = await Seller.findByIdAndDelete(id);
      if (!seller) {
        console.log('No seller found to delete');
        throw new Error("Failed to find the delete the seller")
      }
      return seller;
    } catch (error) {
      console.error("Error Message:", error.message);
      throw new Error(`Failed to find and delete the seller\nError Message:${error.message}`);
    }
  };


}


module.exports = new SellerServices();