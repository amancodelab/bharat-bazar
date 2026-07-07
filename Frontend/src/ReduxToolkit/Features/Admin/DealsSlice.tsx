import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import adminApi from "../../../config/adminApi";

interface initailStateTypes {
  deals: any[];
  loading: boolean;
  error: string;
  deal: any | null;
}

const initialState: initailStateTypes = {
  deals: [],
  loading: false,
  error: "",
  deal: null,
};

export const createDeal = createAsyncThunk<any, any>(
  "deal/createDeal",
  async (data, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");

      const response = await adminApi.post(`/deal/add`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to create the deal");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to create the Deal ",
      );
    }
  },
);

export const fetchDealById = createAsyncThunk<any, string>(
  "deal/fetchDealById",
  async (dealId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");

      const response = await api.get(`/deal/${dealId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch deal",
      );
    }
  },
);

export const fetchAllDeals = createAsyncThunk<any, void>(
  "deal/fetchAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");

      const response = await adminApi.get(`/deal/all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to to fetch all deals");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "ailed to to fetch all deals",
      );
    }
  },
);

export const updateDeals = createAsyncThunk<any, any>(
  "deal/updateDeals",
  async ({ dealId, dealData }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");

      const response = await adminApi.put(`/deal/update/${dealId}`, dealData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to Update the Deals");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to Update the Deals",
      );
    }
  },
);

// delete the Deals

export const deleteDeals = createAsyncThunk<any, any>(
  "deal/deleteDeals",
  async (dealId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("admin_jwt");

      const response = await adminApi.delete(`/deal/delete/${dealId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data) {
        return rejectWithValue("Failed to Delete the Deals");
      }

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.msg || "Failed to Delete the Deals",
      );
    }
  },
);

const DealsSlice = createSlice({
  name: "DealsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get all deals
      .addCase(fetchAllDeals.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.deals = action.payload.data;
      })

      .addCase(fetchAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // update  the Deals

      .addCase(updateDeals.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(updateDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        const updatedDeal = action.payload.data;

        state.deal = updatedDeal;

        const index = state.deals.findIndex(
          (currentDeal) => currentDeal._id === updatedDeal._id,
        );

        if (index !== -1) {
          state.deals[index] = updatedDeal;
        }
      })

      .addCase(updateDeals.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload as string));
      })

      // create Deals
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        const newDeal = action.payload.data;
        state.deal = newDeal;
        state.deals.push(newDeal);
      })

      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete Deals

      .addCase(deleteDeals.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(deleteDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.deal = action.payload.data;

        state.deals = state.deals.filter(
          (currentDeal) => currentDeal._id !== action.meta.arg,
        );
      })

      .addCase(deleteDeals.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload as string));
      })

      .addCase(fetchDealById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDealById.fulfilled, (state, action) => {
        state.loading = false;
        state.deal = action.payload.data;
      })

      .addCase(fetchDealById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default DealsSlice.reducer;
