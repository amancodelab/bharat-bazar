import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sellerApi } from "../../../config/sellerApi";

interface initailStateTypes {
  products: any[];
  loading: boolean;
  error: string;
  product: any | null;
}

const initialState: initailStateTypes = {
  products: [],
  loading: false,
  error: "",
  product: null,
};

export const fetchSellerProducts = createAsyncThunk<any, any>(
  "sellerProducts/fetchSellerProducts",
  async (jwt, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("Please Login or Register");
      }
      const response = await sellerApi.get("/product/seller/products", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const createProduct = createAsyncThunk<any, any>(
  "sellerProducts/createProduct",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("Please Login or Register");
      }
      const response = await sellerApi.post(`/product/create`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const updatedProduct = createAsyncThunk<any, any>(
  "sellerProducts/updatedProduct",
  async ({ jwt, updatedData, productId }, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("Please Login or Register");
      }
      const response = await sellerApi.put(
        `/product/update/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const sellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // Fetch Seller Products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.products = action.payload.data;
      })

      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.product = action.payload.data;
        state.products.push(action.payload.data);
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Product
      .addCase(updatedProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updatedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.product = action.payload.data;

        state.products = state.products.map((product: any) =>
          product._id === action.payload.data._id
            ? action.payload.data
            : product,
        );
      })

      .addCase(updatedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerProductsSlice.reducer;
