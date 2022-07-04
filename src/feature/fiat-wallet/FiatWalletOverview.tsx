import {useAppSelector} from "../../store/hooks";
import {amountSelector, transactionsSelector} from "../../store/slices/fiat";
import React, {useState} from "react";
import {ITransaction} from "../../model";
import {ColumnsType} from "antd/lib/table";
import {Table, Tag} from "antd";

export const FiatWalletOverview = () => {
    const balance = useAppSelector(amountSelector)
    const transactions = useAppSelector(transactionsSelector)
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
            render: type => (
                <Tag color={
                    type === "deposit" ? 'green' : type === "withdraw" ? "volcano" : "blue"
                }
                     key={type}
                >
                    {type.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Destination',
            dataIndex: 'userTo',
            key: 'userTo',
        },
    ];

    return (
        <>
            <h2><b>Balance</b>: ${balance}</h2>
            <Table columns={columns} dataSource={data}/>
        </>
    )

}