const HomeCategory = require("../models/HomeCategory");
const Category = require("../models/Category");
class HomeCategoryServices {
  async createHomeCategory(homeCategory) {
    try {
      const exists = await HomeCategory.findOne({
        categoryId: homeCategory.categoryId,
        section: homeCategory.section,
      });

      if (exists) {
        throw new Error(
          "Home category already exists in this section."
        );
      }

      return await HomeCategory.create(homeCategory);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCategories(homeCategories) {
    try {
      const count = await HomeCategory.countDocuments();

      if (count > 0) {
        throw new Error("Home categories already exist.");
      }

      return await HomeCategory.insertMany(homeCategories);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateHomeCategoryById(homeCategory, id) {
    try {
      const category = await HomeCategory.findByIdAndUpdate(
        id,
        homeCategory,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!category) {
        throw new Error("Home category not found.");
      }

      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findHomeCategoryById(id) {
    try {
      const category = await HomeCategory.findById(id)
        .populate("categoryId");

      if (!category) {
        throw new Error("Invalid Home Category ID.");
      }

      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findAllHomeCategory() {
    try {
      const homeCategories = await HomeCategory.find()
        .populate("categoryId")
        .sort({ createdAt: -1 });

      return homeCategories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getHomeCategories() {
    try {
      return await HomeCategory.find()
        .populate("categoryId")
        .sort({ createdAt: 1 });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCategories() {
    try {
      return await Category.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(error.message);
    }
  }


}



module.exports = new HomeCategoryServices();