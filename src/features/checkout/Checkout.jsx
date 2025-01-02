import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Space } from "antd";
import {
  selectCart,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "../cart/cartSlice";
import {
  deleteAddressAsync,
  createAddressAsync,
  selectUserInfo,
} from "../user/userSlice";
import { createOrderAsync, selectOrdersDetails } from "../order/orderSlice";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, Navigate } from "react-router-dom";
import { MenuItem } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { discountedPrice, subTotalPrice } from "../../app/constants";

export default function Checkout() {
  const cartItems = useSelector(selectCart);
  const user = useSelector(selectUserInfo);
  const order = useSelector(selectOrdersDetails);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: Number(e.target.value) }));
  };

  const handleRemove = (item) => {
    dispatch(deleteItemFromCartAsync(item.id));
  };

  const handleAddressRemove = (address) => {
    dispatch(deleteAddressAsync(address.id));
  };

  const handleChooseAddress = (address) => {
    const add = Object.fromEntries(
      Object.entries(address).filter(([key]) => key !== "userId")
    );
    setSelectedAddress(add);
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handlePayAndOrder = () => {
    if (selectedAddress) {
      const address = Object.fromEntries(
        Object.entries(selectedAddress).filter(([key]) => key !== "id")
      );
      const date = new Date();
      const currentDate = date.toLocaleDateString(); //  "mm/dd/yyyy"
      const order = {
        products: cartItems.map((item) => {
          return {
            productId: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            price: Number(discountedPrice(item)),
            warrantyInformation: item.warrantyInformation,
            thumbnail: item.thumbnail,
            brand: item.brand,
            quantity: item.quantity,
          };
        }),
        ...address,
        addressId: selectedAddress?.id,
        userId: user.userInfo.id,
        paymentMethod: paymentMethod,
        status: "pending",
        datePlaced: currentDate,
        subTotal: Number(subTotalPrice(cartItems)),
      };
      dispatch(createOrderAsync(order));
    } else {
      messageApi.open({
        type: "warning",
        content: "First select delivery address",
      });
    }
  };

  if (!cartItems.length) {
    return <Navigate to={"/"} replace />;
  }

  if (order.isRedirect) {
    return <Navigate to={`/order-placed/${order.currentOrder.id}`} replace />;
  }
  return (
    <>
      {contextHolder}
      <Space>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
          <div className="lg:col-span-3">
            <form
              className="p-5 bg-white mt-12"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  createAddressAsync({ ...data, userId: user.userInfo.id })
                );
                reset();
              })}
              noValidate
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          {...register("name", {
                            required: "Name is required",
                            pattern: {
                              value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
                              message: "Invalid full name",
                            },
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors?.name && (
                          <p className="text-red-500">
                            {errors?.name?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address",
                            },
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors?.email && (
                          <p className="text-red-500">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          {...register("phoneNumber", {
                            required: "Phone Number is required",
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message: "Invalid phone number",
                            },
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors?.phoneNumber && (
                          <p className="text-red-500">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          defaultValue={"india"}
                          id="country"
                          name="country"
                          {...register("country", {
                            required: "Country is required",
                          })}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option value={"india"}>India</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                        {errors?.country && (
                          <p className="text-red-500">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          name="street"
                          type="text"
                          {...register("street", {
                            required: "Street address is required",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors?.street && (
                          <p className="text-red-500">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors?.city && (
                          <p className="text-red-500">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          name="state"
                          type="text"
                          {...register("state", {
                            required: "State is required",
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors?.state && (
                          <p className="text-red-500">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          name="pinCode"
                          type="text"
                          {...register("pinCode", {
                            required: "Postal code is required",
                            pattern: {
                              value: /^\d{6}$/,
                              message: "Enter six digit ZIP / Postal code",
                            },
                          })}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        {errors?.pinCode && (
                          <p className="text-red-500">
                            {errors?.email?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                    }}
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Choose from Existing Address
                  </p>
                  {/* Address list */}
                  <ul role="list" className="">
                    {user.addresses.length &&
                      user.addresses.map((address) => (
                        <li
                          key={address.id}
                          className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              onChange={() => {
                                handleChooseAddress(address);
                              }}
                              checked={address.id === selectedAddress?.id}
                              value={selectedAddress?.id}
                              name="address"
                              type="radio"
                              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm/6 font-semibold text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs/5 text-gray-500">
                                {address.phoneNumber}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm/6 text-gray-900">
                              {address.street}, {address.city}, {address.state},{" "}
                              {address.country}, {address.pinCode}
                            </p>
                            <div className="flex">
                              <button
                                onClick={() => {
                                  handleAddressRemove(address);
                                }}
                                type="button"
                                className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm/6 font-semibold text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm/6 text-gray-600">
                        Choose One:
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={(e) => {
                              handlePaymentMethod(e.target.value);
                            }}
                            checked={paymentMethod === "cash"}
                            value={"cash"}
                            id="cash"
                            name="payment"
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={(e) => {
                              handlePaymentMethod(e.target.value);
                            }}
                            checked={paymentMethod === "card"}
                            value={"card"}
                            id="card"
                            name="payment"
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto max-w-7xl px-4 py-1 mt-12 sm:px-6 lg:px-8 bg-white">
              {/*  <div className="sm:px-20 sm:py-10 p-0 bg-#f2f4f5"> */}
              <div className="mt-8">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems &&
                      cartItems.map((item) => (
                        <li key={MenuItem.id} className="flex py-6">
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Link to={`/product-detail/${item.id}`}>
                              <img
                                alt={item.title}
                                src={item.thumbnail}
                                className="size-full object-cover"
                              />
                            </Link>
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.href}>{item.title}</a>
                                </h3>
                                <p className="ml-4">${discountedPrice(item)}</p>
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
                                  {[
                                    ...Array(item.minimumOrderQuantity).keys(),
                                  ].map((que, index) => (
                                    <option key={index} value={que + 1}>
                                      {que + 1}
                                    </option>
                                  ))}
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
                      ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cartItems && subTotalPrice(cartItems)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={() => {
                      handlePayAndOrder();
                    }}
                    className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay and Order
                  </div>
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
          </div>
        </div>
      </Space>
    </>
  );
}
