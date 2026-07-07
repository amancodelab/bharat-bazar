const SellerReport = require("../models/SellerReport");
const Seller = require("../models/Seller");

class SellerReportServices {
  // Get seller report
  async getSellerReport(seller) {
    try {
      const isValidSeller = await Seller.findById(seller._id);

      if (!isValidSeller) {
        throw new Error("Invalid Seller");
      }

      let report = await SellerReport.findOne({
        seller: seller._id,
      });

      if (!report) {
        report = await SellerReport.create({
          seller: seller._id,
        });
      }

      return report;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update seller report
  async updateSellerReport(sellerId, data) {
    const earning = data.totalEarning || 0;

    return await SellerReport.findOneAndUpdate(
      { seller: sellerId },
      {
        $inc: {
          totalEarning: earning,
          totalSales: data.totalSales || 0,
          totalOrders: data.totalOrders || 0,
          totalTransaction: data.totalTransaction || 0,
          cancelOrders: data.cancelOrders || 0,
          totalRefunds: data.totalRefunds || 0,
          totalTax: earning * 0.18,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  // Increase order count
  async increaseOrder(sellerId, amount, tax = 0) {
    return await this.updateSellerReport(sellerId, {
      totalOrders: 1,
      totalTransaction: 1,
      totalSales: amount,
      totalEarning: amount,
      totalTax: tax,
    });
  }

  // Cancel order
  async cancelOrder(sellerId) {
    return await this.updateSellerReport(sellerId, {
      cancelOrders: 1,
    });
  }

  // Refund order
  async refundOrder(sellerId, amount) {
    return await this.updateSellerReport(sellerId, {
      totalRefunds: amount,
      totalEarning: -amount,
    });
  }

  // Add tax
  async addTax(sellerId, tax) {
    return await this.updateSellerReport(sellerId, {
      totalTax: tax,
    });
  }
}

module.exports = new SellerReportServices();