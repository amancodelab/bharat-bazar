const express = require('express');
const homepage = require('../controllers/HomeCategoryControllers');
const HomeCategoryControllers = require('../controllers/HomeCategoryControllers');

const homepageRoutes = express.Router();

homepageRoutes.get('/', HomeCategoryControllers.getHomePage);

module.exports = homepageRoutes;