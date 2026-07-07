const mainCategoryRouter = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

mainCategoryRouter.get("/", CategoryController.getMainCategories);

module.exports = mainCategoryRouter;