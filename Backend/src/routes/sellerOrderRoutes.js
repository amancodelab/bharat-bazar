const express = require('express');
const OrderControllers = require('../controllers/OrderControllers');
const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddlware');

const sellerOrderRoutes = express.Router();

sellerOrderRoutes.get("/", sellerAuthMiddleware, OrderControllers.getOrderBySeller);

sellerOrderRoutes.put('/:orderId', sellerAuthMiddleware, OrderControllers.updateOrderStatus);


module.exports = sellerOrderRoutes;