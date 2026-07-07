import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface InitialState {
  categories: any[];
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  categories: [],
  loading: false,
  error: "",
};

export const createHomeCategory = createAsyncThunk(
  "home/create",
  async (request: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/home-category/add", request);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "home/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home-category/categories");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

const slice = createSlice({
  name: "adminHomeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Home Category
      .addCase(createHomeCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
      })

      .addCase(createHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default slice.reducer;
