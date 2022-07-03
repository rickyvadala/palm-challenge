import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import "antd/dist/antd.css";
import PrimaryLayout from "./layout/primary-layout/PrimaryLayout";
import Home from "./pages/home/Home";
import History from "./pages/history/History";
import Transaction from "./pages/transactions/Transaction";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {ProtectedRoute} from "./feature/router/ProtectedRoute";
import {GuestLayout} from "./layout/guest-layout/GuestLayout";

export default App;

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route path="/" element={<PrimaryLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="history" element={<History/>}/>
                        <Route path="transaction" element={<Transaction/>}/>
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
