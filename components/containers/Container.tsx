"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { FormOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const { Header, Content, Sider } = Layout;

export default function NewContainer({ children }: IProps) {
  const sideMenuItems: MenuProps["items"] = [
    {
      icon: <UploadOutlined />,
      label: <a href="/home">Dashboard</a>,
      key: 1,
    },
    {
      icon: <FormOutlined />,
      label: "Create project",
      key: 2,
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
          defaultSelectedKeys={["1"]}
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
        >
          <Link href="/auth/login">
            <div
              style={{ display: "flex", flexDirection: "row" }}
              // onClick={() => router.push("/home")}
            >
              <UserOutlined style={{ fontSize: 24, color: "white" }} />
              <p style={{ color: "white", marginLeft: 8, marginRight: 12 }}>
                Logout
              </p>
            </div>
          </Link>
        </Header>
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
