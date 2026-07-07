import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  mainCategories: [],
  loading: false,
  error: "",
};

export const fetchMainCategories = createAsyncThunk(
  "mainCategory/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/maincategories");
      console.log("API Response:", response.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMainCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMainCategories.fulfilled, (state, action) => {
        console.log("Fulfilled Payload:", action.payload);
        state.loading = false;
        state.mainCategories = action.payload;
      })

      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default mainCategorySlice.reducer;
