import React, { useEffect } from "react";
import { Link, Navigate, useParams, useLocation } from "react-router-dom";
import {
  selectCart,
  deleteItemFromCartAsync,
  resetCartItems,
} from "../features/cart/cartSlice";
import { resetOrderIsRedirect } from "../features/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    cartItems.forEach((item) => {
      if (item && item.id) dispatch(deleteItemFromCartAsync(item.id));
    });
    dispatch(resetCartItems());
    dispatch(resetOrderIsRedirect());
  }, [location.pathname === `/order-placed/${id}`]);
  return (
    <>
      {!id && <Navigate to={"/"} replace />}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Order Number #{id}
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            You can check your order in My Account {">"} My Account
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}