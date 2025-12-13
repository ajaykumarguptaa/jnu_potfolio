import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { adminSlice } = useSelector((state) => state.admin);

  // If admin is not logged in, redirect to login page
  if (!adminSlice || !adminSlice.admin_id) {
    return <Navigate to="/login" replace />;
  }
  // Allow access
  return <Outlet />;
};

export default PrivateRoute;
