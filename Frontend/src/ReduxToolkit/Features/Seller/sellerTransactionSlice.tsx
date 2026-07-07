import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sellerApi } from "../../../config/sellerApi";

interface initailStateTypes {
  loading: boolean;
  error: string;
  transactions: any[];
}

const initialState: initailStateTypes = {
  loading: false,
  error: "",
  transactions: [],
};

export const getSellerTransactions = createAsyncThunk<any, string>(
  "sellers/getSellerTransactions",
  async (sellerId, { rejectWithValue }) => {
    try {
      const seller_jwt = localStorage.getItem("seller_jwt");

      if (!seller_jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await sellerApi.get(`/transaction/seller/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${seller_jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to get seller Transaction");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get seller Transaction",
      );
    }
  },
);

const getSellerTransactionsSlice = createSlice({
  name: "getSellerTransactions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // Fetch Seller profile
      .addCase(getSellerTransactions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getSellerTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.transactions = action.payload.data;
      })

      .addCase(getSellerTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getSellerTransactionsSlice.reducer;
