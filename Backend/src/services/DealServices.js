const cloudinary = require("../config/cloudinary");
const Deal = require("../models/Deal");


class DealServices {
  // Create Deal
  async createDeal(dealData) {
    try {
      const deal = await Deal.create(dealData);

      if (!deal) {
        throw new Error("Failed to create deal");
      }

      return deal;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get All Deals
  async getAllDeals() {
    try {
      return await Deal.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get Deal By Id
  async getDealById(dealId) {
    try {
      const deal = await Deal.findById(dealId);

      if (!deal) {
        throw new Error("Deal not found");
      }

      return deal;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update Deal
  async updateDeal(dealId, dealData) {
    try {
      const deal = await Deal.findByIdAndUpdate(
        dealId,
        dealData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!deal) {
        throw new Error("Deal not found");
      }

      return deal;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete Deal
  async deleteDeal(dealId) {
    try {
      const deal = await Deal.findByIdAndDelete(dealId);

      if (!deal) {
        throw new Error("Deal not found");
      }

      // Delete image from Cloudinary
      if (deal.image) {
        const publicId = deal.image
          .split("/upload/")[1]
          .replace(/^v\d+\//, "")
          .split(".")[0];

        const result = await cloudinary.uploader.destroy(publicId);

        console.log("Cloudinary Delete:", result);
      }

      return deal;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new DealServices();