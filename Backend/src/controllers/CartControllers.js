const CartItemService = require("../services/CartItemService");
const CartServices = require("../services/CartServices");
const errorResponse = require("../utils/response/errorResponse");
const successResponse = require("../utils/response/successResponse");

class CartControllers {
  // Get logged-in user's cart
  async findUserCartByUser(req, res) {
    try {
      const user = req.user;

      const cart = await CartServices.findUserCart(user);

      return successResponse(
        res,
        200,
        "Find the Cart Successfully",
        cart
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Add product to cart
  async addCart(req, res) {
    try {
      const user = req.user;

      if (Object.keys(req.body).length === 0) {
        return errorResponse(
          res,
          400,
          "Missing cart item data"
        );
      }

      const cart = await CartServices.addCartItem(
        user,
        req.body
      );

      return successResponse(
        res,
        201,
        "Cart item added successfully",
        cart
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Delete cart item
  async deleteCartItemById(req, res) {
    try {
      const user = req.user;

      const cartItemId =
        req.params.cartItemId || req.query.cartItemId;

      if (!cartItemId) {
        return errorResponse(
          res,
          400,
          "Missing Cart Item Id"
        );
      }

      await CartItemService.removeCartItem(
        user._id,
        cartItemId
      );

      const cart = await CartServices.findUserCart(user);

      return successResponse(
        res,
        200,
        "Cart item deleted successfully",
        cart
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Update cart item
  async updateCartItemById(req, res) {
    try {
      const user = req.user;

      const cartItemId =
        req.params.cartItemId || req.query.cartItemId;

      if (!cartItemId) {
        return errorResponse(
          res,
          400,
          "Missing Cart Item Id"
        );
      }

      if (Object.keys(req.body).length === 0) {
        return errorResponse(
          res,
          400,
          "Missing update data"
        );
      }

      await CartItemService.updateCartItem(
        user._id,
        cartItemId,
        req.body
      );

      const cart = await CartServices.findUserCart(user);

      return successResponse(
        res,
        200,
        "Cart updated successfully",
        cart
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // Find single cart item
  async findCartItemById(req, res) {
    try {
      const cartItemId =
        req.params.cartItemId || req.query.cartItemId;

      if (!cartItemId) {
        return errorResponse(
          res,
          400,
          "Missing Cart Item Id"
        );
      }

      const cartItem =
        await CartItemService.findCartItem(cartItemId);

      return successResponse(
        res,
        200,
        "Cart item found successfully",
        cartItem
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = new CartControllers();