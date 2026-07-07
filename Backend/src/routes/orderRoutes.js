const express = require("express");

const OrderControllers = require("../controllers/OrderControllers");

const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

const orderRoutes = express.Router();

orderRoutes.post(
  '/add',
  userAuthMiddleware,
  OrderControllers.createOrder
);

orderRoutes.get(
  "/orderItem/:orderItemId",
  userAuthMiddleware,
  OrderControllers.findOrderItemById
);

orderRoutes.put(
  '/cancel/:orderId',
  userAuthMiddleware,
  OrderControllers.cancelOrder
);

orderRoutes.put(
  '/update/:orderId',
  userAuthMiddleware,
  OrderControllers.updateOrderStatus
);

orderRoutes.get(
  '/user/:userId',
  userAuthMiddleware,
  OrderControllers.orderHistoryByUserId
);

orderRoutes.get(
  '/:orderId',
  userAuthMiddleware,
  OrderControllers.findOrderbyId
);

module.exports = orderRoutes;