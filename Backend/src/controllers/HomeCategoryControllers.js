const HomeCategoryServices = require('../services/HomeCategoryServices');
const errorResponse = require('../utils/response/errorResponse');
const successResponse = require('../utils/response/successResponse');
const HomeServices = require('../services/HomeServices');


class HomeCategoryControllers {
  // single Homecategory  creating 
  async createHomeCategory(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Missing the Home category details")
      };
      const homecategory = req.body;
      const newHomeCategory = await HomeCategoryServices.createHomeCategory(homecategory);

      return successResponse(res, 201, "Successfully Created the Home Category", newHomeCategory);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // create the Multiple home categories
  async createHomeCategories(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Missing the Home categories details")
      };
      const homecategories = req.body;
      const newHomeCategories = await HomeCategoryServices.createCategories(homecategories);

      return successResponse(res, 201, "Successfully Created the Home Category", newHomeCategories);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  // get hoem category by homeCategoryId
  async getHomeCategory(req, res) {
    try {
      if (!req.params.homeCategoryId) {
        return errorResponse(res, 400, "Missing the Home category id details")
      };
      const homeCategoryId = req.params.homeCategoryId;
      const homeCategory = await HomeCategoryServices.findHomeCategoryById(homeCategoryId);

      return successResponse(res, 200, "Successfully found the Home Category", homeCategory);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  };

  // update the Home category using the homecategory Id and homecatory from body

  async updateHomeCategory(req, res) {
    try {

      if (!req.params.homeCategoryId) {
        return errorResponse(res, 400, "Missing the Home category id details")
      };

      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Missing the updated categories details")
      };

      const homeCategoryId = req.params.homeCategoryId;
      const homecategory = req.body;

      const updatedHomeCategory = await HomeCategoryServices.updateHomeCategoryById(homecategory, homeCategoryId);

      return successResponse(res, 200, "Successfully Find and Upated the Home category", updatedHomeCategory);

    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }


  // get all home categories 

  async getAllHomeCategory(req, res) {
    try {
      const homecategories = await HomeCategoryServices.findAllHomeCategory();
      return successResponse(res, 200, "Successfully found the all Home category", homecategories)
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  };

  // homepage page


  async getHomePage(req, res) {
    try {
      const home = await HomeServices.getHomePage();

      return successResponse(
        res,
        200,
        "Homepage fetched successfully",
        home
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories =
        await HomeCategoryServices.getAllCategories();

      return successResponse(
        res,
        200,
        "Categories fetched successfully",
        categories
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

}

module.exports = new HomeCategoryControllers();