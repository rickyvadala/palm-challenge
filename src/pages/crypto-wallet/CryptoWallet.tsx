import React from "react";
import {CryptoWalletOverview} from "../../feature/crypto-wallet/crypto-wallet-overview/CryptoWalletOverview";

const CryptoWallet: React.FC = () => {
    return (
        <div className={"crypto-wallet"}>
            <h1>CryptoWallet</h1>
            <CryptoWalletOverview/>
        </div>
    )
}

export default CryptoWallet
