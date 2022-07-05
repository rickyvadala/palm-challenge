import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useMetaMaskAccount} from "../../providers/MetaMaskProvider";

export const CryptoRoute: React.FC = () => {
    const {isConnected} = useMetaMaskAccount();
    return isConnected
        ? <Outlet/>
        : <Navigate to="/"/>;
}