import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchAllProductsCategories,
  fetchAllProductsBrands,
} from "./productAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductsBrandsAsync = createAsyncThunk(
  "product/fetchAllProductsBrands",
  async () => {
    const response = await fetchAllProductsBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductsCategoriesAsync = createAsyncThunk(
  "product/fetchAllProductsCategories",
  async () => {
    const response = await fetchAllProductsCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllProductsBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllProductsCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllProductsBrands = (state) => state.product.brands;
export const selectAllProductsCategories = (state) => state.product.categories;

export default productSlice.reducer;
