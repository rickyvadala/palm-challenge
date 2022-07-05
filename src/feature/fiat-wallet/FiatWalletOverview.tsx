import React, {useState} from "react";
import {ITransaction} from "../../model";
import {ColumnsType} from "antd/lib/table";
import {Table, Tag} from "antd";
import {useGetBalance, useGetTransactions} from "../../hooks";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../store/slices/users";

export const FiatWalletOverview = () => {
    const user = useSelector(currentUserSelector)
    const balance = useGetBalance()
    const transactions = useGetTransactions()
    const [data, setData] = useState<ITransaction[]>(transactions);

    const columns: ColumnsType<ITransaction> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type, t) => {
                const greenCondition = (t: ITransaction) => t.type === "deposit" || t.destination === user.id
                return (
                    <Tag key={JSON.stringify(t)} color={greenCondition(t) ? 'green' : "volcano"}>
                        {type.toUpperCase()}
                    </Tag>
                )
            },
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin',
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
    ];

    return (
        <>
            <h2><b>Balance</b>: ${balance}</h2>
            <Table columns={columns} dataSource={data}/>
        </>
    )

}