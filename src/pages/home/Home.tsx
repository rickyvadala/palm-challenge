import React, {useEffect, useState} from "react";
import {CryptoWalletConnection} from "../../feature/crypto-wallet/crypto-wallet-connection/CryptoWalletConnection";
import Button from "../../components/atom/Button";
import {useNavigate} from "react-router-dom";
import './Home.scss'
import MetaMaskProvider, {useMetaMaskAccount} from "../../providers/MetaMaskProvider";

type WalletType = "fiat" | "crypto"
const Home: React.FC = () => {
    const {isConnected} = useMetaMaskAccount()
    const [walletSelected, setWalletSelected] = useState<WalletType>("fiat")
    const navigate = useNavigate()

    useEffect(() => {
        (walletSelected === 'crypto' && isConnected) && navigate('/crypto')
    }, [walletSelected])
    
    return (
        <div className={"home"}>
            <h2>Welcome to Palm Challenge</h2>
            <h3>Choose between <b>Fiat Wallet</b> or <b>Crypto Wallet</b></h3>
            <div className={"home__wallet-buttons"}>
                <Button size="large"
                        shape={"round"}
                        type={"primary"}
                        label={"Fiat Wallet"}
                        onClick={() => navigate('/fiat')}
                />
                <Button size="large"
                        shape={"round"}
                        type={walletSelected === "fiat" ? "primary" : "dashed"}
                        label={"Crypto Wallet"}
                        onClick={() => setWalletSelected("crypto")}
                />
            </div>
            {
                walletSelected === "crypto" && <CryptoWalletConnection/>
            }
        </div>
    )
}

export default Home
