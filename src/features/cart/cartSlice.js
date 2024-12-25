import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCartAPI } from "./cartAPI";

const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "product-list/cartAPI",
  async (amount) => {
    const response = await fetchCartAPI(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCart = (state) => state.product.value;

export default cartSlice.reducer;
