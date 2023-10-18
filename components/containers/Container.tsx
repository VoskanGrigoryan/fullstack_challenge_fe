"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { FormOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const { Header, Content, Sider } = Layout;

export default function Container({ children }: IProps) {
  const pathname = usePathname();

  const sideMenuItems: MenuProps["items"] = [
    {
      icon: <UploadOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
      key: "/dashboard",
    },
    {
      icon: <FormOutlined />,
      label: <Link href="/new-project">Create project</Link>,
      key: "/new-project",
    },
    {
      icon: <UserOutlined />,
      label: <Link href="/auth/login">Logout</Link>,
      key: 3,
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        style={{ height: "100vh", backgroundColor: "white" }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div style={{ height: 64 }}></div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          items={sideMenuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#4096ff",
            display: "flex",
            justifyContent: "flex-end",
          }}
        ></Header>
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
