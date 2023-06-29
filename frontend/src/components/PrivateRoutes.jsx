import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import React from 'react'

const PrivateRoutes = () => {
    const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoutes
