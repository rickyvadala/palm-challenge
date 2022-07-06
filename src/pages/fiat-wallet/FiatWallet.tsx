import React from "react";
import {FiatWalletOverview} from "../../feature/fiat-wallet/fiat-wallet-overview/FiatWalletOverview";

const FiatWallet: React.FC = () => {
    return (
        <div className={"fiat-wallet"}>
            <h1>Fiat Wallet</h1>
            <FiatWalletOverview/>
        </div>
    )
}

export default FiatWallet
