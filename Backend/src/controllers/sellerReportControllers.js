const errorResponse = require("../utils/response/errorResponse");
const successResponse = require("../utils/response/successResponse");
const SellerReport = require("../models/SellerReport");
const SellerReportServices = require("../services/SellerReportServices");

class SellerReportController {
  // Get seller report
  async getSellerReport(req, res) {
    try {
      if (!req.seller) {
        return errorResponse(
          res,
          401,
          "Unauthorised Activity in Seller Report"
        );
      }

      const report = await SellerReportServices.getSellerReport(req.seller);

      return successResponse(
        res,
        200,
        "Successfully fetched seller report",
        report
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Update seller report
  async updateSellerReport(req, res) {
    try {
      if (!req.params.sellerReportId) {
        return errorResponse(res, 400, "Missing seller report id");
      }

      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Missing update data");
      }

      const sellerReport = await SellerReport.findById(
        req.params.sellerReportId
      );

      if (!sellerReport) {
        return errorResponse(res, 404, "Seller report not found");
      }

      const updatedReport =
        await SellerReportServices.updateSellerReport(
          sellerReport.seller,
          req.body
        );

      return successResponse(
        res,
        200,
        "Seller report updated successfully",
        updatedReport
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new SellerReportController();