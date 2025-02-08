import { Button, Drawer, Grid, Menu } from "antd";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "sonner";

const { useBreakpoint } = Grid;



const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const screens = useBreakpoint();
  const location = useLocation();
  const items = [
    { key: "/", label: <Link to="/">Home</Link> },
    { key: "/about", label: <Link to="/about">About</Link> },
    { key: "/products", label: <Link to="/products">Products</Link> },
    user && {
      key: "/dashboard",
      label: <Link to="/dashboard">Dashboard</Link> ,
    }
  ];

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out successfully")

    navigate('/sign-in')

  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: "1720px",
        margin: "0 auto",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontWeight: "bold",
          cursor: "pointer",
          display :"flex",
          alignItems: "center",
          textDecoration: "none",
          fontFamily: "Open Sans, sans-serif",
        }}
        className="font-open-sans logo"
      >
        <FaBook />
       <span>Bookstore</span>
      </Link>

      {/* Desktop Menu (Only visible on larger screens) */}
      {screens.md && (
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          className="font-open-sans"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}
      {screens.md ? (
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
           {!user ? <>
              <Link to="/sign-in">
              <Button type="primary" block>
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button type="primary" block>
                Sign Up
              </Button>
            </Link>
            </> :  <Button onClick={handleLogout} type="primary" block>
                Log Out
              </Button>}
        </div>
      ) : (
        <Button
          type="text"
          onClick={() => setOpen(true)}
          style={{ fontSize: "24px" }}
        >
          <CgMenuRightAlt />
        </Button>
      )}

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%", 
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={items}
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Buttons always at the bottom */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              paddingTop: "16px",
              borderTop: "1px solid #ddd",
            }}
          >
            {!user ? <>
              <Link to="/sign-in">
              <Button type="primary" block>
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button type="primary" block>
                Sign Up
              </Button>
            </Link>
            </> :  <Button onClick={handleLogout} type="primary" block>
                Log Out
              </Button>}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
