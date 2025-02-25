import { Layout, Menu } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { useState } from "react";
import { TUser } from "../../../types";

const { Sider } = Layout;

const Sidebar = ({ user }: { user: TUser }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const items =
    user?.role === "admin"
      ? [
          { key: "1", icon: <UserOutlined />, label: <NavLink to="user-management">User Management</NavLink> },
         
        ]
      : [
         
        ];

  return (
    <>
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(value) => setCollapsed(value)}
        onBreakpoint={(broken) => setIsMobile(broken)}
        style={{
          height: "100vh",
          background: "#fff",
          
          ...(isMobile ? { position: "fixed", left: 0, top: 0, zIndex: "50" } : {position: "relative",zIndex: "50"  }),
        }}
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
          {!collapsed && <span>Bookstore</span>}
        </Link>

        {/* Sidebar Menu */}
        <Menu mode="inline" defaultSelectedKeys={["1"]} items={items} />
      </Sider>
    </>
  );
};

export default Sidebar;
