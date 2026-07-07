import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sellerApi } from "../../../config/sellerApi";

interface SellerReportState {
  loading: boolean;
  error: string;
  report: any | null;
}

const initialState: SellerReportState = {
  loading: false,
  error: "",
  report: null,
};

// Get Seller Report
export const getSellerReport = createAsyncThunk<any, void>(
  "sellerReport/getSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      if (!jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await sellerApi.get("/seller-report", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch seller report",
      );
    }
  },
);

// Update Seller Report
export const updateSellerReport = createAsyncThunk<any, any>(
  "sellerReport/updateSellerReport",
  async ({ sellerReportId, updateData }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      if (!jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await sellerApi.put(
        `/seller-report/sellerReport/${sellerReportId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to update seller report",
      );
    }
  },
);

const sellerReportSlice = createSlice({
  name: "sellerReport",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET REPORT
      .addCase(getSellerReport.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.data;
      })

      .addCase(getSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE REPORT
      .addCase(updateSellerReport.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updateSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.data;
      })

      .addCase(updateSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerReportSlice.reducer;
