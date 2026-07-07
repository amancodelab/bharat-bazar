const DealServices = require("../services/DealServices");
const errorResponse = require("../utils/response/errorResponse");
const successResponse = require("../utils/response/successResponse");

class DealControllers {
  // Get all deals
  async getAllDeal(req, res) {
    try {
      const deals = await DealServices.getAllDeals();

      return successResponse(
        res,
        200,
        "Successfully found all deals",
        deals
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Create Deal
  async createDeal(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Request body is empty");
      }

      const deal = await DealServices.createDeal(req.body);

      return successResponse(
        res,
        201,
        "Successfully created the deal",
        deal
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Get Deal By Id
  async findDealById(req, res) {
    try {
      const { dealId } = req.params;

      if (!dealId) {
        return errorResponse(res, 400, "Missing dealId");
      }

      const deal = await DealServices.getDealById(dealId);

      return successResponse(
        res,
        200,
        "Successfully found the deal",
        deal
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Update Deal
  async updateDeal(req, res) {
    try {
      const { dealId } = req.params;

      if (!dealId) {
        return errorResponse(res, 400, "Missing dealId");
      }

      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Request body is empty");
      }

      const deal = await DealServices.updateDeal(
        dealId,
        req.body
      );

      return successResponse(
        res,
        200,
        "Successfully updated the deal",
        deal
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Delete Deal
  async deleteDeal(req, res) {
    try {
      const { dealId } = req.params;

      if (!dealId) {
        return errorResponse(res, 400, "Missing dealId");
      }

      const deal = await DealServices.deleteDeal(dealId);

      return successResponse(
        res,
        200,
        "Successfully deleted the deal",
        deal
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new DealControllers();