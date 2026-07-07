const transactionServices = require('../services/TransactionServices');
const errorResponse = require('../utils/response/errorResponse');
const successResponse = require('../utils/response/successResponse');

class TransactionControllers {
  async createTransaction(req, res) {
    try {
      if (!req.params.orderId) {
        return errorResponse(res, 400, "Missing the OrderId");
      };

      const orderId = req.params.orderId;

      const transaction = await transactionServices.createTransaction(orderId);

      return successResponse(res, 201, "Successfully Created the Transaction ");

    } catch (error) {
      return errorResponse(res, 500, error.message)
    };
  }
  // get transaction by seller Id
  async getTransactionBysellerId(req, res) {
    try {
      if (!req.params.sellerId) {
        return errorResponse(res, 400, "Missing the Seller Id");
      };
      const sellerId = req.params.sellerId;
      const transactions = await transactionServices.getTransactionBySellerId(sellerId);

      return successResponse(res, 200, "Success Found all the seller Transaction records", transactions);

    } catch (error) {
      return errorResponse(res, 500, error.message)
    };
  }

  // get all transaction 
  async getAllTransactions(req, res) {
    try {
      const transactions = await transactionServices.getAllTransaction();

      return successResponse(res, 200, "Success Found all the seller Transaction records", transactions);

    } catch (error) {
      return errorResponse(res, 500, error.message)
    };
  }
}


module.exports = new TransactionControllers();