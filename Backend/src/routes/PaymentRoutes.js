const express = require('express');

const userAuthMiddleware = require('../middlewares/userAuthMiddleware');
const PaymentControllers = require('../controllers/PaymentSuccessHandler');

const paymentRouter = express.Router();

paymentRouter.get('/:paymentId', userAuthMiddleware, PaymentControllers.paymentSuccessHandler);

module.exports = paymentRouter;