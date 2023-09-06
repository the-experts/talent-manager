"use client"
import Image from "next/image";
import theexperts from "../public/images/the-experts.svg";
import {Layout, Menu} from "antd";
import React from "react";
import {ItemType} from "antd/lib/menu/hooks/useItems";
import {UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {Footer} from "antd/es/layout/layout";
import LogoutPage from "@/app/logout/page";
import LoginPage from "@/app/login/page";
import {DbUser} from "@/app/hooks/user";
const {Header, Content, Sider} = Layout;

type DashboardLayoutProps = {
    children: React.ReactNode,
    user?: DbUser|null
};

export default function DashboardLayout({children, user}: DashboardLayoutProps) {
    const router = useRouter();

    const menuItems: ItemType[] = [{
        key: '1',
        label: 'Mijn Profiel',
        icon: <UserOutlined/>,
        onClick: () => {
            router.push('/')
        }
    },
        (user?.roles_id === 1 || user?.roles_id === 2) ? {
        key: '2',
        label: 'Collega\'s',
        icon: <UserOutlined/>,
        onClick: () => {
            router.push('/collegas')
        }
    } : null
    ];

    return (
        <Layout className={'h-screen'}>
            <Header className="header flex justify-between">
                <div className={'w-44 mt-2'}>
                    <Image src={theexperts} alt={'the-experts-company-logo'}/>
                </div>
                <div className={'w-44 mt-2'}>
                    <LogoutPage />
                    <LoginPage />
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                        items={menuItems}
                    />
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
            <Footer className={'footer'}>Hier komt straks een footer te staan</Footer>
        </Layout>
    );
}
