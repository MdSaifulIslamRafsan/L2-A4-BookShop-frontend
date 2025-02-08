import { Skeleton, Space } from "antd";

const Loading = ({isLoading}: {isLoading : boolean}) => {
    return (
        <Space
        direction="vertical"
        style={{ width: "100%", paddingTop: "100px" }}
        size={16}
      >
        <Skeleton loading={isLoading}>
          <h4 style={{ marginBottom: 16 }}>Loading...</h4>
        </Skeleton>
      </Space>
    );
};

export default Loading;