import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "../features/product-list/productListSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});

export default store;
