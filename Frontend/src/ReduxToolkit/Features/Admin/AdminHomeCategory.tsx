import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../config/adminApi";

interface initialStateTypes {
  categories: any[];
  loading: boolean;
  error: string;
  category: any;
}

const initialState: initialStateTypes = {
  categories: [],
  loading: false,
  error: "",
  category: null,
};
// update the Home Category
export const updateHomeCategory = createAsyncThunk<any, any>(
  "home-category/updateHomeCategory",
  async ({ homeCategoryId, data }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");
      if (!jwt) {
        return rejectWithValue("First Register or login as Admin");
      }

      const response = await adminApi.put(
        `/home-category/update/${homeCategoryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      if (!response.data) {
        return rejectWithValue("Failed to Home Category Update");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg ||
          "Failed to update the Home Category Update",
      );
    }
  },
);

export const fetchHomeCategory = createAsyncThunk<any, any>(
  "home-category/fetchHomeCategory",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");
      if (!jwt) {
        return rejectWithValue("First Register or login as Admin");
      }
      const response = await adminApi.get(`/home-category/all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to get Home Category ");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get the Home Category ",
      );
    }
  },
);

const adminHomeCategorySlice = createSlice({
  name: "adminHomeCategory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.categories = action.payload.data;
      })

      .addCase(fetchHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
        state.error = action.payload as string;
      })

      // update the category

      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        const updatedCategory = action.payload.data;
        state.category = updatedCategory;

        state.categories.map((currentCategory) => {
          currentCategory._id === updatedCategory._id
            ? updateHomeCategory
            : currentCategory;
        });
      })

      .addCase(updateHomeCategory.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = ""),
          (state.error = action.payload as string));
      });
  },
});

export default adminHomeCategorySlice.reducer;
