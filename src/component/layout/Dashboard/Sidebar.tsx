import { Button, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBook, FaBoxOpen } from "react-icons/fa";
import { useState } from "react";
import { TUser } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";

const { Sider } = Layout;

const Sidebar = ({ user }: { user: TUser }) => {
  const dispatch = useAppDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");

    navigate("/sign-in");
  };

  const items =
    user?.role === "admin"
      ? [
          {
            key: "1",
            icon: <UserOutlined />,
            label: <NavLink to="user-management">User Management</NavLink>,
          },
        ]
      : [
        {
          key: "1",
          icon: <FaBoxOpen  />,
          label: <NavLink to="order-history">Order History </NavLink>,
        },
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
          background: "#fff",
          height: "100vh",
          ...(isMobile
            ? { position: "fixed", left: 0, top: 0, zIndex: "50" }
            : { position: "relative" }),
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
        {!collapsed && 
        <div style={{  position: "absolute",
          bottom: 20,
          left: 0,
          width: "100%",
          padding: "10px",
          borderTop: "1px solid #f0f0f0",
          background: "#fff",}}>
          <Button onClick={handleLogout} type="primary" block>
            Log Out
          </Button>
        </div>}
      </Sider>
    </>
  );
};

export default Sidebar;
