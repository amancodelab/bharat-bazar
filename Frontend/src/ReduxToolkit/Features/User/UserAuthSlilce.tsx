import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

export interface initialStateTypes {
  _id: string | null;
  jwt: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  isAuthenticated: boolean;
}

const initialState: initialStateTypes = {
  _id: localStorage.getItem("userId"),
  jwt: localStorage.getItem("jwt"),
  role: null,
  loading: false,
  error: null,
  otpSent: false,
  isAuthenticated: !!localStorage.getItem("jwt"),
};

export interface OtpVerify {
  email: string;
  otp: string | number;
  method: "login" | "register";
}

const sendLoginOtp = createAsyncThunk<any, { email: string }>(
  "/user/login",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { email });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.msg || "Failed to send OTP");
    }
  },
);

const sendSignUpOtp = createAsyncThunk<any, any>(
  "/user/register",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", signupRequest);

      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.msg || "Failed to send OTP");
    }
  },
);

const verifyLoginOtp = createAsyncThunk<any, OtpVerify>(
  "/user/login-verify",
  async (requestedData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login/verify", requestedData, {
        withCredentials: true,
      });

      console.log("Rewsponse of auth:", response.data);
      return response.data; // JWT string
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to Verify OTP",
      );
    }
  },
);

const verifySignupOtp = createAsyncThunk<any, OtpVerify>(
  "/user/register-verify",
  async (requestedData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register/verify", requestedData);
      console.log("Rewsponse of auth:", response.data);
      return response.data; // JWT string
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to Verify OTP",
      );
    }
  },
);

const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.role = null;
      state.otpSent = false;
      state.isAuthenticated = false;
      state._id = null;

      localStorage.removeItem("jwt");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder

      // Send Signup OTP
      .addCase(sendSignUpOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendSignUpOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state._id = action.payload.id;
      })
      .addCase(sendSignUpOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Send Login OTP
      .addCase(sendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state._id = action.payload.id;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Verify Login OTP
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.jwt = action.payload.data;
        state._id = action.payload.id;

        localStorage.setItem("jwt", action.payload.data);
        localStorage.setItem("userId", action.payload.id);
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.jwt = null;
        state.error = action.payload as string;
      })

      // Verify Signup OTP
      .addCase(verifySignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySignupOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.jwt = action.payload.data;
        state._id = action.payload.id;

        localStorage.setItem("jwt", action.payload.data);
        localStorage.setItem("userId", action.payload.id);
      })
      .addCase(verifySignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.jwt = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userAuth.actions;
export { sendLoginOtp, sendSignUpOtp, verifyLoginOtp, verifySignupOtp };

export default userAuth.reducer;
