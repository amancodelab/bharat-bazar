import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface InitialStateTypes {
  role: string | null;
  loading: boolean;
  error: string | null;
  userdata: any | null;
  profile: any | null;
}

const initialState: InitialStateTypes = {
  role: null,
  loading: false,
  error: null,
  userdata: null,
  profile: null,
};

export const GetuserData = createAsyncThunk<any, void>(
  "/get/userData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();

      const id = state.userAuth?._id;
      const jwt = localStorage.getItem("jwt");

      if (!jwt || !id) {
        return rejectWithValue("Missing JWT or User ID");
      }

      const response = await api.get(`/user/get/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to get user data");
      }

      console.log("Response from GetUserData:", response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get user data",
      );
    }
  },
);

export const GetUserProfile = createAsyncThunk<any, void>(
  "/get/userProfile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("Missing JWT");
      }

      const response = await api.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to get user profile");
      }

      console.log("Response from GetProfile:", response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to get user profile",
      );
    }
  },
);

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get User Data
      .addCase(GetuserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetuserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userdata = action.payload.data;
      })

      .addCase(GetuserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get User Profile
      .addCase(GetUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.profile = action.payload.data;
      })

      .addCase(GetUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userDataSlice.reducer;
