import React from "react";
import Navbar from "../features/navbar/Navbar";

import AdminProductList from "../features/admin/components/AdminProductList";

export default function AdminHome() {
  return (
    <Navbar>
      <AdminProductList />
    </Navbar>
  );
}
