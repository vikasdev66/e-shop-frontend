import React from "react";
import { selectLoggedInUser } from "../authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
