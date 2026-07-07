import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  grids: [] as any[],
  grid: null as any,
  loading: false,
  error: "",
};

// Fetch All Grid
export const fetchGrids = createAsyncThunk(
  "grid/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/grid");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Fetch Grid By Id
export const fetchGridById = createAsyncThunk(
  "grid/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/grid/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Create Grid
export const createGrid = createAsyncThunk(
  "grid/create",
  async (request: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/grid/add", request);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Update Grid
export const updateGrid = createAsyncThunk(
  "grid/update",
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
      const response = await api.put(`/grid/update/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

// Delete Grid
export const deleteGrid = createAsyncThunk(
  "grid/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/grid/delete/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  },
);

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder

      // Fetch All
      .addCase(fetchGrids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrids.fulfilled, (state, action) => {
        state.loading = false;
        state.grids = action.payload;
      })
      .addCase(fetchGrids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch By Id
      .addCase(fetchGridById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGridById.fulfilled, (state, action) => {
        state.loading = false;
        state.grid = action.payload;
      })
      .addCase(fetchGridById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createGrid.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGrid.fulfilled, (state, action) => {
        state.loading = false;
        state.grids.push(action.payload);
      })
      .addCase(createGrid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateGrid.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGrid.fulfilled, (state, action) => {
        state.loading = false;
        state.grids = state.grids.map((item: any) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(updateGrid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteGrid.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGrid.fulfilled, (state, action) => {
        state.loading = false;
        state.grids = state.grids.filter(
          (item: any) => item._id !== action.payload,
        );
      })
      .addCase(deleteGrid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gridSlice.reducer;
