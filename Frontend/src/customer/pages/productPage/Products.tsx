import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  ThemeProvider,
  type SelectChangeEvent,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

import { customTheme } from "../../../theme/customTheme";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";

import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import {
  getAllProducts,
  searchProduct,
  type Product,
} from "../../../ReduxToolkit/Features/User/ProductSlice";
import { discountValue } from "../Data/discountValue";
import { priceValue } from "../Data/priceValue";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const dispatch = useAppDispatch();

  const {
    products,
    searchProduct: searchProducts,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  /* ---------------------------- STATES ---------------------------- */

  const [sort, setSort] = useState("price_low");

  const [page, setPage] = useState(1);

  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    color: "",
    price: "",
    discount: "",
    rating: "",
    stock: false,
  });

  /* ---------------------------- FETCH ----------------------------- */

  useEffect(() => {
    if (search && search.trim() !== "") {
      dispatch(searchProduct(search));
    } else {
      dispatch(getAllProducts());
    }

    setPage(1);
  }, [dispatch, search]);
  /* ------------------------- SORT HANDLER ------------------------- */

  const handleChangeSort = (e: SelectChangeEvent) => {
    setSort(e.target.value);
    setPage(1);
  };

  /* ------------------------- FILTER LOGIC ------------------------- */

  const filteredProducts = useMemo(() => {
    const currentProducts =
      search && search.trim() !== "" ? searchProducts : products;

    let filtered = [...currentProducts];

    // Color
    if (filters.color) {
      filtered = filtered.filter(
        (product) =>
          product.color.toLowerCase() === filters.color.toLowerCase(),
      );
    }

    // Stock
    if (filters.stock) {
      filtered = filtered.filter((product) => product.quantity > 0);
    }

    // Discount
    if (filters.discount) {
      const selectedDiscount = discountValue.find(
        (item) => item.value === filters.discount,
      );

      if (selectedDiscount) {
        filtered = filtered.filter((product) => {
          const discount = product.discountPercent;

          if (selectedDiscount.max === null) {
            return discount >= selectedDiscount.min;
          }

          return (
            discount >= selectedDiscount.min && discount < selectedDiscount.max
          );
        });
      }
    }

    // Price
    if (filters.price) {
      const selectedPrice = priceValue.find(
        (item) => item.value === filters.price,
      );

      if (selectedPrice) {
        filtered = filtered.filter((product) => {
          const price = product.sellingPrice;

          if (selectedPrice.max === null) {
            return price >= selectedPrice.min;
          }

          return price >= selectedPrice.min && price <= selectedPrice.max;
        });
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case "price_low":
          return a.sellingPrice - b.sellingPrice;

        case "price_high":
          return b.sellingPrice - a.sellingPrice;

        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchProducts, search, filters, sort]);

  /* ------------------------- PAGINATION -------------------------- */

  const PRODUCTS_PER_PAGE = 12;

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  /* -------------------------- LOADING ---------------------------- */

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Loading Products...</h1>
      </div>
    );
  }

  /* ---------------------------- ERROR ---------------------------- */

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-red-600 text-xl">Failed to load products.</h1>
      </div>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Drawer
        anchor="left"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <div className="w-75 md:w-88">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Filters</h2>

            <Button
              color="error"
              onClick={() =>
                setFilters({
                  color: "",
                  price: "",
                  discount: "",
                  rating: "",
                  stock: false,
                })
              }
            >
              Clear
            </Button>
          </div>

          <FilterSection filters={filters} setFilters={setFilters} />
        </div>
      </Drawer>

      <div className="bg-gray-50 min-h-screen">
        {/* ===================== HEADER ===================== */}

        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <div className="px-4 md:px-6 lg:px-8 py-4 flex flex-col gap-4">
            {/* Title */}

            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Products
              </h1>

              <span className="text-gray-500 text-sm md:text-base">
                {filteredProducts.length} Products
              </span>
            </div>

            {/* Sort & Filter */}

            <div className="flex justify-between items-center gap-4">
              {/* Mobile Filter */}

              <Button
                className="lg:hidden"
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setOpenFilter(true)}
              >
                Filter
              </Button>

              {/* Desktop Clear */}

              <div className="hidden lg:flex gap-3">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    setFilters({
                      color: "",
                      price: "",
                      discount: "",
                      rating: "",
                      stock: false,
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>

              {/* Sort */}

              <FormControl size="small" className="w-40 md:w-56 lg:w-72">
                <InputLabel>Sort</InputLabel>

                <Select value={sort} label="Sort" onChange={handleChangeSort}>
                  <MenuItem value="price_low">Price : Low to High</MenuItem>

                  <MenuItem value="price_high">Price : High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <Divider />
        </div>

        {/* ===================== BODY ===================== */}

        <section className="flex">
          {/* Sidebar */}

          <aside
            className="
            hidden
            lg:block
            w-[22%]
            xl:w-[20%]
            border-r
            bg-white
            sticky
            top-20
            h-[calc(100vh-80px)]
            overflow-y-auto
            "
          >
            <FilterSection filters={filters} setFilters={setFilters} />
          </aside>

          {/* Products */}

          <main className="flex-1">
            <div
              className="
              grid
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              gap-4
              lg:gap-6
              p-4
              lg:p-6
              "
            >
              {paginatedProducts.length === 0 ? (
                <div className="col-span-full flex justify-center items-center py-24">
                  <h2 className="text-2xl text-gray-500">No Products Found</h2>
                </div>
              ) : (
                paginatedProducts.map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </div>
            {/* ===================== PAGINATION ===================== */}

            {totalPages > 1 && (
              <div className="flex justify-center items-center py-8">
                <Pagination
                  page={page}
                  count={totalPages}
                  color="primary"
                  size="large"
                  onChange={(_, value) => {
                    setPage(value);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                />
              </div>
            )}
          </main>
        </section>

        {/* ===================== FOOTER ===================== */}

        <div className="border-t bg-white mt-10">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">Browse More Products</h2>

              <p className="text-gray-500 text-sm">
                Discover thousands of products from trusted sellers.
              </p>
            </div>

            <Button
              variant="contained"
              onClick={() => {
                setFilters({
                  color: "",
                  price: "",
                  discount: "",
                  rating: "",
                  stock: false,
                });

                setSort("price_low");
                setPage(1);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Products;
