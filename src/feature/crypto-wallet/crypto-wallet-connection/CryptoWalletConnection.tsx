import Button from "../../../components/atom/Button";
import './CryptoWalletConnection.scss'
import {WalletOutlined} from "@ant-design/icons";
import {NotificationType, openNotification} from "../../../components/atom/Notification";
import React, {useState} from "react";
import {ethers} from "ethers"

export const CryptoWalletConnection = () => {
    const windowRef: any = window
    const notification: NotificationType = {
        message: 'Hey!',
        description: 'Please install MetaMask and try again',
        type: 'warning'
    }
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState("");
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const connectWallet = () => {
        if (windowRef.ethereum) {
            windowRef.ethereum.request({method: 'eth_requestAccounts'}).then((result: any) => {
                accountChangedHandler(result[0]);
                setConnButtonText('Wallet Connected');
                getAccountBalance(result[0]);
            }).catch((error: any) => {
                openNotification({
                    ...notification,
                    description: error.message
                });
            });
        } else {
            openNotification(notification)
        }
    }

    // update account, will cause component re-render
    const accountChangedHandler = (newAccount: any) => {
        setDefaultAccount(newAccount);
        getAccountBalance(newAccount.toString());
    }

    const getAccountBalance = (account: any) => {
        windowRef.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']}).then((balance: any) => {
            setUserBalance(ethers.utils.formatEther(balance));
        }).catch((error: any) => {
            openNotification({
                ...notification,
                description: error.message
            });
        });
    };

    const chainChangedHandler = () => windowRef.location.reload()

    // listen for account changes
    if (windowRef.ethereum) {
        windowRef.ethereum.on('accountsChanged', accountChangedHandler)
        windowRef.ethereum.on('chainChanged', chainChangedHandler);
    }

    return (
        <>
            <div className="wallet-connection">
                <h3 className={"wallet-connection__title"}>
                    Connect to your <b>MetaMask</b> wallet to proceed
                </h3>
                <Button className="wallet-connection__button"
                        icon={<WalletOutlined/>}
                        label={connButtonText}
                        size="large"
                        shape="round"
                        type="primary"
                        onClick={connectWallet}
                />
            </div>
        </>
    )
}