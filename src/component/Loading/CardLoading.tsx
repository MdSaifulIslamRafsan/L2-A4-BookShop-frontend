import { Skeleton, Space, Card, Row, Col } from "antd";

const CardLoading = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", paddingTop: "100px", paddingBottom: "70px" }}
      size={16}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Skeleton active title paragraph={{ rows: 2 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Skeleton active title paragraph={{ rows: 2 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Skeleton active title paragraph={{ rows: 2 }} />
          </Card>
        </Col>
       
      </Row>
    </Space>
  );
};

export default CardLoading;
