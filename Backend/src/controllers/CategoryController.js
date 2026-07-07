const CategoryService = require("../services/CategoryService");

class CategoryController {
  getMainCategories(req, res) {
    try {
      const categories = CategoryService.getMainCategories();

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
}

module.exports = new CategoryController();