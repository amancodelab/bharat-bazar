const express = require('express');
const userControllers = require('../controllers/Usercontrollers');
const Authcontrollers = require("../controllers/AuthContorllers");
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");


const userRoutes = express.Router();

userRoutes.get("/profile", userAuthMiddleware, userControllers.getUserProfile);
userRoutes.post("/register", Authcontrollers.createUser);
userRoutes.post("/register/verify", userControllers.verifyOtp);
userRoutes.get("/get/:id", userAuthMiddleware, userControllers.getUserById);
userRoutes.put("/update", userAuthMiddleware, userControllers.updateUser);
userRoutes.post("/login", userControllers.generatedOtpforLogin);
userRoutes.post('/login/verify', userControllers.verifyOtp);


module.exports = userRoutes;
