import React from "react";
import { createOrderAsync, selectOrders } from "./orderSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Order() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  return <div></div>;
}
