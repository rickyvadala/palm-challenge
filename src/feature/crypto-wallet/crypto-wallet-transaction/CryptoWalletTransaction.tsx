import React from "react";
import {Form, Input, Modal} from "antd";
import Button from "../../../components/atom/Button";
import "./CryptoWalletTransaction.scss"
import {UserOutlined} from "@ant-design/icons";
import {useMetaMaskAccount} from "../../../providers/MetaMaskProvider";
import {ICryptoTransaction} from "../../../model";
import {openNotification} from "../../../components/atom/Notification";

type CryptoWalletTransactionType = {
    isModalVisible: boolean | undefined,
    handleOk: () => void,
    handleCancel: () => void
}

export const CryptoWalletTransaction: React.FC<CryptoWalletTransactionType> =
    ({
         isModalVisible,
         handleOk,
         handleCancel
     }) => {
        const {transfer} = useMetaMaskAccount()

        const onFinish = (t: ICryptoTransaction) => {
            transfer(t.value, t.to).then((res: any) => {
                console.log(res)
                handleOk()
            }).catch(() => {
                openNotification({description: 'Transaction canceledin MetaMask'})
            })
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
                        label="Amount"
                        name="value"
                        rules={[{required: true, message: 'Please input the amount!'}]}
                    >
                        <Input type={"number"} size="large" prefix="KETH"/>
                    </Form.Item>

                    <Form.Item
                        label="Destination"
                        name="to"
                        rules={[{required: true, message: 'Please input the recipient address'}]}
                    >
                        <Input size="large" prefix={<UserOutlined/>}/>
                    </Form.Item>

                    <Form.Item style={{marginTop: 32}}>
                        <Button type="primary"
                                shape="round"
                                label="TRANSFER"
                                htmlType="submit"
                                style={{width: '100%'}}
                                size="large"/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }