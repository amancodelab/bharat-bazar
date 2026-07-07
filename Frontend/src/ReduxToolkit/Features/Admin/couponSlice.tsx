import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminApi } from "../../../config/adminApi";
import { api } from "../../../config/api";

/* ===========================
   Interfaces
=========================== */

export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  usageLimit: number;
  usedCount: number;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CouponState {
  coupons: Coupon[];
  coupon: Coupon | null;
  loading: boolean;
  error: string;
}

interface CouponPayload {
  code: string;
  discount: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  usageLimit: number;
  expiryDate: string;
  isActive?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const initialState: CouponState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: "",
};

/* ===========================
   Create Coupon
=========================== */

export const createCoupon = createAsyncThunk<
  ApiResponse<Coupon>,
  CouponPayload,
  { rejectValue: string }
>("coupon/createCoupon", async (data, { rejectWithValue }) => {
  try {
    const response = await adminApi.post("/coupon/add", data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to create coupon",
    );
  }
});

/* ===========================
   Fetch All Coupons
=========================== */

export const fetchAllCoupons = createAsyncThunk<
  ApiResponse<Coupon[]>,
  void,
  { rejectValue: string }
>("coupon/fetchAllCoupons", async (_, { rejectWithValue }) => {
  try {
    const response = await adminApi.get("/coupon/all");
    console.log("Fetch All Response:", response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to fetch coupons",
    );
  }
});

/* ===========================
   Fetch Coupon By ID
=========================== */

export const fetchCouponById = createAsyncThunk<
  ApiResponse<Coupon>,
  string,
  { rejectValue: string }
>("coupon/fetchCouponById", async (couponId, { rejectWithValue }) => {
  try {
    const response = await adminApi.get(`/coupon/${couponId}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to fetch coupon",
    );
  }
});

/* ===========================
   Fetch Coupon By Code
=========================== */

export const fetchCouponByCode = createAsyncThunk<
  ApiResponse<Coupon>,
  string,
  { rejectValue: string }
>("coupon/fetchCouponByCode", async (code, { rejectWithValue }) => {
  try {
    const response = await api.get(`/coupon/code/${code}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to fetch coupon",
    );
  }
});

/* ===========================
   Update Coupon
=========================== */

export const updateCoupons = createAsyncThunk<
  ApiResponse<Coupon>,
  {
    couponId: string;
    data: Partial<CouponPayload>;
  },
  { rejectValue: string }
>("coupon/updateCoupons", async ({ couponId, data }, { rejectWithValue }) => {
  try {
    const response = await adminApi.put(`/coupon/update/${couponId}`, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to update coupon",
    );
  }
});

/* ===========================
   Delete Coupon
=========================== */

export const deleteCoupons = createAsyncThunk<
  ApiResponse<Coupon>,
  string,
  { rejectValue: string }
>("coupon/deleteCoupons", async (couponId, { rejectWithValue }) => {
  try {
    const response = await adminApi.delete(`/coupon/delete/${couponId}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to delete coupon",
    );
  }
});

const couponSlice = createSlice({
  name: "coupon",
  initialState,

  reducers: {
    clearCoupon(state) {
      state.coupon = null;
    },

    clearCouponError(state) {
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===========================
         Create Coupon
      =========================== */

      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.coupon = action.payload.data;

        // newest coupon first
        state.coupons.unshift(action.payload.data);
      })

      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create coupon";
      })

      /* ===========================
         Fetch All Coupons
      =========================== */

      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.coupons = action.payload.data;
      })

      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupons";
      })

      /* ===========================
         Fetch Coupon By Id
      =========================== */

      .addCase(fetchCouponById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchCouponById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.coupon = action.payload.data;
      })

      .addCase(fetchCouponById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupon";
      })

      /* ===========================
         Fetch Coupon By Code
      =========================== */

      .addCase(fetchCouponByCode.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchCouponByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.coupon = action.payload.data;
      })

      .addCase(fetchCouponByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupon";
      })

      /* ===========================
         Update Coupon
      =========================== */

      .addCase(updateCoupons.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updateCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.coupon = action.payload.data;

        const index = state.coupons.findIndex(
          (coupon) => coupon._id === action.payload.data._id,
        );

        if (index !== -1) {
          state.coupons[index] = action.payload.data;
        }
      })

      .addCase(updateCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update coupon";
      })

      /* ===========================
         Delete Coupon
      =========================== */

      .addCase(deleteCoupons.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(deleteCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.meta.arg,
        );

        if (state.coupon?._id === action.meta.arg) {
          state.coupon = null;
        }
      })

      .addCase(deleteCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete coupon";
      });
  },
});

/* ===========================
   Actions
=========================== */

export const { clearCoupon, clearCouponError } = couponSlice.actions;

/* ===========================
   Selectors
=========================== */

export const selectCoupons = (state: any) => state.coupon.coupons;

export const selectCoupon = (state: any) => state.coupon.coupon;

export const selectCouponLoading = (state: any) => state.coupon.loading;

export const selectCouponError = (state: any) => state.coupon.error;

/* ===========================
   Reducer
=========================== */

export default couponSlice.reducer;
