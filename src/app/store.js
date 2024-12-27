import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/checkout/checkoutSlice";
import orderReducer from "../features/order/orderSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});

export default store;
