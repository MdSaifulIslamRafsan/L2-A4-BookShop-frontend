import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./component/share-page/Navbar";
import ResponsiveFooter from "./component/share-page/ResponsiveFooter";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",

          overflow: "hidden",
        }}
      >
        <Header
          className="p-main"
          style={{
            position: "fixed",
            top: 0,
            zIndex: 9999,
            padding: "0",
            width: "100%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Navbar></Navbar>
        </Header>
        <Content  className="p-main">
           <Outlet></Outlet>
        </Content>
        <Footer
        className="p-main"
          style={{
            textAlign: "center",
            background: "#fff",
            padding: "0",
            width: "100%",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ResponsiveFooter></ResponsiveFooter>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
