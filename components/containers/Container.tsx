"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { FormOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

interface IProps {
  children: React.ReactNode;
  menuItem: string;
}

const { Header, Content, Sider } = Layout;

export default function NewContainer({ children, menuItem }: IProps) {
  const sideMenuItems: MenuProps["items"] = [
    {
      icon: <UploadOutlined />,
      label: <a href="/dashboard">Dashboard</a>,
      key: 1,
    },
    {
      icon: <FormOutlined />,
      label: <a href="/new-project">Create project</a>,
      key: 2,
    },
    {
      icon: <UserOutlined />,
      label: <a href="/auth/login">Logout</a>,
      key: 3,
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        style={{ height: "100vh", backgroundColor: "white" }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div style={{ height: 64 }}></div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[menuItem]}
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
