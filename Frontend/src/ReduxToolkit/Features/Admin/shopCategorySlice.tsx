import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  shopCategories: [] as any[],
  shopCategory: null as any,
  loading: false,
  error: "",
};

// Fetch All
export const fetchShopCategories = createAsyncThunk(
  "shopCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/shop-category");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Fetch By Id
export const fetchShopCategoryById = createAsyncThunk(
  "shopCategory/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shop-category/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Create
export const createShopCategory = createAsyncThunk(
  "shopCategory/create",
  async (request: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/shop-category/add", request);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Update
export const updateShopCategory = createAsyncThunk(
  "shopCategory/update",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/shop-category/update/${id}`, data);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Delete
export const deleteShopCategory = createAsyncThunk(
  "shopCategory/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/shop-category/delete/${id}`);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

const shopCategorySlice = createSlice({
  name: "shopCategory",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch All
      .addCase(fetchShopCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShopCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.shopCategories = action.payload;
      })
      .addCase(fetchShopCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By Id
      .addCase(fetchShopCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShopCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.shopCategory = action.payload;
      })
      .addCase(fetchShopCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createShopCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShopCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.shopCategories.push(action.payload);
      })
      .addCase(createShopCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateShopCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateShopCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.shopCategories = state.shopCategories.map((item: any) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(updateShopCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteShopCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShopCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.shopCategories = state.shopCategories.filter(
          (item: any) => item._id !== action.payload,
        );
      })
      .addCase(deleteShopCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default shopCategorySlice.reducer;
