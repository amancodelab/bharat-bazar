
const CartItem = require("../models/CartItem");

class CartItemServices {
  async removeCartItem(UserId, cartItemId) {
    try {
      const cartItem = await this.findCartItem(cartItemId);
      if (cartItem.userId.toString() !== UserId.toString()) {
        throw new Error('Unauthorise Activity during the remove the Cart Item')
      };

      await CartItem.findByIdAndDelete(cartItem._id);

      return cartItem
    } catch (error) {
      throw new Error(error.message);
    }

  }

  async updateCartItem(UserId, cartItemId, updateData) {
    try {
      const cartItem = await this.findCartItem(cartItemId);
      if (cartItem.userId.toString() !== UserId.toString()) {
        throw new Error('Unauthorise Activity during the update the Cart Item')
      };

      return await CartItem.findOneAndUpdate({ _id: cartItem._id }, updateData, { new: true });

    } catch (error) {
      throw new Error(error.message);
    }

  }

  async findCartItem(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");

    if (!cartItem) {
      throw new Error('No cartItem is found');
    };

    return cartItem;
  }
}


module.exports = new CartItemServices();