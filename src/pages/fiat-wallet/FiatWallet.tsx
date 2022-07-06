import React from "react";
import Button from "../../components/atom/Button";
import {useNavigate} from "react-router-dom";
import {FiatWalletOverview} from "../../feature/fiat-wallet/fiat-wallet-overview/FiatWalletOverview";

const FiatWallet: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className={"fiat-wallet"}>
            <h1>Fiat Wallet</h1>
            <FiatWalletOverview/>
        </div>
    )
}

export default FiatWallet
