import React, {useState} from "react";
import {Form, Input, Modal, Select} from "antd";
import Button from "../../../components/atom/Button";
import "./FIatWalletTransaction.scss"
import {UserOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deposit, pay, withdraw} from "../../../store/slices/fiat";
import {openNotification} from "../../../components/atom/Notification";
import {ITransaction} from "../../../model";
import {currentUserSelector} from "../../../store/slices/users";
import {TransactionType} from "../../../model/ITransaction";

type FiatWalletTransaction = {
    isModalVisible: boolean | undefined,
    handleOk: () => void,
    handleCancel: () => void
}

export const FiatWalletTransaction: React.FC<FiatWalletTransaction> = ({isModalVisible, handleOk, handleCancel}) => {
    const dispatch = useAppDispatch()
    const [transactionType, setTransactionType] = useState<TransactionType>('deposit')
    const {id} = useAppSelector(currentUserSelector)

    const onFinish = (t: any) => {
        const parsedTransaction: Partial<ITransaction> = {
            ...t,
            destination: Number(t.destination),
            amount: Number(t.amount),
            origin: id
        }

        // const transactionExecutor: { [key: string]: () => void } = {
        //     'deposit': dispatch(deposit(parsedTransaction)),
        //     'withdraw': dispatch(withdraw(parsedTransaction)),
        //     'payment': dispatch(pay(parsedTransaction)),
        // }
        try {
            if (parsedTransaction.type === "deposit") dispatch(deposit(parsedTransaction))
            else if (parsedTransaction.type === "withdraw") dispatch(withdraw(parsedTransaction))
            else dispatch(pay(parsedTransaction))
            handleOk()
        } catch (e: any) {
            openNotification({description: e.message})
        }
    }

    return (
        <Modal className="fiat-transaction"
               title="Fiat transaction"
               visible={isModalVisible}
               footer={''}
               onOk={handleOk}
               onCancel={handleCancel}>
            <Form className="fiat-transaction__form"
                  name="basic"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                  initialValues={{type: "deposit"}}
                  onFinish={onFinish}
                  autoComplete="off"
            >
                <Form.Item
                    label="Transaction Type"
                    name="type"
                >
                    <Select size="large" onChange={setTransactionType}>
                        <Select.Option value="deposit">Deposit</Select.Option>
                        <Select.Option value="withdraw">Withdraw</Select.Option>
                        <Select.Option value="payment">Payment</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{required: true, message: 'Please input the amount!'}]}
                >
                    <Input type={"number"} size="large" prefix="$"/>
                </Form.Item>

                {
                    transactionType === 'payment' && <Form.Item
                        label="Destination"
                        name="destination"
                        rules={[{required: true, message: 'Please input the recipient/destination'}]}
                    >
                        <Input size="large" prefix={<UserOutlined/>}/>
                    </Form.Item>
                }

                <Form.Item style={{marginTop: 32}}>
                    <Button type="primary"
                            shape="round"
                            label={transactionType.toUpperCase()}
                            htmlType="submit"
                            style={{width: '100%'}}
                            size="large"/>
                </Form.Item>
            </Form>
        </Modal>
    )

}