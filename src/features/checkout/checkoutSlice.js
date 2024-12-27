import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAddress,
  fetchAddressByUserId,
  updateAddress,
  deleteAddress,
} from "./checkoutAPI";

const initialState = {
  addresses: [],
  status: "idle",
};

export const createAddressAsync = createAsyncThunk(
  "cart/createAddress",
  async (item) => {
    const response = await createAddress(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAddressByUserIdAsync = createAsyncThunk(
  "cart/fetchAddressByUserId",
  async (userId) => {
    const response = await fetchAddressByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "cart/updateAddress",
  async (update) => {
    const response = await updateAddress(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (addressId) => {
    const response = await deleteAddress(addressId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addresses.push(action.payload);
      })
      .addCase(fetchAddressByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addresses = action.payload ? action.payload : state.addresses;
      })
      .addCase(updateAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.addresses.findIndex(
          (address) => address.id === action.payload.id
        );
        state.addresses[index] = action.payload && action.payload;
      })
      .addCase(deleteAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.addresses.findIndex(
          (address) => address.id === action.payload.id
        );
        state.addresses.splice(index, 1);
      });
  },
});

export const { increment } = addressSlice.actions;

export const selectAddresses = (state) => state.address.addresses;

export default addressSlice.reducer;
