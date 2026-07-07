const express = require('express');
const AuthControllers = require('../controllers/AuthContorllers');

const authRouter = express.Router();

authRouter.post("/access-token/:role", AuthControllers.createAccessToken);


module.exports = authRouter;