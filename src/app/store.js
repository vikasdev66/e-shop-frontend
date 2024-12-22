import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
