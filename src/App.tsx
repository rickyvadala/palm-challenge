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
                        <Route path="fiat-wallet">
                            <Route index element={<FiatWallet/>}/>
                            <Route path="transaction" element={<Transaction/>}/>
                        </Route>
                        <Route path="crypto-wallet" element={<CryptoRoute/>}>
                            <Route index element={<CryptoWallet/>}/>
                            <Route path="transaction" element={<Transaction/>}/>
                        </Route>
                        <Route path="*" element={<Home/>}/>
                    </Route>
                </Route>
                <Route path="/login" element={<GuestLayout/>}>
                    <Route index element={<Login/>}/>
                </Route>
                <Route path="/register" element={<GuestLayout/>}>
                    <Route index element={<Register/>}/>
                </Route>
            </Routes>
        </div>
    );
}
