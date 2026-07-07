const ProductServices = require('../services/ProductServices');
const errorResponse = require('../utils/response/errorResponse');
const successResponse = require('../utils/response/successResponse');

class ProductController {
  // get Products by seller Id
  async getProductBySellerId(req, res) {
    try {
      const seller = req.seller;
      const products = await ProductServices.getProductBySeller(seller._id);
      return successResponse(res, 200, "Success Fetch the all Products", products);

    } catch (error) {
      console.log("Error Msg:", error.message);
      return errorResponse(res, 500);
    }
  }

  // get Products by seller Id
  async getProductById(req, res) {
    try {
      if (!req.params.productId) {
        console.log("missing the Product Id");
        return errorResponse(res, 400, "Missing the Product id")
      };
      const products = await ProductServices.getProductById(req.params.productId);
      return successResponse(res, 200, "Success Fetch the Products", products);

    } catch (error) {
      console.log("Error Msg:", error.message);
      return errorResponse(res, 500);
    }
  }

  // create a product 
  async createProduct(req, res) {
    try {
      const seller = req.seller;
      const products = await ProductServices.createProduct(req, seller);

      return successResponse(res, 201, "New Proudct had create Successfully", products);

    } catch (error) {
      console.log("Error Msg:", error.message);
      return errorResponse(res, 500);
    }
  }

  // delete the Products
  async deleteProduct(req, res) {
    try {
      if (!req.params.productId) {
        return errorResponse(res, 400, "Missing the Product Id");
      };

      const products = await ProductServices.deleteProduct(req.params.productId);

      return successResponse(res, 200, "Product had removed Successfully", products);

    } catch (error) {
      console.log("Error Msg:", error.message);
      return errorResponse(res, 500);
    }
  }

  // update the Products
  async updateProduct(req, res) {
    try {
      if (!req.params.productId) {
        return errorResponse(res, 400, "Missing the Id");
      }

      if (Object.keys(req.body).length === 0) {
        return errorResponse(res, 400, "Request body is empty");
      }

      const products = await ProductServices.updateProduct(
        req.params.productId,
        req.body
      );

      return successResponse(
        res,
        200,
        "Product had Successfully Updated",
        products
      );

    } catch (error) {
      console.log("Error Msg:", error.message);
      return errorResponse(res, 500);
    }
  }


  // search the Products


  // search the product 
  async searchProduct(req, res) {
    try {
      if (!req.query.query) {
        return errorResponse(res, 400, "Missing query");
      }

      const products = await ProductServices.searchProduct(req.query.query);

      return successResponse(
        res,
        200,
        "Product fetched successfully",
        products
      );
    } catch (error) {
      console.log("Error:", error.message);
      return errorResponse(res, 500, error.message);
    }
  }
  // getAll product 

  // search the Products
  async getAllProduct(req, res) {
    try {
      if (!req.query) {
        return errorResponse(res, 400, "Missing query");
      };

      const products = await ProductServices.getAllProduct(req);

      return successResponse(res, 200, "Product had fetch Successfuly", products);

    } catch (error) {
      console.log("Error Msg:", error.message);
      return errorResponse(res, 500);
    }
  }

  // Get Similar Products
  async getSimilarProducts(req, res) {

    try {
      const { productId } = req.params;

      if (!productId) {
        return errorResponse(res, 400, "Missing Product Id");
      }

      const products = await ProductServices.getSimilarProducts(productId);

      return successResponse(
        res,
        200,
        "Successfully fetched similar products",
        products
      );
    } catch (error) {

      console.log("Error Msg:", error.message);
      return errorResponse(res, 500, error.message);
    }
  }

}

module.exports = new ProductController();