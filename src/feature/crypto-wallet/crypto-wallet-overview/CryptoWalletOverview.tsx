import React, {useEffect, useState} from "react";
import {useMetaMaskAccount} from "../../../providers/MetaMaskProvider";
import {Space, Table, Tag, Tooltip} from "antd";
import {ColumnsType} from "antd/lib/table";
import {ethers} from "ethers";
import {ICryptoTransaction} from "../../../model";
import Button from "../../../components/atom/Button";
import "./CryptoWalletOverview.scss"
import {CryptoWalletTransaction} from "../crypto-wallet-transaction/CryptoWalletTransaction";
import {openNotification} from "../../../components/atom/Notification";
import {ReloadOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {timestampToDate} from "../../../utils/dateUtils";

export const CryptoWalletOverview: React.FC = () => {
    const {accountBalance, connectedAccount, getTransactions} = useMetaMaskAccount()
    const [transactions, setTransactions] = useState<Array<ICryptoTransaction>>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleOk = () => {
        setIsModalVisible(false)
        openNotification({
            type: "success",
            message: 'Success',
            description: 'The transaction is being processed, wait a couple of seconds and reload'
        })
    }

    const getAllTransactions = () => {
        getTransactions(connectedAccount).then((trx: []) => {
            console.log(trx)
            setTransactions(trx.reverse())
        })
    }

    useEffect(() => {
        getAllTransactions()
    }, [])

    const columns: ColumnsType<ICryptoTransaction> = [
        {
            title: 'Hash',
            dataIndex: 'hash',
            key: 'hash',
            render: (hash) => <Tooltip title={hash}>{hash.slice(0, 10)}...</Tooltip>
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
            render: (hash) => <Tooltip title={hash}>{hash.slice(0, 10)}...</Tooltip>
        },
        {
            title: 'Destination',
            dataIndex: 'to',
            key: 'to',
            render: (hash) => <Tooltip title={hash}>{hash.slice(0, 10)}...</Tooltip>
        },
        {
            title: 'Date',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp) => timestampToDate(timestamp)
        },
    ];

    return (
        <div className={"crypto-overview"}>
            <div className={"crypto-overview__header"}>
                <h2><b>Balance</b>: {accountBalance} KETH</h2>
                <div>
                    <Space>
                        <Button size="large"
                                shape={"round"}
                                type={"primary"}
                                label={"New transaction"}
                                icon={<PlusCircleOutlined/>}
                                onClick={showModal}/>
                        <Button size="large"
                                shape={"round"}
                                type={"primary"}
                                label={"Reload"}
                                icon={<ReloadOutlined/>}
                                onClick={getAllTransactions}/>
                    </Space>
                </div>

            </div>
            <h1><b>Address</b>: {connectedAccount}</h1>
            <Table rowKey="hash"
                   columns={columns}
                   dataSource={transactions}
                   pagination={{pageSize: 8}}
            />
            <CryptoWalletTransaction isModalVisible={isModalVisible}
                                     handleOk={handleOk}
                                     handleCancel={handleCancel}/>
        </div>
    )
}