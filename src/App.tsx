import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import "antd/dist/antd.css";
import PrimaryLayout from "./layout/primary-layout/PrimaryLayout";
import Home from "./pages/home/Home";
import FiatWallet from "./pages/fiat-wallet/FiatWallet";
import Transaction from "./pages/fiat-wallet/transaction/Transaction";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {ProtectedRoute} from "./feature/router/ProtectedRoute";
import {GuestLayout} from "./layout/guest-layout/GuestLayout";
import CryptoWallet from "./pages/crypto-wallet/CryptoWallet";
import {CryptoRoute} from "./feature/router/CryptoRoute";

export default App;

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route path="/" element={<PrimaryLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="fiat" element={<FiatWallet/>}/>
                        <Route path="crypto" element={<CryptoRoute/>}>
                            <Route index element={<CryptoWallet/>}/>
                        </Route>
                        <Route path="*" element={<Home/>}/>
                    </Route>
                </Route>
                <Route path="guest" element={<GuestLayout/>}>
                    <Route index element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
            </Routes>
        </div>
    );
}
