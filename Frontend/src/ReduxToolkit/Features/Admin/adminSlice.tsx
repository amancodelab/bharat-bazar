import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../config/adminApi";

interface initailStateTypes {
  sellers: any[];
  loading: boolean;
  error: string;
  currentSeller: any | null;
}

const initialState: initailStateTypes = {
  sellers: [],
  loading: false,
  error: "",
  currentSeller: null,
};

export const getAllSeller = createAsyncThunk<any, void>(
  "admin/getAllSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/admin/get/all");

      if (!response.data) {
        return rejectWithValue("Failed to get All seller");
      }

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "failed to get Sellers",
      );
    }
  },
);

export const getSellerWithStatus = createAsyncThunk<any, string>(
  "admin/getSellerWithStatus",
  async (status, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/admin/get/all");

      if (!response.data) {
        return rejectWithValue("Failed to get all sellers");
      }

      const filterSeller = response.data.data.filter(
        (seller: any) => seller.accountStatus === status,
      );

      console.log("Account status sellers:", filterSeller);

      return filterSeller;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get sellers",
      );
    }
  },
);

export const updateSellerAccountStatus = createAsyncThunk<any, any>(
  "admin/UpdateSellerAccountStatus",
  async ({ id, accountStatus }, { rejectWithValue }) => {
    try {
      const response = await adminApi.put(
        `/admin/update/seller/${id}/accountStatus/${accountStatus}`,
      );

      if (!response.data) {
        return rejectWithValue("Failed to update seller account status");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to update seller account status",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // Fetch all Seller
      .addCase(getAllSeller.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getAllSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.sellers = action.payload.data;
      })

      .addCase(getAllSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // get Seller  with Account status
      .addCase(getSellerWithStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getSellerWithStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.sellers = action.payload;
      })

      .addCase(getSellerWithStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // update seller Account Status
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        const updatedSeller = action.payload.data;

        state.currentSeller = updatedSeller;

        state.sellers = state.sellers.map((seller) =>
          seller._id === updatedSeller._id ? updatedSeller : seller,
        );
      })

      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
