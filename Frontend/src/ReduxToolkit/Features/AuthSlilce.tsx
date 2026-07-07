import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

interface AuthState {
  seller_jwt: string | null;
  isSeller: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  isSellerAuthenticated: boolean;
  sellerId: string;
}

export interface LoginOtpRequest {
  email: string;
}

export interface SignupRequest {
  sellerName: string;
  email: string;
  password: string;
  mobile: string;
  GSTIN?: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export const initialState: AuthState = {
  seller_jwt: localStorage.getItem("seller_jwt"),
  isSeller: false,
  sellerId: "",
  loading: false,
  error: null,
  otpSent: false,
  isSellerAuthenticated: !!localStorage.getItem("seller_jwt"),
};

//
// SEND LOGIN OTP
//
export const sendLoginOtp = createAsyncThunk(
  "auth/sendLoginOtp",
  async ({ email }: LoginOtpRequest, { rejectWithValue }) => {
    try {
      const res = await api.post("/seller/login", {
        email,
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send login OTP",
      );
    }
  },
);

//
// SEND SIGNUP OTP
//
export const sendSignUpOtp = createAsyncThunk(
  "auth/sendSignUpOtp",
  async (signupRequest: SignupRequest, { rejectWithValue }) => {
    try {
      const res = await api.post("/seller/register", signupRequest);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send signup OTP",
      );
    }
  },
);

//
// VERIFY LOGIN OTP
//
export const verifyLoginOtp = createAsyncThunk<any, any>(
  "auth/verifyLoginOtp",
  async (request, { rejectWithValue }) => {
    try {
      console.log("1. Before API");

      const res = await api.post("/seller/login/verify", request);

      console.log("2. After API");
      console.log(res);

      return res.data;
    } catch (error: any) {
      console.log("3. API Error");
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);
//
// VERIFY SIGNUP OTP
//
export const verifySignupOtp = createAsyncThunk(
  "auth/verifySignupOtp",
  async (request: VerifyOtpRequest, { rejectWithValue }) => {
    try {
      const res = await api.post("/seller/register/verify", request);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

// Logout the seller

export const logoutSeller = createAsyncThunk<any, void>(
  "auth/logoutSeller",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/seller/logout",
        {},
        {
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.seller_jwt = null;
      state.isSeller = false;
      state.isSellerAuthenticated = false;

      localStorage.removeItem("seller_jwt");
      localStorage.removeItem("sellerId");
    },
  },

  extraReducers: (builder) => {
    builder

      // SEND LOGIN OTP
      .addCase(sendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // SEND SIGNUP OTP
      .addCase(sendSignUpOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendSignUpOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendSignUpOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // VERIFY LOGIN OTP
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isSellerAuthenticated = true;

        state.seller_jwt = action.payload.data;
        state.sellerId = action.payload.id;
        state.isSeller = true;

        localStorage.setItem("seller_jwt", action.payload.data);
        localStorage.setItem("sellerId", action.payload.id);
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isSellerAuthenticated = false;
      })

      // VERIFY SIGNUP OTP
      .addCase(verifySignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySignupOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isSellerAuthenticated = true;

        state.isSeller = true;
        state.sellerId = action.payload.id;

        localStorage.setItem("sellerId", action.payload.id);
      })
      .addCase(verifySignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isSellerAuthenticated = false;
      })
      .addCase(logoutSeller.fulfilled, (state) => {
        state.loading = false;
        state.seller_jwt = null;
        state.sellerId = "";
        state.isSeller = false;
        state.isSellerAuthenticated = false;

        localStorage.removeItem("seller_jwt");
        localStorage.removeItem("sellerId");
      })

      .addCase(logoutSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
