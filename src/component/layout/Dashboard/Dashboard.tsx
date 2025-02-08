import { Layout, Menu } from "antd";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";

const { Content, Footer, Sider, Header } = Layout;

// Sidebar Menu Items
const items = [
  { key: "1", icon: <UserOutlined />, label: "Profile" },
  { key: "2", icon: <VideoCameraOutlined />, label: "Videos" },
  { key: "3", icon: <UploadOutlined />, label: "Uploads" },
  { key: "4", icon: <UserOutlined />, label: "Settings" },
];

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", background: "#fff" }}
      >
        {/* Logo Section */}

        <Link
          to="/"
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Open Sans, sans-serif",
          }}
          className="font-open-sans"
        >
          <FaBook />
          <span>Bookstore</span>
        </Link>

        {/* Sidebar Menu */}
        <Menu mode="inline" defaultSelectedKeys={["1"]} items={items} />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          User Dashboard
        </Header>

        {/* Content */}
        <Content style={{ flex: 1, padding: "16px" }}>
          <div
            style={{
              padding: "24px",
              borderRadius: "8px",
            }}
          >
            Content goes here...
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
        © {new Date().getFullYear()} Bookstore. All Rights Reserved.
      </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
