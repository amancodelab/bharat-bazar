import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sellerApi } from "../../../config/sellerApi";

interface initailStateTypes {
  loading: boolean;
  error: string;
  currentSeller: any | null;
  profile: null | any;
  report: null | any;
  profileUpdated: boolean;
}

const initialState: initailStateTypes = {
  loading: false,
  error: "",
  currentSeller: null,
  profile: null,
  report: null,
  profileUpdated: false,
};

export const getSellerProfile = createAsyncThunk<any, void>(
  "sellers/sellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const seller_jwt = localStorage.getItem("seller_jwt");

      if (!seller_jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await sellerApi.get("/seller/profile", {
        headers: {
          Authorization: `Bearer ${seller_jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to get seller profile");
      }

      console.log("Response from getSellerProfile:", response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get seller profile",
      );
    }
  },
);

export const updateSellerProfile = createAsyncThunk<any, FormData>(
  "seller/updateSellerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      if (!jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await sellerApi.put("/seller/update", formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to update seller",
      );
    }
  },
);

export const getSellerReport = createAsyncThunk<any, any>(
  "sellers/getSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const seller_jwt = localStorage.getItem("seller_jwt");

      if (!seller_jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await sellerApi.get("/seller-report", {
        headers: {
          Authorization: `Bearer ${seller_jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to get seller profile");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get Seller Report",
      );
    }
  },
);

export const fetchSellerById = createAsyncThunk<any, any>(
  "sellers/getSellerId",
  async (sellerId, { rejectWithValue }) => {
    try {
      const seller_jwt = localStorage.getItem("seller_jwt");

      if (!seller_jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await sellerApi.get(`/seller/get/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${seller_jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to get seller ");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get Seller Report",
      );
    }
  },
);

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // Fetch Seller profile
      .addCase(getSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.profile = action.payload.data;
      })

      .addCase(getSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // update Seller profile
      .addCase(updateSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.profile = action.payload.data;
        state.profileUpdated = true;
      })

      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // seller report
      .addCase(getSellerReport.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.report = action.payload.data;
      })

      .addCase(getSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // get seller  by Id
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.currentSeller = action.payload.data;
      })

      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerSlice.reducer;
