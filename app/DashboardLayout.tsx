'use client';
import Image from 'next/image';
import logo from '../public/images/logo.png';
import { Layout, Menu } from 'antd';
import React from 'react';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Footer } from 'antd/es/layout/layout';
import { DbUser } from '@/app/hooks/user';
import LogOut from '@/app/LogOut';
const { Header, Content, Sider } = Layout;

type DashboardLayoutProps = {
  children: React.ReactNode;
  colleague?: DbUser | null;
};

export default function DashboardLayout({
  children,
  colleague,
}: DashboardLayoutProps) {
  const router = useRouter();

  const menuItems: ItemType[] = [
    {
      key: '1',
      label: 'Mijn Profiel',
      icon: <UserOutlined />,
      onClick: () => {
        router.push('/');
      },
    },
    colleague?.roles_id === 1 || colleague?.roles_id === 2
      ? {
          key: '2',
          label: "Collega's",
          icon: <UserOutlined />,
          onClick: () => {
            router.push('/collegas');
          },
        }
      : null,
  ];

  return (
    <Layout className={'h-screen'}>
      <Header className="header flex justify-between h-16 px-7 pt-4 pb-4">
        <div className={'w-44'}>
          <Image src={logo} alt={'the-experts-company-logo'} />
        </div>
        <div>
          <h1 className={'text-2xl font-bold text-white'}>Talent Manager</h1>
        </div>
        <div className={'leading-none'}>
          <LogOut />
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow: 'scroll',
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
