const Banner = require('../models/Banner');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});
class BannerServices {
  async createBanner(bannerData) {
    try {

      const banner = await Banner.create(bannerData);
      if (!banner) {
        console.log(bannerData);
        throw new Error("Failed to Create the Banner");
      }

      return banner;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async fetchBannerById(bannerId) {
    try {
      console.log("bannerId in fetchbannerById", bannerId);
      const banner = await Banner.findById(bannerId);
      if (!banner) {
        console.log(bannerId);
        throw new Error("Failed to Fetch the Banner");
      }

      return banner;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async fetchBannerAll() {
    try {
      const banners = await Banner.find();


      return banners;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async UpdateBannerById(bannerId, bannerData) {
    try {
      console.log("bannerId in UpdateBannerById", bannerId);
      const banner = await Banner.findByIdAndUpdate(bannerId, bannerData, { new: true, runValidators: true });
      if (!banner) {
        console.log(bannerId);
        throw new Error("Failed to Fetch the Banner");
      }

      return banner;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async deleteBannerById(bannerId) {
    try {

      const banner = await Banner.findByIdAndDelete(bannerId);
      if (!banner) {
        console.log("bannerId", bannerId);
        throw new Error("Failed to Deleted the Banner");
      }

      if (banner.image) {
        const publicId = banner.image
          .split('/upload/')[1]
          .replace(/^v\d+\//, '')
          .split('.')[0];

        // Delete the image using Cloudinary's uploader API
        const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);

        console.log(`Cloudinary deletion result:`, cloudinaryResponse);
      }
      return banner;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = new BannerServices();