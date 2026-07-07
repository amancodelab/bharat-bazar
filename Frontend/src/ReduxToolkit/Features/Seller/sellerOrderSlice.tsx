import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sellerApi } from "../../../config/sellerApi";

interface initailStateTypes {
  orders: [] | any;
  loading: boolean;
  error: string;
}

const initialState: initailStateTypes = {
  orders: [],
  loading: false,
  error: "",
};

export const fetchSellerOrder = createAsyncThunk<any, any>(
  "sellerOrders/fetchSellerOrder",
  async (jwt, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("Please Login or Register");
      }
      const response = await sellerApi.get("/order/seller", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const updatedOrderStatus = createAsyncThunk<any, any>(
  "sellerOrders/updatedOrderStatus",
  async ({ jwt, orderId, updatedOrderStatus }, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("Please Login or Register");
      }
      const response = await sellerApi.put(
        `/order/seller/${orderId}`,
        {
          status: updatedOrderStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // Fetch Seller Orders
      .addCase(fetchSellerOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchSellerOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.orders = action.payload.data;
      })

      .addCase(fetchSellerOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Order Status
      .addCase(updatedOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updatedOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.orders = state.orders.map((order: any) =>
          order._id === action.payload.data._id ? action.payload.data : order,
        );
      })

      .addCase(updatedOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerOrderSlice.reducer;
