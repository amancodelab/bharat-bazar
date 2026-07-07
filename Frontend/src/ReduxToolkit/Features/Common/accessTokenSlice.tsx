import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import UserRole from "../../../Common/Data/UserRole";

interface initialStateType {
  loading: boolean;
  error: string;
  accessToken: string | any;
  accessToken_seller: string;
  accessToken_admin: string;
}

const initialState: initialStateType = {
  loading: false,
  error: "",
  accessToken: "",
  accessToken_seller: "",
  accessToken_admin: "",
};
export const createAccessTokenforUser = createAsyncThunk<any, void>(
  "token/accessTokenForUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/auth/access-token/${UserRole.CUSTOMER}`,
      );
      return response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

export const createAccessTokenforSeller = createAsyncThunk<any, void>(
  "token/accessTokenForSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/access-token/${UserRole.SELLER}`);
      return response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

export const createAccessTokenforAdmin = createAsyncThunk<any, void>(
  "token/accessTokenForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/access-token/${UserRole.ADMIN}`);
      return response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAccessTokenforUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createAccessTokenforUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.data.data;
        localStorage.setItem("jwt", action.payload.data.data);
      })

      .addCase(createAccessTokenforUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // for seller accesstoken

    builder
      .addCase(createAccessTokenforSeller.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createAccessTokenforSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken_seller = action.payload.data.data;
        localStorage.setItem("seller_jwt", action.payload.data.data);
      })

      .addCase(createAccessTokenforSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // for the admin

    builder
      .addCase(createAccessTokenforAdmin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createAccessTokenforAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken_admin = action.payload.data.data;
        localStorage.setItem("admin_jwt", action.payload.data.data);
      })

      .addCase(createAccessTokenforAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default accessTokenSlice.reducer;
