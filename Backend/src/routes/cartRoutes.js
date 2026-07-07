const express = require("express");
const CartControllers = require("../controllers/CartControllers");
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

const cartRoutes = express.Router();

cartRoutes.post('/add', userAuthMiddleware, CartControllers.addCart);
cartRoutes.get("/cartItem/:cartItemId", userAuthMiddleware, CartControllers.findCartItemById);
cartRoutes.delete('/delete/:cartItemId', userAuthMiddleware, CartControllers.deleteCartItemById);
cartRoutes.put('/update/:cartItemId', userAuthMiddleware, CartControllers.updateCartItemById);
cartRoutes.get('/', userAuthMiddleware, CartControllers.findUserCartByUser);


module.exports = cartRoutes;