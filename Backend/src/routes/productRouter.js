const express = require('express');
const ProductControllers = require('../controllers/ProductControllers');
const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddlware');

const productRoutes = express.Router();

productRoutes.get("/search", ProductControllers.searchProduct);

productRoutes.get("/all", ProductControllers.getAllProduct);
productRoutes.get(
  "/seller/products",
  sellerAuthMiddleware,
  ProductControllers.getProductBySellerId
);
productRoutes.get("/similar/:productId", ProductControllers.getSimilarProducts);
productRoutes.put("/update/:productId", sellerAuthMiddleware, ProductControllers.updateProduct);

productRoutes.post("/create", sellerAuthMiddleware, ProductControllers.createProduct);
productRoutes.delete("/delete/:productId", sellerAuthMiddleware, ProductControllers.deleteProduct);

productRoutes.get("/:productId", ProductControllers.getProductById);


module.exports = productRoutes;


