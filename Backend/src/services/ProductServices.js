const Product = require("../models/Product");
const Category = require("../models/Category");
const Seller = require("../models/Seller");
const calculateDiscountPercentage = require("../utils/calculateDiscountPercent");
const mongoose = require("mongoose");
class ProductService {
  async createProduct(req, seller) {
    try {
      const isSellerValid = await Seller.findOne({ email: seller.email });
      if (!isSellerValid) {
        throw new Error("To register the Product first create selller account");
      };

      const discountPercent = calculateDiscountPercentage(req.body.mrp, req.body.sellingPrice);

      const category1 = await this.createOrGetCategory(req.body.category, 1);

      const category2 = await this.createOrGetCategory(req.body.category2, 2, category1._id);

      const category3 = await this.createOrGetCategory(req.body.category3, 3, category2._id);

      const product = new Product({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        sellingPrice: req.body.sellingPrice,
        mrp: req.body.mrp,
        quantity: req.body.quantity,
        discountPercent,
        size: req.body.size,
        seller: seller._id,
        category: category3._id,
        ...(req.body.color && { color: req.body.color }),
      });

      return await product.save();

    } catch (error) {
      throw new Error(error.message);
    }
  }

  // create or get catergory catergoryId ,level,parent id
  async createOrGetCategory(categoryId, level, parentId = null) {
    let category = await Category.findOne({ categoryId });

    if (!category) {
      category = new Category({
        categoryId,
        level,
        parentCategory: parentId,
        name: categoryId,
      });

      await category.save();
    }

    return category;
  }

  // to delete the product with product id
  async deleteProduct(productId) {
    try {

      const product = await Product.findById(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      await Product.findByIdAndDelete(productId);

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // find the Product with Id
  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("No Prouduct is Found with Given Id ");
      };
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // update the Product with Id
  async updateProduct(productId, productUpdate) {
    try {
      const product = await Product.findByIdAndUpdate(productId, productUpdate, { new: true });
      if (!product) {
        throw new Error("No Prouduct is Found with given id");
      };
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // search the product

  async searchProduct(query) {
    try {
      query = query.trim();

      // Primary search
      let products = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $addFields: {
            priority: {
              $switch: {
                branches: [
                  // Exact title
                  {
                    case: {
                      $eq: [
                        { $toLower: "$title" },
                        query.toLowerCase(),
                      ],
                    },
                    then: 1,
                  },

                  // Title starts with query
                  {
                    case: {
                      $regexMatch: {
                        input: "$title",
                        regex: "^" + query,
                        options: "i",
                      },
                    },
                    then: 2,
                  },

                  // Title contains query
                  {
                    case: {
                      $regexMatch: {
                        input: "$title",
                        regex: query,
                        options: "i",
                      },
                    },
                    then: 3,
                  },

                  // Level 3 category
                  {
                    case: {
                      $and: [
                        { $eq: ["$category.level", 3] },
                        {
                          $regexMatch: {
                            input: "$category.name",
                            regex: query,
                            options: "i",
                          },
                        },
                      ],
                    },
                    then: 4,
                  },

                  // Description
                  {
                    case: {
                      $regexMatch: {
                        input: "$description",
                        regex: query,
                        options: "i",
                      },
                    },
                    then: 5,
                  },
                ],
                default: 100,
              },
            },
          },
        },
        {
          $match: {
            priority: { $lt: 100 },
          },
        },
        {
          $sort: {
            priority: 1,
            createdAt: -1,
          },
        },
      ]);

      // If found, return immediately
      if (products.length > 0) {
        return products;
      }

      // Fallback: search Level 2 category
      products = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $match: {
            "category.level": 2,
            "category.name": {
              $regex: query,
              $options: "i",
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductBySeller(sellerId) {
    try {
      const products = await Product.find({ seller: sellerId });
      if (products.length === 0) {
        return [];
      };

      return products;

    } catch (error) {
      throw new Error(error.message);
    }
  };

  //async get all product with query

  async getAllProduct(req) {
    try {
      const filterQuery = {};
      if (req.query.category) {
        const category = await Category.findOne({ categoryId: req.query.category });
        if (!category) {
          return {
            content: [],
            totalElement: 0,
            totalPage: 0
          }
        };
        filterQuery.category = category._id;
      };

      if (req.query.color) {
        filterQuery.color = req.query.color;
      };
      if (req.query.minPrice && req.query.maxPrice) {
        filterQuery.sellingPrice = {
          $gte: Number(req.query.minPrice),
          $lte: Number(req.query.maxPrice)
        };
      };

      if (req.query.minDiscount) {
        filterQuery.discountPercent = {
          $gte: (req.query.minDiscount),
        }
      }

      if (req.query.size) {
        filterQuery.size = {
          $gte: (req.query.size),
        }
      }

      let sortQuery = {};
      if (req.query.sort === "price_Low") {
        sortQuery.sellingPrice = 1;
      }
      else if (req.query.sort === "price_High") {
        sortQuery.sellingPrice = -1;
      };

      const products = await Product.find(filterQuery)
        .sort(sortQuery)
        .skip(req.query.pageNumber * 10)
        .limit(10).populate('category').populate('seller');

      const totalElement = await Product.countDocuments(filterQuery);
      const totalPage = Math.ceil(totalElement / 10);

      return {
        content: products,
        totalPage,
        totalElement
      }


    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSimilarProducts(productId) {

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid Product Id");
    }

    const currentProduct = await Product.findById(productId)
      .populate("category");

    if (!currentProduct) {
      throw new Error("Product not found");
    }

    const level3 = currentProduct.category;

    // -------------------------
    // Priority 1
    // Same Level 3 Category
    // -------------------------

    let similarProducts = await Product.find({
      _id: { $ne: currentProduct._id },
      category: level3._id,
    })
      .populate("category")
      .populate("seller")
      .limit(8);

    if (similarProducts.length >= 8) {
      return similarProducts;
    }

    // -------------------------
    // Find Level 2
    // -------------------------

    const level2 = await Category.findById(level3.parentCategory);

    if (!level2) {
      return similarProducts;
    }

    const level3Categories = await Category.find({
      parentCategory: level2._id,
      level: 3,
    });

    const level3Ids = level3Categories.map((item) => item._id);

    // -------------------------
    // Priority 2
    // Same Level 2
    // -------------------------

    const level2Products = await Product.find({
      _id: {
        $nin: [
          currentProduct._id,
          ...similarProducts.map((p) => p._id),
        ],
      },
      category: {
        $in: level3Ids,
      },
    })
      .populate("category")
      .populate("seller")
      .limit(8 - similarProducts.length);

    similarProducts.push(...level2Products);

    if (similarProducts.length >= 8) {
      return similarProducts;
    }

    // -------------------------
    // Find Level 1
    // -------------------------

    const level1 = await Category.findById(level2.parentCategory);

    if (!level1) {
      return similarProducts;
    }

    const level2Categories = await Category.find({
      parentCategory: level1._id,
      level: 2,
    });

    const level2Ids = level2Categories.map((c) => c._id);

    const allLevel3 = await Category.find({
      parentCategory: {
        $in: level2Ids,
      },
      level: 3,
    });

    const allLevel3Ids = allLevel3.map((c) => c._id);

    // -------------------------
    // Priority 3
    // Same Level 1
    // -------------------------

    const level1Products = await Product.find({
      _id: {
        $nin: [
          currentProduct._id,
          ...similarProducts.map((p) => p._id),
        ],
      },
      category: {
        $in: allLevel3Ids,
      },
    })
      .populate("category")
      .populate("seller")
      .limit(8 - similarProducts.length);

    similarProducts.push(...level1Products);

    return similarProducts;
  }


}

module.exports = new ProductService();