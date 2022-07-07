import React from "react";
import {Form, Input} from "antd";
import {useAppDispatch} from "../../store/hooks";
import {createUser, login} from "../../store/slices/users";
import {useNavigate} from "react-router-dom";
import Button from "../../components/atom/Button";
import './RegisterForm.scss'
import {IUser} from "../../model";
import {KeyOutlined, UserOutlined} from '@ant-design/icons';
import {openNotification} from "../../components/atom/Notification";

export const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch()
    let navigate = useNavigate();


    const onFinish = (values: any) => {
        const user: Partial<IUser> = {
            username: values.username,
            password: values.password
        }
        try {
            dispatch(createUser(user))
            dispatch(login(user))
            navigate('/home')
        } catch (e: any) {
            openNotification({description: e.message})
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form className="register-form"
              name="basic"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input prefix={<UserOutlined/>}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password prefix={<KeyOutlined/>}/>
            </Form.Item>


            <Form.Item
                label="Repeat Password"
                name="passwordRepeat"
                rules={[{required: true, message: 'Please repeat your password!'}]}
            >
                <Input.Password prefix={<KeyOutlined/>}/>
            </Form.Item>


            <div className="register-form__buttons">
                <Form.Item>
                    <Button type="primary"
                            shape="round"
                            label="Register"
                            htmlType="submit"
                            size="large"
                            style={{width: '100%'}}
                    />
                </Form.Item>
                <h4>If you have an account:</h4>
                <Form.Item>
                    <Button type="primary"
                            shape="round"
                            label="Login"
                            size="large"
                            style={{width: '100%'}}
                            onClick={() => navigate('/guest')}
                    />
                </Form.Item>
            </div>
        </Form>
    )
}