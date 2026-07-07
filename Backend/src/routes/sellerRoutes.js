const express = require('express');
const sellerControllers = require('../controllers/sellerControllers');
const Authcontrollers = require("../controllers/AuthContorllers");
const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddlware');
const AuthContorllers = require('../controllers/AuthContorllers');


const sellerRoutes = express.Router();

sellerRoutes.get("/profile", sellerAuthMiddleware, sellerControllers.getSellerProfile);

sellerRoutes.post("/register", Authcontrollers.createSeller);

sellerRoutes.get("/get/:id", sellerAuthMiddleware, sellerControllers.getSellerById);
sellerRoutes.put("/update", sellerAuthMiddleware, sellerControllers.updateSeller);
sellerRoutes.post("/login", sellerControllers.generatedOtpforLogin);
sellerRoutes.post("/login/verify", sellerControllers.verifyOtp);
sellerRoutes.post("/register/verify", sellerControllers.verifyRegisterOtp);
sellerRoutes.post("/logout", AuthContorllers.sellerLogout);

module.exports = sellerRoutes;
