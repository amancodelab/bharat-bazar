const express = require('express');

const HomeCategoryControllers = require('../controllers/HomeCategoryControllers');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const homeCategoryRoutes = express.Router();

homeCategoryRoutes.get('/all', HomeCategoryControllers.getAllHomeCategory);

homeCategoryRoutes.put('/update/:homeCategoryId', adminAuthMiddleware, HomeCategoryControllers.updateHomeCategory);

homeCategoryRoutes.post('/add', adminAuthMiddleware, HomeCategoryControllers.createHomeCategory);

homeCategoryRoutes.post('/adds', adminAuthMiddleware, HomeCategoryControllers.createHomeCategories);
homeCategoryRoutes.get("/categories", HomeCategoryControllers.getAllCategories);

homeCategoryRoutes.get('/:homeCategoryId', HomeCategoryControllers.getHomeCategory);


module.exports = homeCategoryRoutes;