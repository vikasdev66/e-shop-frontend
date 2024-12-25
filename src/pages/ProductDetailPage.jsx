import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product-list/components/ProductDetail";

export default function ProductDetailPage() {
  return (
    <Navbar>
      <ProductDetail />
    </Navbar>
  );
}
