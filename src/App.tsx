import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./component/share-page/Navbar";
import ResponsiveFooter from "./component/share-page/ResponsiveFooter";

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
          style={{
            position: "fixed",
            top: 0,
            zIndex: 1,
            width: "100%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Navbar></Navbar>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 380,
            }}
          >
            Content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#fff",
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
