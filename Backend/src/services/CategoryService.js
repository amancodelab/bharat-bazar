const mainCategory = require("../data/mainCategory");

class CategoryService {
  getMainCategories() {
    return mainCategory;
  }
}

module.exports = new CategoryService();