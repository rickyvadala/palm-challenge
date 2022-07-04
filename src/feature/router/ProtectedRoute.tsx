import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../../store/hooks";
import {isAuthSelector} from "../../store/slices/users";

export const ProtectedRoute: React.FC = () => {
    const isAuth = useAppSelector(isAuthSelector);
    return isAuth
        ? <Outlet/>
        : <Navigate to="/login"/>;
}