import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../config/adminApi";

interface AdminAuthState {
  loading: boolean;
  error: string;
  admin: any | null;
  accessToken: string;
}

const initialState: AdminAuthState = {
  loading: false,
  error: "",
  admin: null,
  accessToken: "",
};

// Register Admin
export const registerAdmin = createAsyncThunk<any, any>(
  "adminAuth/registerAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/admin/register", adminData);

      if (!response.data.status) {
        return rejectWithValue(response.data.msg);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to register admin",
      );
    }
  },
);

// Login Admin
export const adminLogin = createAsyncThunk<any, any>(
  "adminAuth/adminLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/admin/login", loginData);

      if (!response.data.status) {
        return rejectWithValue(response.data.msg);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Failed to login");
    }
  },
);

// Verify OTP
export const verifyAdminOtp = createAsyncThunk<any, any>(
  "adminAuth/verifyAdminOtp",
  async ({ email, otp, method }, { rejectWithValue }) => {
    try {
      const response = await adminApi.post(`/admin/auth/verify/${method}`, {
        email,
        otp,
      });

      if (!response.data.status) {
        return rejectWithValue(response.data.msg);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "OTP Verification Failed",
      );
    }
  },
);

export const fetchAdminProfile = createAsyncThunk(
  "adminAuth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");
      if (!jwt) {
        return rejectWithValue("No admin token");
      }

      const response = await adminApi.get("/admin/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch profile",
      );
    }
  },
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.admin = null;
      state.accessToken = "";
      state.loading = false;
      state.error = "";

      localStorage.removeItem("admin_jwt");
      localStorage.removeItem("adminId");
    },
  },
  extraReducers(builder) {
    builder

      // Register
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(adminLogin.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Verify OTP
      .addCase(verifyAdminOtp.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(verifyAdminOtp.fulfilled, (state, action) => {
        state.loading = false;

        state.admin = action.payload.data;

        state.accessToken = action.payload.data.accessToken;

        localStorage.setItem("admin_jwt", action.payload.data.accessToken);
        localStorage.setItem("adminId", state.admin._id);
      })

      .addCase(verifyAdminOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })

      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
