import React, { useEffect } from "react";
import { selectOrders, fetchOrdersAsync } from "./orderSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Orders() {
  const dispatch = useDispatch();
  const order = useSelector(selectOrders);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(fetchOrdersAsync(user?.id));
  }, [user?.id, dispatch]);
  return (
    <div>
      {order.orders.length && (
        <div className="max-w-4xl mx-auto p-4">
          {order.orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg p-6 mb-6 shadow-sm"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-sm text-gray-600">
                    Order number{" "}
                    <span className="font-medium">#{order.id}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Date placed:{" "}
                    <span className="font-medium">{order.datePlaced}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total amount:{" "}
                    <span className="font-medium">${order.subTotal}</span>
                  </div>
                </div>
                {/* Buttons */}
                {/* <div className="flex space-x-4">
                  <button className="bg-blue-500 text-white text-sm py-2 px-4 rounded-lg">
                    View Order
                  </button>
                  <button className="bg-gray-100 text-gray-700 text-sm py-2 px-4 rounded-lg">
                    View Invoice
                  </button>
                </div> */}
              </div>

              {order.products.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-start justify-between border-t border-gray-200 pt-4 mt-4"
                >
                  {/* Product Image */}
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Product Details */}
                  <div className="flex-1 px-4">
                    <div className="text-sm font-medium">{product.title}</div>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.description}
                    </p>
                    <div className="text-sm text-gray-500 mt-2">
                      Qty:{" "}
                      <span className="font-medium">{product.quantity}</span>
                    </div>
                    {/* <div className="text-sm text-gray-500 mt-2">
                      Delivered on{" "}
                      <span className="font-medium">
                        {product.deliveryDate}
                      </span>
                    </div> */}
                  </div>

                  {/* Product Price and Actions */}
                  <div className="text-right">
                    <div className="text-sm font-medium">${product.price}</div>
                    <div className="flex space-x-4 mt-2">
                      <Link to={`/product-detail/${product.productId}`} replace>
                        <button className="text-blue-500 text-sm">
                          View Product
                        </button>
                      </Link>
                      {/* <button className="text-blue-500 text-sm">
                        Buy Again
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h2 className="text-base/7 font-semibold text-gray-600 pb-5">
                  Shipping Address:
                </h2>
              </div>
              <div className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200 text-gray-600">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold">{order.name}</p>
                    <p className="mt-1 truncate text-xs/5">
                      {order.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6">
                    {order.street}, {order.city}, {order.state}, {order.country}
                    , {order.pinCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}