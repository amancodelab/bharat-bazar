const router = require("express").Router();

const ShopCategoryController = require("../controllers/ShopCategoryController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/add", adminAuthMiddleware, ShopCategoryController.createShopCategory);

router.get("/", ShopCategoryController.getShopCategories);

router.get("/:id", ShopCategoryController.getShopCategoryById);

router.put(
  "/update/:id",
  adminAuthMiddleware,
  ShopCategoryController.updateShopCategory
);

router.delete(
  "/delete/:id",
  adminAuthMiddleware,
  ShopCategoryController.deleteShopCategory
);

module.exports = router;
