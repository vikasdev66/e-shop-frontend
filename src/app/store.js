import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "../features/product-list/productSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});

export default store;
