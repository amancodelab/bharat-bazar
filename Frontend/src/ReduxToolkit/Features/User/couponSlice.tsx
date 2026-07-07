import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface initialValues {
  coupons: any | null;
  cart: any | null;
  loading: boolean;
  error: string | null;
  couponCreated: boolean;
  couponApplied: boolean;
}

const initialState: initialValues = {
  coupons: null,
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
};

export const applyCoupon = createAsyncThunk<any, any>(
  "coupon/applyCoupon",
  async ({ code, orderAmount, jwt }, { rejectWithValue }) => {
    try {
      const jwtToken = jwt || localStorage.getItem("jwt");

      const response = await api.post(
        "/coupon/apply",
        {
          code,
          orderAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.coupons = action.payload.data.coupon;
        state.loading = false;
        state.cart = action.payload.data.cart;
        state.couponApplied = true;
      })

      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.couponApplied = false;
      })

      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default couponSlice.reducer;
