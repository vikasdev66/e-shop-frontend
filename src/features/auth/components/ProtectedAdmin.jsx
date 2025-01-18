import React from "react";
import { selectLoggedInUser } from "../authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

export default function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (user && userInfo?.userInfo?.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }
  return children;
}
