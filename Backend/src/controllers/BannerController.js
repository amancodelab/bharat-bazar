const BannerServices = require("../services/BannerServices");
const errorResponse = require("../utils/response/errorResponse");
const successResponse = require("../utils/response/successResponse");

class BannerController {
  async createBanner(req, res) {
    try {

      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Enter the data Carefully Missing the data")
      }
      const banner = await BannerServices.createBanner(req.body);
      return successResponse(res, 201, "Successfully created new Banner", banner);
    } catch (error) {
      console.log(error.message);
      return errorResponse(res, 500, error.message);
    }
  }

  async fetchBannerById(req, res) {
    try {
      if (!req.params?.bannerId && !req.body?.bannerId) {
        console.log("missing the Banner Id");
        return errorResponse(res, 400, "missing the Banner Id");
      }
      const bannerId = req.params?.bannerId || req.body?.bannerId;
      const banner = await BannerServices.fetchBannerById(bannerId);
      return successResponse(res, 200, "Successfully found the Banner", banner);
    } catch (error) {
      console.log(error.message);
      return errorResponse(res, 500, error.message);
    }
  }

  async fetchBannerAll(req, res) {
    try {
      const banners = await BannerServices.fetchBannerAll();
      return successResponse(res, 200, "Successfully found the Banners", banners);
    } catch (error) {
      console.log(error.message);
      return errorResponse(res, 500, error.message);
    }
  }

  async updateBannerById(req, res) {
    try {

      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Enter the data Carefully Missing the data")
      }
      if (!req.params?.bannerId && !req.body?.bannerId) {
        console.log("missing the Banner Id");
        return errorResponse(res, 400, "missing the Banner Id");
      }
      const bannerId = req.params?.bannerId || req.body?.bannerId;
      const updateData = { ...req.body };
      if (updateData.bannerId) {
        delete updateData.bannerId;
      }
      const banner = await BannerServices.UpdateBannerById(bannerId, updateData);
      return successResponse(res, 200, "Successfully Updated the Banner", banner);
    } catch (error) {
      console.log(error.message);
      return errorResponse(res, 500, error.message);
    }
  }

  async deleteBannerById(req, res) {
    try {

      if (!req.params?.bannerId && !req.body?.bannerId) {
        console.log("missing the Banner Id");
        return errorResponse(res, 400, "missing the Banner Id");
      }
      const bannerId = req.params?.bannerId || req.body?.bannerId;
      const banner = await BannerServices.deleteBannerById(bannerId);
      return successResponse(res, 201, "Successfully delete the Banner", banner);
    } catch (error) {
      console.log(error.message);
      return errorResponse(res, 500, error.message);
    }
  }


}

module.exports = new BannerController();