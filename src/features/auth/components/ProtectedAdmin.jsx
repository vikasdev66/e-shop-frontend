import React from "react";
import { selectLoggedInUser } from "../authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (user && user.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }
  return children;
}
