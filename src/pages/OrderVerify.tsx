import { Button, Card, Descriptions } from "antd";
import { useGetOrderQuery, useVerifyOrderQuery } from "../redux/features/order/orderApi";
import { Link, useLocation } from "react-router-dom";
import CardLoading from "../component/Loading/CardLoading";
import { useState, useEffect } from "react";

type  TProduct = {
  _id: string;
  product: {
    title: string;
  };
  quantity: number;
}
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OrderVerificationPage = () => {
  const query = useQuery();
  const order_id = query.get("order_id");

  const { data, error, isLoading } = useVerifyOrderQuery(order_id);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (data?.data?.[0]?.customer_order_id) {
      setOrderId(data.data[0].customer_order_id);
    }
  }, [data]);

  const {
    data: order_Data,
    error: orderError,
    isLoading: orderIsLoading,
  } = useGetOrderQuery(orderId, { skip: !orderId });

  console.log(order_Data);

  if (isLoading || orderIsLoading) {
    return <CardLoading />;
  }
  if (error || orderError) {
    return <div>Error fetching order data</div>;
  }

  const orderData = order_Data?.data;

  return (
    <div style={{ maxWidth: "1720px", margin: "80px auto"}}>
      <Card>
        <Descriptions title="Order Details" bordered column={1}>
          <Descriptions.Item label="Order ID">{orderData?._id || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Email">{orderData?.email || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Status">{orderData?.status || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Payment Method">{orderData?.transaction?.method || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Transaction Date">{orderData?.transaction?.date_time || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="SP Code">{orderData?.transaction?.sp_code || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="SP Message">{orderData?.transaction?.sp_message || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Phone">{orderData?.phone || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Address">{orderData?.address || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Items">
            {orderData?.products?.length > 0 ? (
              orderData.products.map((product : TProduct) => (
                <div key={product._id} style={{ marginBottom: "10px" }}>
                  {product?.product?.title || "N/A"} - Quantity: {product?.quantity || "N/A"}
                </div>
              ))
            ) : (
              "No items found"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Total Price">${orderData?.totalPrice || "0"}</Descriptions.Item>
        </Descriptions>
        <div>

        <Link style={{
          marginTop: "20px",
          display: "block",
          width: "100%",
          
        }} to="/dashboard/order-history"><Button type="primary">View All orders</Button></Link>
        </div>
      </Card>
    </div>
  );
};

export default OrderVerificationPage;
