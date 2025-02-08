import { Skeleton, Space, Card } from "antd";

const CardLoading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", paddingTop: "100px", paddingBottom: "70px" }}
      size={16}
    >
      <Card >
        <Skeleton loading={isLoading} active>
          <h4 style={{ marginBottom: 16 }}>Loading...</h4>
        </Skeleton>
      </Card>
    </Space>
  );
};

export default CardLoading;
