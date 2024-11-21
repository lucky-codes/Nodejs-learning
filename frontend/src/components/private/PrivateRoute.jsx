import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Signup from '../signup/Signup'
const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />
  } else {
    return <Navigate to="/
    " />
  }};

export default PrivateRoute;
