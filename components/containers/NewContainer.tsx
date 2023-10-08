"use client";

import React from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

interface IProps {
  children: React.ReactNode;
}

const { Header, Content, Footer, Sider } = Layout;

export default function NewContainer({ children }: IProps) {
  const listItems = [
    { id: "option1", title: "Option 1", href: "/auth/login" },
    { id: "option2", title: "Option 2", href: "/auth/register" },
  ];

  return (
    <Layout>
      <Sider
        style={{ height: "100vh", backgroundColor: "white" }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[UserOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            })
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#4096ff   " }} />
        <Content style={{ margin: "24px 16px 16px" }}>
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
