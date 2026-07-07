import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface initialStateTypes {
  homeCategories: null | any;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateTypes = {
  homeCategories: [],
  loading: false,
  error: null,
};

export const fetchHompage = createAsyncThunk<any, void>(
  "home/fetchHompage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

export const createHomeCategories = createAsyncThunk<any, any>(
  "home/createHomeCategories",
  async (homeCategory, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategory);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

const homeCategorySllice = createSlice({
  name: "HomeCategories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHompage.fulfilled, (state, action) => {
        state.homeCategories = action.payload.data;
        state.loading = false;
      })

      .addCase(fetchHompage.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchHompage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.homeCategories = action.payload.data;

        state.loading = false;
      })

      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeCategorySllice.reducer;
