import {HomeOutlined, LogoutOutlined, TransactionOutlined, WalletOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb as AntBreadcrumb, Layout as AntLayout, Menu as AntMenu} from 'antd';
import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {currentUserSelector, logout} from "../../store/slices/users";
import {Logo} from "../../components/atom/Logo";
import './PrimaryLayout.scss'

const {Header, Content, Footer, Sider} = AntLayout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', 'home', <HomeOutlined width="2em"/>),
    getItem('Fiat Wallet', 'fiat', <WalletOutlined/>),
    getItem('Crypto Wallet', 'crypto', <TransactionOutlined/>),
    getItem('Logout', 'guest', <LogoutOutlined/>),
];

const PrimaryLayout: React.FC = () => {
    const dispatch = useAppDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('home');
    let navigate = useNavigate();
    const selector = useAppSelector(currentUserSelector)
    let location = useLocation();

    useEffect(() => {
        setCurrent(location.pathname.slice(1, location.pathname.length + 1).toLowerCase())
    }, [location]);

    const onClick: MenuProps['onClick'] = e => {
        if (e.key === 'logout') {
            dispatch(logout())
        }

        setCurrent(e.key);
        navigate(e.key)
    };

    return (
        <AntLayout className="primary-layout">
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <AntMenu onClick={onClick} theme="dark" selectedKeys={[current]} mode="inline" items={items}/>
            </Sider>
            <AntLayout>
                <Header className="primary-layout__header">
                    <h3 className="primary-layout__user">@{selector.username}</h3>
                    <Logo className="primary-layout__logo"/>
                </Header>
                <Content className="primary-layout__content">
                    <AntBreadcrumb style={{margin: '16px 0'}}>
                        <AntBreadcrumb.Item>Wallet</AntBreadcrumb.Item>
                        <AntBreadcrumb.Item>{current}</AntBreadcrumb.Item>
                    </AntBreadcrumb>
                    <div className="site-layout__outlet" style={{minHeight: 360}}>
                        <Outlet context={[setCurrent]}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <b>Palm Challenge</b> ©2021 Created by <b>Ricky Vadalá</b>
                </Footer>
            </AntLayout>
        </AntLayout>
    );
};

export default PrimaryLayout;
