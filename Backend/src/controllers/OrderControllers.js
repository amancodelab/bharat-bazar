const OrderServices = require('../services/OrderServices');
const CartServices = require('../services/CartServices');
const errorResponse = require('../utils/response/errorResponse');
const successResponse = require('../utils/response/successResponse');
const User = require('../models/User');
const OrderStatus = require('../domain/OrderStatus');


class OrderControllers {
  async createOrder(req, res) {
    try {

      const user = req.user;
      let shippingAddress;
      if (!req.body.shippingAddress) {
        shippingAddress = user.address;
      } else {
        shippingAddress = req.body.shippingAddress;
      }

      const cart = await CartServices.findUserCart(user);

      const order = await OrderServices.createOrder(user, shippingAddress, cart);

      return successResponse(res, 201, "Successfully created order", order);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  };

  // findorder by order Id

  async findOrderbyId(req, res) {
    try {
      if (!req.params.orderId) {
        return errorResponse(res, 400, "Missing the Order id");
      };
      const orderId = req.params.orderId;
      const order = await OrderServices.findOrderById(orderId);

      return successResponse(res, 200, "Successfully found the Order", order);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // to find the user history  by userid

  async orderHistoryByUserId(req, res) {
    try {
      if (!req.params.userId) {
        return errorResponse(res, 400, "Missing the user id");
      };
      const userId = req.params.userId;
      const isValid = await User.findById(userId);
      if (!isValid) {
        return errorResponse(res, 401, "Unauthorise Acitivity for finding the User order history");
      }
      const orders = await OrderServices.userOrderHistory(userId);

      return successResponse(res, 200, "Successfully found the Orders", orders);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  };


  // update the order status 

  async updateOrderStatus(req, res) {
    try {
      if (!req.params.orderId) {
        return errorResponse(res, 400, "Missing the order id ");
      };

      if (!req.params.orderId && !req.body.status) {
        return errorResponse(res, 400, "Missing the status id ")
      }

      const orderId = req.params.orderId;
      const status = req.body.status || req.params.status;

      console.log("Status:", status);
      console.log("OrderId:", orderId);
      const order = await OrderServices.updateOrders(orderId, status);
      return successResponse(res, 200, "user had Updated Successfully", order);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // cancel the order 

  async cancelOrder(req, res) {

    try {

      if (!req.params.orderId) {
        return errorResponse(res, 400, "Missing the order id");
      }

      if (!req.user) {
        return errorResponse(res, 401, "Unauthorised Activity denied");
      }

      const orderId = req.params.orderId;

      const user = req.user;

      const order = await OrderServices.cancelOrders(orderId, user);
      return successResponse(res, 200, "Successfully cancelled the Order", order);

    } catch (error) {

      return errorResponse(res, 500, error.message);

    }

  }

  //  find the orderItem by OrderItem id

  async findOrderItemById(req, res) {
    try {
      if (!req.params.orderItemId) {
        return errorResponse(res, 400, "Missing the Order Item id");
      };
      const orderItemId = req.params.orderItemId;
      const orderItem = await OrderServices.findOrderItemById(orderItemId);

      return successResponse(res, 200, "Successfully found the Order Item", orderItem);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getOrderBySeller(req, res) {
    try {
      if (!req.seller) {
        return errorResponse(res, 401, "Unauthorised Activity in Seller update order");
      };
      const seller = req.seller;

      const orders = await OrderServices.getSellerOrders(seller._id);

      return successResponse(res, 200, "Successfully found all Orders", orders);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

}

module.exports = new OrderControllers();