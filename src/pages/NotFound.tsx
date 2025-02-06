import { Layout, Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const NotFound = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={1} style={{ fontSize: "4rem", color: "#1890ff" }}>
            404
          </Title>
          <Paragraph style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
            Oops! The page you’re looking for doesn’t exist.
          </Paragraph>
          <Link to="/">
            <Button type="primary" size="large">
              Go Back Home
            </Button>
          </Link>
        </div>
      </Content>
    </Layout>
  );
};

export default NotFound;
