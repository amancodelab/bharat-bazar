const ShopCategoryService = require("../services/ShopCategoryService");

class ShopCategoryController {
  async createShopCategory(req, res) {
    try {
      const category = await ShopCategoryService.createShopCategory(
        req.body
      );

      res.status(201).json({
        status: true,
        data: category,
        msg: "Shop Category Created Successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
  }

  async getShopCategories(req, res) {
    try {
      const categories =
        await ShopCategoryService.getShopCategories();

      res.status(200).json({
        status: true,
        data: categories,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
  }

  async getShopCategoryById(req, res) {
    try {
      const category =
        await ShopCategoryService.getShopCategoryById(
          req.params.id
        );

      res.status(200).json({
        status: true,
        data: category,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
  }

  async updateShopCategory(req, res) {
    try {
      const category =
        await ShopCategoryService.updateShopCategory(
          req.params.id,
          req.body
        );

      res.status(200).json({
        status: true,
        data: category,
        msg: "Updated Successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
  }

  async deleteShopCategory(req, res) {
    try {
      await ShopCategoryService.deleteShopCategory(
        req.params.id
      );

      res.status(200).json({
        status: true,
        msg: "Deleted Successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        msg: err.message,
      });
    }
  }
}

module.exports = new ShopCategoryController();