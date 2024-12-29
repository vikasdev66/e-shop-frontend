import React from "react";
import Orders from "../features/order/Orders";
import Navbar from "../features/navbar/Navbar";

export default function OrdersPage() {
  return (
    <Navbar>
      <Orders />
    </Navbar>
  );
}
