import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import ProtectedRoute from "../ProtectedRoute";
import { Outlet } from "react-router-dom";


const { Content, Footer, Header } = Layout;

// Sidebar Menu Items


const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  console.log(user); 
  return (
    <ProtectedRoute>
    <Layout style={{ minHeight: "100vh" }}>
      { user && <Sidebar user={user}></Sidebar>}

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
         {user?.role === "user" ? "User" : "Admin"} Dashboard
        </Header>

        {/* Content */}
        <Content style={{ flex: 1, padding: "16px" }}>
          <div
            style={{
              borderRadius: "8px",
            }}
          >
            <Outlet/>
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center", padding: "0px " }}>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
        © {new Date().getFullYear()} Bookstore. All Rights Reserved.
      </div>
        </Footer>
      </Layout>
    </Layout>
    </ProtectedRoute>
  );
};

export default Dashboard;
