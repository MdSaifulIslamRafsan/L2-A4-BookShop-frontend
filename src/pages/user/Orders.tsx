import React from "react";
import { useSelector } from "react-redux";
import { Table, Space, Tag } from "antd";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetOrdersByEmailQuery } from "../../redux/features/order/orderApi";
import { TOrder } from "../../types";
import TableLoading from "../../component/Loading/TableLoading";
type  TProduct = {
    _id: string;
    product: {
      title: string;
    };
    quantity: number;
  }


const Orders: React.FC = () => {
  const user = useSelector(selectCurrentUser);

  const { data, isLoading} = useGetOrdersByEmailQuery(user?.email, {
    skip: !user?.email, 
  });
  if (isLoading) {return <TableLoading></TableLoading>;}

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: ["transaction", "id"],
      key: "transactionId",
    },
   
    {
      title: "Products Name",
      dataIndex: "products",
      key: "products",
      render: (products: TProduct[]) => (
        <div>
          {products.map((product) => (
            <div key={product._id}>{product?.product?.title}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "products",
      key: "quantity",
      render: (products: TProduct[]) => (
        <div>
          {products.map((product) => (
            <div key={product._id}>{product?.quantity}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
        title: "Payment Method",
        dataIndex: ["transaction", "method"],
        key: "paymentMethod",
      },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "gray";
  
        if (status === "Paid") {
          color = "green";
        } else if (status === "Pending") {
          color = "orange";
        } else if (status === "Cancelled") {
          color = "red";
        }
  
        return <Tag color={color}>{status}</Tag>;
      },
  
    },
    {
      title: "Order At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        const date = new Date(createdAt);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Table<TOrder>
        columns={columns}
        dataSource={data?.data || []}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </Space>
  );
};

export default Orders;
