import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductListAPI } from "./productListAPI";

const initialState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "product-list/productListAPI",
  async (amount) => {
    const response = await fetchProductListAPI(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productListSlice = createSlice({
  name: "productList",
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

export const { increment } = productListSlice.actions;

export const selectCount = (state) => state.product.value;

export default productListSlice.reducer;
