import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../../providers/MetaMaskProvider";
import {Input} from "antd";
import Button from "../../../components/atom/Button";
import {ITransaction} from "../../../model";

export const CryptoWalletOverview: React.FC = () => {
    const {accountBalance, connectedAccount, transfer, getTransactions} = useMetaMaskAccount()
    const [amount, setAmount] = useState<string>('')
    const [destination, setDestination] = useState<string>('')
    const [transactions, setTransactions] = useState<Array<ITransaction>>([])
    useEffect(() => {
        getTransactions(connectedAccount).then((trx: []) => {
            console.log(trx)
            setTransactions(trx)
        })
    }, [])

    return (
        <div>
            <h2>Balance: {accountBalance}</h2>
            <h1>Address: {connectedAccount}</h1>
            <Input placeholder={"Amount"} onChange={(e) => setAmount(e.target.value)}/>
            <Input placeholder={"Destination"} onChange={(e) => setDestination(e.target.value)}/>
            <Button label={"transfer"} onClick={() => transfer(amount, destination)}/>

        </div>
    )
}