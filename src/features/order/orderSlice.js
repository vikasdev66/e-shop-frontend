import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchOrders } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  isRedirect: false,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchOrdersAsync = createAsyncThunk(
  "order/fetchOrders",
  async (userId) => {
    const response = await fetchOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderIsRedirect: (state) => {
      state.isRedirect = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload;
        state.isRedirect = true;
      })
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      });
  },
});

export const { resetOrderIsRedirect } = orderSlice.actions;

export const selectOrders = (state) => state.order;

export default orderSlice.reducer;
