import Button from "../../../components/atom/Button";
import './CryptoWalletConnection.scss'
import {WalletOutlined} from "@ant-design/icons";
import React from "react";
import {useMetaMaskAccount} from "../../../providers/MetaMaskProvider";
import {openNotification} from "../../../components/atom/Notification";

export const CryptoWalletConnection = () => {
    const {connectAccount, ethereum} = useMetaMaskAccount()
    const connect = () => {
        if (ethereum) {
            connectAccount()
        } else {
            openNotification({
                message: "Error",
                description: "Please install MetaMask to access your Crypto Wallet",
                type: "error"
            })
        }
    }
    return (
        <>
            <div className="wallet-connection">
                <h3 className={"wallet-connection__title"}>
                    Connect to your <b>MetaMask</b> wallet to proceed
                </h3>
                <Button className="wallet-connection__button"
                        icon={<WalletOutlined/>}
                        label={"Connect wallet"}
                        size="large"
                        shape="round"
                        type="primary"
                        onClick={connect}
                />
            </div>
        </>
    )
}