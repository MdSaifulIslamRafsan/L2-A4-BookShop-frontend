import { Skeleton, Space, Card } from "antd";

const TableLoading = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", }}
      size={16}
    >
      <Card>
        <Skeleton active title paragraph={{ rows: 2 }} />
      </Card>
    </Space>
  );
};

export default TableLoading;
