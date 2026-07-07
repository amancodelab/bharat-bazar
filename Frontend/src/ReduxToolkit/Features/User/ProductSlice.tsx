import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

export interface Product {
  _id: string;
  title: string;
  description: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  images: string[];
  category: string;
  seller: string;
  size: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  product: Product | null;
  products: Product[];
  similarProducts: Product[];
  searchProduct: Product[];

  loading: boolean;
  similarLoading: boolean;

  error: string;
}

const initialState: ProductState = {
  product: null,
  products: [],
  similarProducts: [],
  searchProduct: [],

  loading: false,
  similarLoading: false,

  error: "",
};

// Fetch Single Product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/product/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Search Products
export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/product/search", {
        params: { query },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Get All Products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/product/all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getSimilarProducts = createAsyncThunk(
  "products/getSimilarProducts",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/product/similar/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // =================== Get All Products ===================
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.content;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // =================== Search Products ===================
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProduct = action.payload.data;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // =================== Fetch Product By Id ===================
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getSimilarProducts.pending, (state) => {
        state.similarLoading = true;
      })

      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.similarLoading = false;
        state.similarProducts = action.payload.data;
      })

      .addCase(getSimilarProducts.rejected, (state, action) => {
        state.similarLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default ProductSlice.reducer;
