import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./counterSlice";

export default function ProductList() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="sm:px-20 sm:py-10 p-0 bg-#f2f4f5">
      <div></div>
    </div>
  );
}
