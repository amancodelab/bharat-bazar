import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  electronics: [] as any[],
  electronic: null as any,
  loading: false,
  error: "",
};

// Fetch All Electronics
export const fetchElectronics = createAsyncThunk(
  "electronic/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/electronic");

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Fetch Single Electronic
export const fetchElectronicById = createAsyncThunk(
  "electronic/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/electronic/${id}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Create Electronic
export const createElectronic = createAsyncThunk(
  "electronic/create",
  async (request: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/electronic/add", request);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Update Electronic
export const updateElectronic = createAsyncThunk(
  "electronic/update",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/electronic/update/${id}`, data);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Delete Electronic
export const deleteElectronic = createAsyncThunk(
  "electronic/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/electronic/delete/${id}`);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

const electronicSlice = createSlice({
  name: "electronic",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch All
      .addCase(fetchElectronics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchElectronics.fulfilled, (state, action) => {
        state.loading = false;
        state.electronics = action.payload;
      })
      .addCase(fetchElectronics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single
      .addCase(fetchElectronicById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchElectronicById.fulfilled, (state, action) => {
        state.loading = false;
        state.electronic = action.payload;
      })
      .addCase(fetchElectronicById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createElectronic.pending, (state) => {
        state.loading = true;
      })
      .addCase(createElectronic.fulfilled, (state, action) => {
        state.loading = false;
        state.electronics.push(action.payload);
      })
      .addCase(createElectronic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateElectronic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateElectronic.fulfilled, (state, action) => {
        state.loading = false;
        state.electronics = state.electronics.map((item: any) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(updateElectronic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteElectronic.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteElectronic.fulfilled, (state, action) => {
        state.loading = false;
        state.electronics = state.electronics.filter(
          (item: any) => item._id !== action.payload,
        );
      })
      .addCase(deleteElectronic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default electronicSlice.reducer;
