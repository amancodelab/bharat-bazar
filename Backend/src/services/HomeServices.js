const HomeCategorySection = require('../domain/HomeCategorySection');
const HomeCategory = require('../models/HomeCategory');
const DealServices = require('../services/DealServices');
const HomeCategoryServices = require('./HomeCategoryServices');

class HomeServices {
  async createHomePageData(allCategory) {
    const electricCategories = allCategory.filter((category) => category.section === HomeCategorySection.ELECTRIC_CATEGORIES);

    const grid = allCategory.filter((category) => category.section === HomeCategorySection.GRID);
    const shopByCategories = allCategory.filter((category) => category.section === HomeCategorySection.SHOP_BY_CATEGORIES);

    const dealCategories = allCategory.filter((category) => category.section === HomeCategorySection.DEALCATEGORIES);

    const deals = await DealServices.getAllDeals();

    const home = {
      ELECTRIC_CATEGORIES: electricCategories,
      GRID: grid,
      SHOP_BY_CATEGORIES: shopByCategories,
      DEALS: deals,
      DEALCATEGORIES: dealCategories
    }

    return home
  }

  async getHomePage() {
    try {
      // Get all home categories
      const allCategory = await HomeCategoryServices.findAllHomeCategory();

      // Get all deals
      const deals = await DealServices.getAllDeals();

      return {
        ELECTRIC_CATEGORIES: allCategory.filter(
          (category) =>
            category.section === HomeCategorySection.ELECTRIC_CATEGORIES
        ),

        GRID: allCategory.filter(
          (category) => category.section === HomeCategorySection.GRID
        ),

        SHOP_BY_CATEGORIES: allCategory.filter(
          (category) =>
            category.section === HomeCategorySection.SHOP_BY_CATEGORIES
        ),

        DEALCATEGORIES: allCategory.filter(
          (category) =>
            category.section === HomeCategorySection.DEALCATEGORIES
        ),

        DEALS: deals,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }


}


module.exports = new HomeServices();