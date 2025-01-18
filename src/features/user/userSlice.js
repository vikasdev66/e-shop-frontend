import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUser,
  updateUser,
  createAddress,
  fetchAddressByUserId,
  updateAddress,
  deleteAddress,
} from "./userAPI";

const initialState = {
  userInfo: null,
  addresses: [],
  status: "idle",
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/createUser",
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createAddressAsync = createAsyncThunk(
  "user/createAddress",
  async (item) => {
    const response = await createAddress(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAddressByUserIdAsync = createAsyncThunk(
  "user/fetchAddressByUserId",
  async () => {
    const response = await fetchAddressByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "user/updateAddress",
  async (update) => {
    const response = await updateAddress(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "user/deleteItemFromCart",
  async (addressId) => {
    const response = await deleteAddress(addressId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
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
        if (action.payload) {
          const index = state.addresses.findIndex(
            (address) => address.id === action.payload.id
          );
          state.addresses.splice(index, 1);
        }
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserInfo = (state) => state.user;

export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;
