const express = require('express');
const DealControllers = require('../controllers/DealControllers');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const dealRoutes = express.Router();

dealRoutes.get("/all", DealControllers.getAllDeal);
dealRoutes.post('/add', adminAuthMiddleware, DealControllers.createDeal);
dealRoutes.put('/update/:dealId', adminAuthMiddleware, DealControllers.updateDeal);
dealRoutes.delete("/delete/:dealId", adminAuthMiddleware, DealControllers.deleteDeal)
dealRoutes.get('/:dealId', DealControllers.findDealById);

module.exports = dealRoutes;