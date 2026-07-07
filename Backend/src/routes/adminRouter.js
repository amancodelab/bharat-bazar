const express = require("express");
const sellerControllers = require('../controllers/sellerControllers');
const AuthContorllers = require("../controllers/AuthContorllers");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");


const adminRoutes = express.Router();

adminRoutes.get("/get/all", adminAuthMiddleware, sellerControllers.getAllSellers);

adminRoutes.put("/update/seller/:id/accountStatus/:accountStatus", adminAuthMiddleware, sellerControllers.updateSellerAccountStatus);
adminRoutes.get("/get/seller", adminAuthMiddleware, sellerControllers.getSellerByEmail);
adminRoutes.post('/register', AuthContorllers.createAdmin);
adminRoutes.post("/logout", AuthContorllers.adminLogout);
adminRoutes.post('/login', AuthContorllers.adminLogin);
adminRoutes.post('/auth/verify/:method', AuthContorllers.verifyAdmin);
adminRoutes.post('/auth/verify', AuthContorllers.verifyAdmin);
adminRoutes.get(
  "/profile", adminAuthMiddleware,
  AuthContorllers.getAdminProfile
);

module.exports = adminRoutes;