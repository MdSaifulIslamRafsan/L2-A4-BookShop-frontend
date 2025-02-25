import { Card, Descriptions, Button, Space } from "antd";
import {
  useGetOrderQuery,
  useVerifyOrderQuery,
} from "../redux/features/order/orderApi";
import { useLocation } from "react-router-dom";
import CardLoading from "../component/Loading/CardLoading";
import { useState, useEffect } from "react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OrderVerificationPage = () => {
  const query = useQuery();
  const order_id = query.get("order_id");

  const { data, error, isLoading } = useVerifyOrderQuery(order_id);
  
  // State to hold the actual orderId
  const [orderId, setOrderId] = useState("");

  // Extract customer_order_id once data is available
  useEffect(() => {
    if (data?.data?.[0]?.customer_order_id) {
      setOrderId(data.data[0].customer_order_id);
    }
  }, [data]); // Runs only when `data` changes

  const {
    data: order_Data,
    error: orderError,
    isLoading: orderIsLoading,
  } = useGetOrderQuery(orderId, { skip: !orderId });

  console.log(order_Data);

  // Handle loading and error states before rendering anything else
  if (isLoading || orderIsLoading) {
    return <CardLoading />;
  }
  if (error || orderError) {
    return <div>Error fetching order data</div>;
  }

  const orderData = data?.data?.[0];
  console.log({ orderData });

  return (
    <div style={{ maxWidth: "1720px", margin: "80px auto", padding: "20px" }}>
      <Card>
        <Descriptions title="Order Details" bordered column={1}>
          <Descriptions.Item label="Order ID">
            {orderData?.order_id}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {orderData?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            { order_Data?.data?.status }
          </Descriptions.Item>
          <Descriptions.Item label="Items">
            {orderData ? (
              <div>
                <div>Item: {orderData.method}</div>
                <div>Amount: {orderData.amount}</div>
              </div>
            ) : (
              "No items found"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Total">
            {orderData?.payable_amount}
          </Descriptions.Item>
        </Descriptions>
        <Space style={{ marginTop: "20px" }}>
          <Button type="primary">Proceed</Button>
          <Button>Back</Button>
        </Space>
      </Card>
    </div>
  );
};

export default OrderVerificationPage;
