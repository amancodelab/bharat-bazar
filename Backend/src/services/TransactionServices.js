
const Transaction = require('../models/Transaction');
const OrderServices = require('../services/OrderServices');

class TransactionServices {
  // create Transaction By OrderId
  async createTransaction(orderId) {
    try {
      const order = (await OrderServices.findOrderById(orderId));
      const seller = order.seller._id;
      const customer = order.user._id;

      const transaction = await Transaction.create({
        seller,
        customer,
        order: order._id
      });

      return transaction;

    } catch (error) {
      throw new Error(error.message);
    }
  };

  // get transation by Seller Id
  async getTransactionBySellerId(sellerId) {
    try {
      const transactions = await Transaction.find({ seller: sellerId }).populate({ path: "order" });

      return transactions;
    } catch (error) {
      throw new Error(error.message)
    };

  };

  // get all transantion 

  async getAllTransaction() {
    return await Transaction.find().populate({ path: "order" });
  };

}

module.exports = new TransactionServices();

