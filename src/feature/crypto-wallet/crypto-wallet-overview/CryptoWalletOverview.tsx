import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../../providers/MetaMaskProvider";
import {Table, Tag, Tooltip} from "antd";
import {ColumnsType} from "antd/lib/table";
import {ethers} from "ethers";
import {ICryptoTransaction} from "../../../model/ICryptoTransaction";
import Button from "../../../components/atom/Button";
import "./CryptoWalletOverview.scss"
import {CryptoWalletTransaction} from "../crypto-wallet-transaction/CryptoWalletTransaction";
import {openNotification} from "../../../components/atom/Notification";

export const CryptoWalletOverview: React.FC = () => {
    const {accountBalance, connectedAccount, getTransactions} = useMetaMaskAccount()
    const [transactions, setTransactions] = useState<Array<ICryptoTransaction>>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleOk = () => {
        setIsModalVisible(false)
        openNotification({
            message: 'Attention',
            description: 'The transaction is being processed, wait a couple of seconds and refresh the page'
        })
    }

    useEffect(() => {
        getTransactions(connectedAccount).then((trx: []) => setTransactions(trx))
    }, [])

    const columns: ColumnsType<ICryptoTransaction> = [
        {
            title: 'Hash',
            dataIndex: 'hash',
            key: 'hash',
            render: (hash) => <Tooltip title={hash}>{hash.slice(0,10)}...</Tooltip>
        },
        {
            title: 'Amount',
            dataIndex: 'value',
            key: 'value',
            render: (value) => ethers.utils.formatEther(value)
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type, t) => {
                const greenCondition = (t: ICryptoTransaction) => t.to?.toUpperCase() === connectedAccount.toUpperCase()
                return (
                    <Tag color={greenCondition(t) ? 'green' : "volcano"}>PAYMENT</Tag>
                )
            },
        },
        {
            title: 'Origin',
            dataIndex: 'from',
            key: 'from',
            render: (hash) => <Tooltip title={hash}>{hash.slice(0,10)}...</Tooltip>
        },
        {
            title: 'Destination',
            dataIndex: 'to',
            key: 'to',
            render: (hash) => <Tooltip title={hash}>{hash.slice(0,10)}...</Tooltip>
        },
    ];

    return (
        <div className={"crypto-overview"}>
            <div className={"crypto-overview__header"}>
                <h2><b>Balance</b>: {accountBalance} KovanETH</h2>
                <Button size="large"
                        shape={"round"}
                        type={"primary"}
                        label={"New transaction"}
                        onClick={showModal}/>
            </div>
            <h1><b>Address</b>: {connectedAccount}</h1>
            <Table rowKey="hash"
                   columns={columns}
                   dataSource={transactions}
                   pagination={{pageSize: 10}}
            />
            <CryptoWalletTransaction isModalVisible={isModalVisible}
                                     handleOk={handleOk}
                                     handleCancel={handleCancel}/>
        </div>
    )
}