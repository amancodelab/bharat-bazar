const express = require('express');

const SellerReportController = require('../controllers/sellerReportControllers');
const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddlware');

const SellerReportRoutes = express.Router();

SellerReportRoutes.get('/', sellerAuthMiddleware, SellerReportController.getSellerReport);

SellerReportRoutes.put("/sellerReport/:sellerReportId", sellerAuthMiddleware, SellerReportController.updateSellerReport);


module.exports = SellerReportRoutes;