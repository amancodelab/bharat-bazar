const express = require('express');

const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddlware');
const TransactionControllers = require('../controllers/TransactionController');

const transactionRouter = express.Router();

transactionRouter.get('/admin', TransactionControllers.getAllTransactions); // add in admin Router in future

transactionRouter.get('/seller/:sellerId', sellerAuthMiddleware, TransactionControllers.getTransactionBysellerId);

transactionRouter.post('/:orderId', sellerAuthMiddleware, TransactionControllers.createTransaction);



module.exports = transactionRouter;