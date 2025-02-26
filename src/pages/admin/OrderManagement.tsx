import React from "react";
import { useSelector } from "react-redux";
import { Table, Space, Button, Select, Modal } from "antd";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApi";
import { TMessage, TOrder } from "../../types";
import TableLoading from "../../component/Loading/TableLoading";
import { toast } from "sonner";

const { Option } = Select;

type TProduct = {
  _id: string;
  product: {
    title: string;
  };
  quantity: number;
};

const OrderManagement: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, refetch  } = useGetOrdersQuery(user?.email, {
    skip: !user?.email,
  });
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation(); 
  if (isLoading) {
    return <TableLoading />;
  }

  const handleDelete = async (orderId: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content:
        "Do you really want to delete this order? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await deleteOrder(orderId);
          if (res?.data?.success) {
            toast.success(res?.data?.message);
            refetch()
          }else{
            toast.error(res?.data?.message);
          }
        } catch (error) {
          toast.error((error as TMessage)?.data?.message);
        }
      },
    });
  };

  const handleStatusChange = async (value: string, orderId: string) => {
    try {
      const res = await updateOrderStatus({ orderId, status: value });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        refetch();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error((error as TMessage)?.data?.message);
    }
  };

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
      render: (status: string, record: TOrder) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record._id)}
        >
          <Option value="Paid">Paid</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
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
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TOrder) => (
        <Button type="primary" danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
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

export default OrderManagement;
