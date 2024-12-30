import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync, selectLoggedInUser } from "../auth/authSlice";

export default function SignOut() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutAsync(user.id));
  }, []);

  return <>{!user && <Navigate to={"/login"} replace />}</>;
}
