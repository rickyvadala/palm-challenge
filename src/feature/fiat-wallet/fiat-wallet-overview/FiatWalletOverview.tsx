import React, {useState} from "react";
import {ITransaction} from "../../../model";
import {ColumnsType} from "antd/lib/table";
import {Table, Tag} from "antd";
import {useGetBalance, useGetTransactions} from "../../../hooks";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../../store/slices/users";
import Button from "../../../components/atom/Button";
import "./FIatWalletOverview.scss"
import {FiatWalletTransaction} from "../fiat-wallet-transaction/FiatWalletTransaction";
import {PlusCircleOutlined} from '@ant-design/icons';

export const FiatWalletOverview: React.FC = () => {
    const user = useSelector(currentUserSelector)
    const balance = useGetBalance()
    const transactions = useGetTransactions()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);
    const handleOk = () => setIsModalVisible(false)

    const columns: ColumnsType<ITransaction> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type, t) => {
                const greenCondition = (t: ITransaction) => t.type === "deposit" || t.destination === user.id
                return (
                    <Tag key={t.id} color={greenCondition(t) ? 'green' : "volcano"}>
                        {type.toUpperCase()}
                    </Tag>
                )
            },
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin'
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
    ];

    return (
        <div className={"fiat-overview"}>
            <div className={"fiat-overview__header"}>
                <h2><b>Balance</b>: ${balance}</h2>
                <Button size="large"
                        shape={"round"}
                        type={"primary"}
                        label={"New transaction"}
                        icon={<PlusCircleOutlined/>}
                        onClick={showModal}/>
            </div>
            <Table rowKey={"id"}
                   columns={columns}
                   dataSource={transactions}
                   pagination={{pageSize: 8}}
            />
            <FiatWalletTransaction isModalVisible={isModalVisible}
                                   handleOk={handleOk}
                                   handleCancel={handleCancel}
            />
        </div>
    )

}