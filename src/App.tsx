import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./component/share-page/Navbar";

function App() {
  return (
    <>
      <Layout
        style={{
          minHeight: "300vh",

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
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default App;
