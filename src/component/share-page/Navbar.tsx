import { Button, Drawer, Grid, Menu } from "antd";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

const items = [
  { key: "1", label: <Link to="/">Home</Link> },
  { key: "2", label: <Link to="/about">About</Link> },
  { key: "3", label: <Link to="/books">Books</Link> },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const screens = useBreakpoint();
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
          fontSize: "24px",
          fontWeight: "bold",
          cursor: "pointer",
          display :"flex",
          alignItems: "center",
          textDecoration: "none",
          fontFamily: "Open Sans, sans-serif",
        }}
        className="font-open-sans"
      >
        <FaBook />
       <p>Bookstore</p>
      </Link>

      {/* Desktop Menu (Only visible on larger screens) */}
      {screens.md && (
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
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
          <Link to="/sign-in">
            <Button className="font-open-sans" type="primary" size={"large"}>
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button className="font-open-sans" type="primary" size={"large"}>
              Sign Up
            </Button>
          </Link>
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
              defaultSelectedKeys={["1"]}
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
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
