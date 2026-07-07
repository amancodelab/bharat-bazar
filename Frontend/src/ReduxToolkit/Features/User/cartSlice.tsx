import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface initialStateTypes {
  cart: null | any;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateTypes = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk<any, any>(
  "/cart/fetchCart",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("please login or registerd first");
      }
      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.msg || "Something went wrong",
      );
    }
  },
);

export const addCart = createAsyncThunk<any, any>(
  "/cart/addCart",
  async ({ jwt, productId, quantity, size }, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("No access Token is found");
      }
      const response = await api.post(
        "/cart/add",
        {
          productId,
          quantity,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.msg || "Something went wrong",
      );
    }
  },
);

export const deletedCartItem = createAsyncThunk<any, any>(
  "/cart/deletedCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("No access Token is found");
      }
      const response = await api.delete(
        `/cart/delete/${cartItemId}`,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.msg || "Something went wrong",
      );
    }
  },
);

export const updatedCartItem = createAsyncThunk<any, any>(
  "/cart/updatedCartItem",
  async ({ jwt, cartItemId, updateData }, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("No access Token is found");
      }

      const response = await api.put(`/cart/update/${cartItemId}`, updateData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Something went wrong",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        state.loading = false;
        state.error = null;
      })

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        state.error = null;
        state.loading = false;
      })

      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deletedCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        state.error = null;
        state.loading = false;
      })

      .addCase(deletedCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deletedCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updatedCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.data;
        state.loading = false;
        state.error = null;
      })

      .addCase(updatedCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatedCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
