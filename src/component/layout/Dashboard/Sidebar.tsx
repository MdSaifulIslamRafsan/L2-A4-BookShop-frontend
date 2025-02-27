import { Button, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBook, FaBoxOpen } from "react-icons/fa";
import { useState } from "react";
import { TUser } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { IoMdSettings } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { BiSolidBookAdd } from "react-icons/bi";

const { Sider } = Layout;

const Sidebar = ({ user }: { user: TUser }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();


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
            key: "user-management",
            icon: <UserOutlined />,
            label: <NavLink to="user-management">User Management</NavLink>,
          },
          {
            key: "order-management",
            icon: <FaBoxOpen />,
            label: <NavLink to="order-management">Order Management</NavLink>,
          },
          {
            key: "create-product",
            icon: <BiSolidBookAdd />,
            label: <NavLink to="create-product">Create Product</NavLink>,
          },
          {
            key: "product-management",
            icon: <GiBookshelf />,
            label: <NavLink to="product-management">Product Management</NavLink>,
          },
        ]
      : [
        {
          key: "order-history",
          icon: <FaBoxOpen  />,
          label: <NavLink to="order-history">Order History </NavLink>,
        },
        {
          key: "update-password",
          icon: <IoMdSettings  />,
          label: <NavLink to="update-password">Update Password</NavLink>,
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
          minHeight: "100vh",
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
        <Menu mode="inline" defaultSelectedKeys={[location.pathname.split("/dashboard/")[1]]} items={items} />
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
