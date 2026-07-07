const ShopCategory = require("../models/ShopCategoryModel");

class ShopCategoryService {
  async createShopCategory(data) {
    return await ShopCategory.create(data);
  }

  async getShopCategories() {
    return await ShopCategory.find().sort({
      createdAt: -1,
    });
  }

  async getShopCategoryById(id) {
    return await ShopCategory.findById(id);
  }

  async updateShopCategory(id, data) {
    return await ShopCategory.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async deleteShopCategory(id) {
    return await ShopCategory.findByIdAndDelete(id);
  }
}

module.exports = new ShopCategoryService();