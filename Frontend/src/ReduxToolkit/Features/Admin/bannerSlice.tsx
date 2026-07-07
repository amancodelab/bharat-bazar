import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminApi } from "../../../config/adminApi";
import api from "../../../config/api";

interface initailStateTypes {
  banners: any[];
  loading: boolean;
  error: string;
  currentBanner: any | null;
}

const initialState: initailStateTypes = {
  banners: [],
  loading: false,
  error: "",
  currentBanner: null,
};

export const createBanner = createAsyncThunk<any, any>(
  "banner/createBanner",
  async (bannerData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/banner/add", bannerData);

      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchBannerById = createAsyncThunk<any, any>(
  "banner/fetchBannerById",
  async (bannerId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/banner/${bannerId}`);

      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateBannerById = createAsyncThunk<any, any>(
  "banner/updateBannerById",
  async ({ bannerId, bannerData }, { rejectWithValue }) => {
    try {
      const response = await adminApi.put(
        `/banner/update/${bannerId}`,
        bannerData,
      );

      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteBannerById = createAsyncThunk<any, any>(
  "banner/deleteBannerById",
  async (bannerId, { rejectWithValue }) => {
    try {
      const response = await adminApi.delete(`/banner/delete/${bannerId}`);

      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

// fetch all Banner
export const fetchBannerAll = createAsyncThunk<any, void>(
  "banner/fetchBannerAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(`/banner/all`);

      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBanner = action.payload.data;
        state.banners.push(state.currentBanner);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchBannerById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBannerById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBanner = action.payload.data;
      })
      .addCase(fetchBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateBannerById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateBannerById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBanner = action.payload.data;
        state.currentBanner = updatedBanner;

        const index = state.banners.findIndex(
          (currentBanner) => currentBanner._id === updatedBanner._id,
        );

        if (index !== -1) {
          state.banners[index] = updatedBanner;
        }
      })
      .addCase(updateBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteBannerById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteBannerById.fulfilled, (state, action) => {
        state.loading = false;
        const deletedBanner = action.payload.data;
        state.currentBanner = deletedBanner;
        state.banners = state.banners.filter(
          (banner) => banner._id !== deletedBanner._id,
        );
      })
      .addCase(deleteBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchBannerAll.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBannerAll.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })
      .addCase(fetchBannerAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
