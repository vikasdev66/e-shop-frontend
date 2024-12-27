import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  fetchCartItemsByUserIdAsync,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../auth/authSlice";

export default function Cart() {
  const cartItems = useSelector(selectCart);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: Number(e.target.value) }));
  };

  const handleRemove = (item) => {
    dispatch(deleteItemFromCartAsync(item.id));
  };

  useEffect(() => {
    if (user?.data?.id) {
      dispatch(fetchCartItemsByUserIdAsync(user?.data?.id));
    }
  }, [user.data.id, dispatch]);
  return (
    <div className="mx-auto max-w-7xl px-4 mt-12 sm:px-6 lg:px-8 bg-white">
      {/*  <div className="sm:px-20 sm:py-10 p-0 bg-#f2f4f5"> */}
      <div className="mt-8">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems &&
              cartItems.map((item) => {
                if (!item) {
                  return <></>;
                }
                return (
                  <li key={item.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={item.title}
                        src={item.thumbnail}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.title}</a>
                          </h3>
                          <p className="ml-4">
                            $
                            {(
                              item.price *
                              (1 - item.discountPercentage / 100)
                            ).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm/6 font-medium text-gray-900"
                          >
                            Qty
                          </label>

                          <select
                            value={item.quantity}
                            onChange={(e) => {
                              handleQuantity(e, item);
                            }}
                          >
                            {[...Array(item.minimumOrderQuantity).keys()].map(
                              (que, index) => (
                                <option key={index} value={que + 1}>
                                  {que + 1}
                                </option>
                              )
                            )}

                            {/* <option value="2">2</option> */}
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            onClick={() => {
                              handleRemove(item);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>
            $
            {cartItems &&
              cartItems
                .reduce(
                  (amount, item) =>
                    item
                      ? amount +
                        ((
                          item.price *
                          (1 - item.discountPercentage / 100)
                        ).toFixed(2) * item.quantity || 0)
                      : amount,
                  0
                )
                .toFixed(2)}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to={"/checkout"}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to={"/"}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
