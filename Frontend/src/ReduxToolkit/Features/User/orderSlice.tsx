import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface initialStateTypes {
  orders: [];
  loading: boolean;
  error: string;
  orderItems: null | [];
  currentOrder: null | any;
  orderItem: null | any;
}

const initialState: initialStateTypes = {
  orders: [],
  loading: false,
  error: "",
  orderItems: null,
  currentOrder: null,
  orderItem: null,
};

export const fetchOrdersHistory = createAsyncThunk<any, any>(
  "/orders/fetchOrdersHistory",
  async ({ jwt, userId }, { rejectWithValue }) => {
    try {
      if (!userId || !jwt) {
        return rejectWithValue("Missing the Jwt or UserId");
      }
      const response = await api.get(`/order/user/${userId}`, {
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

export const fetchOrderById = createAsyncThunk<any, any>(
  "/orders/fetchOrderById",
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      if (!orderId || !jwt) {
        return rejectWithValue("Missing the Jwt or OrderId");
      }

      const response = await api.get(`/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);
// create order

export const createOrder = createAsyncThunk<any, any>(
  "/orders/create",
  async ({ shippingAddress, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      if (!shippingAddress || !jwt || !paymentGateway) {
        return rejectWithValue(
          "Missing the Jwt or shipping Address or Payment gateway",
        );
      }
      const response = await api.post(
        `/order/add`,
        {
          shippingAddress,
          paymentGateway,
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

export const fetchOrderItemById = createAsyncThunk<any, any>(
  "/orders/fetchOrderItem",
  async ({ jwt, OrderItemId }, { rejectWithValue }) => {
    try {
      if (!OrderItemId || !jwt) {
        return rejectWithValue("Missing the Jwt or orderItemId");
      }
      const response = await api.get(`/order/orderItem/${OrderItemId}`, {
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

// handle success payment

export const paymentSuccess = createAsyncThunk<any, any>(
  "/orders/payments",
  async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
    try {
      if (!paymentLinkId || !jwt || !paymentId) {
        return rejectWithValue("Missing the Jwt or PaymentId or PaymentLinkId");
      }
      const response = await api.get(`/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: { paymentLinkId },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

// handle Cancel Order

export const cancelOrder = createAsyncThunk<any, any>(
  "/orders/cancelOrder",
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      if (!orderId || !jwt) {
        return rejectWithValue("Missing the Jwt or orderId");
      }
      const response = await api.put(
        `/order/cancel/${orderId}`,
        {},
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

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrdersHistory.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.loading = false;
      })

      .addCase(fetchOrdersHistory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchOrdersHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data;
        state.orderItems = action.payload.data;
        state.loading = false;
      })

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data;
        state.loading = false;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.orderItem = action.payload.data;
        state.loading = false;
      })

      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data;
        state.loading = false;
      })

      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload.data;
        state.loading = false;
      })

      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
