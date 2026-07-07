const Cart = require("../models/Cart");
const CartItem = require('../models/CartItem');
const calculateDiscountPercent = require("../utils/calculateDiscountPercent");
const Product = require("../models/Product");

class CartServices {
  async findUserCart(user) {
    try {
      let cart = await Cart.findOne({ user: user._id });
      if (!cart) {
        throw new Error("Cart not found");
      };

      let totalMrp = 0;
      let totalSellingPrice = 0;
      let totalItem = 0;

      const cartItems = await CartItem.find({ cart: cart._id }).populate({
        path: "product",
        populate: {
          path: "seller",
        },
      });
      cart.cartItems = cartItems;

      cartItems.forEach((cartItem) => {
        totalMrp += cartItem.mrp * cartItem.quantity;
        totalSellingPrice += cartItem.sellingPrice * cartItem.quantity;
        totalItem += cartItem.quantity;
      });

      cart.totalItem = totalItem;
      cart.totalMrp = totalMrp;
      cart.totalSellingPrice = totalSellingPrice;
      cart.totalDiscount = calculateDiscountPercent(totalMrp, totalSellingPrice);

      await cart.save();

      return cart;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addCartItem(user, cartItemData) {
    try {

      const cart = await Cart.findOne({
        user: user._id
      });

      if (!cart) {
        throw new Error(
          "Create the Account to add cart"
        );
      }
      const product = await Product.findById(
        cartItemData.productId
      );

      if (!product) {
        throw new Error(
          "Product not found"
        );
      }

      const isCartItemPresent =
        await CartItem.findOne({
          cart: cart._id,
          product: product._id,
          size: cartItemData.size
        });

      if (isCartItemPresent) {
        throw new Error(
          "Cart already exists please increase quantity"
        );
      }
      console.log("cart is going to create")
      const cartItem =
        await CartItem.create({
          product: product._id,
          quantity: cartItemData.quantity,
          userId: user._id,
          sellingPrice: product.sellingPrice,
          mrp: product.mrp,
          size: cartItemData.size,
          cart: cart._id
        });

      cart.cartItems.push(cartItem._id);
      console.log("cart is created")
      await cart.save();

      return await this.findUserCart(user);

    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = new CartServices();