import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ allowedRoles }) => {
    const { name, role } = useAuth();
    const location = useLocation();

    const arrRole = [role]; //convert to array so that .find is not a function error solved

    return arrRole?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : name ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default PrivateRoutes;
