import React from "react";
import './LoginForm.scss';
import {Form, Input} from "antd";
import {useAppDispatch} from "../../store/hooks";
import {login} from "../../store/slices/users";
import {useNavigate} from "react-router-dom";
import Button from "../../components/atom/Button";
import {KeyOutlined, UserOutlined} from '@ant-design/icons';
import {NotificationType, openNotification} from "../../components/atom/Notification";


export const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch()
    let navigate = useNavigate();

    const onFinish = (values: any) => {
        try {
            dispatch(login({
                username: values.username,
                password: values.password
            }))
            navigate('/')
        } catch (e: any) {
            const notification: NotificationType = {
                message: 'Error',
                description: e.message
            }
            openNotification(notification)
        }
    };

    return (
        <Form className="login-form"
              name="basic"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{remember: true}}
              onFinish={onFinish}
              autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input size="large" prefix={<UserOutlined/>}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password size="large" prefix={<KeyOutlined/>}/>
            </Form.Item>
            <div className="register-form__buttons">
                <Form.Item>
                    <Button type="primary"
                            shape="round"
                            label="Login"
                            htmlType="submit"
                            style={{width: '100%'}}
                            size="large"/>
                </Form.Item>
                <h4>If you don't have an account:</h4>
                <Form.Item>
                    <Button type="primary"
                            label="Register"
                            shape="round"
                            size="large"
                            style={{width: '100%'}}
                            onClick={() => navigate('/guest/register')}/>
                </Form.Item>
            </div>
        </Form>
    )
}