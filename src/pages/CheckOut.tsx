import React from "react";
import { Button, Card, Row, Col, message, Table, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../redux/features/cart/cartSlice";
import { useAppSelector } from "../redux/hooks";
import BSForm from "../component/form/BSForm";
import BSInput from "../component/form/BSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TMessage } from "../types";

import { MdDelete } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { PiPlus } from "react-icons/pi";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useUserQuery } from "../redux/features/users/usersApi";
import CardLoading from "../component/Loading/CardLoading";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { data: userData, isLoading: UserLoading } = useUserQuery(user?.email, {
    skip: !user?.email,
  });




  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const totalPrice = useAppSelector(
    (state: RootState) => state.cart.totalPrice
  );
  if(UserLoading){
    return <CardLoading/>;
  }
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>
          {title}
        </div>
        )
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: number, record: any) => (
        <div style={{
          display: "flex",
         alignItems: "center",
        }}>
          <Button
            onClick={() => dispatch(decreaseQuantity(record._id))}
            disabled={text <= 1}
          >
            <FiMinus />
          </Button>
          <span style={{ margin: "0 8px" }}>{text}</span>
          <Button onClick={() => dispatch(increaseQuantity(record._id))}>
            <PiPlus />
          </Button>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Button danger onClick={() => dispatch(removeItem(record._id))}>
          <MdDelete />
        </Button>
      ),
    },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const orderPayload = {
      email: userData?.data?.email,
      name: userData?.data?.name,
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      address: data.address,
      phone: data.phone,
    };
    try {
      console.log(cartItems)
      if(cartItems.length > 0) {
        const order = await createOrder(orderPayload);
  
        if (order?.data?.data) {
          setTimeout(() => {
            message.success("Order placed successfully!");
            dispatch(clearCart());
            window.location.href = order?.data?.data;
          }, 1500);
        }
      }else{
        toast.error("Cart is empty, please add items to proceed.");
      }
    } catch (error: unknown) {
      toast.error((error as TMessage).data.message);
    }
  };

  return (
      <Card
        style={{
          margin: "80px  auto",
          width: "100%",
          maxWidth: "1720px",
        }}
      >
        <Card bordered={false}>
          <BSForm onSubmit={onSubmit}>
            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} lg={12}>
                <Card
                  type="inner"
                  style={{ marginTop: "30px" }}
                  title="Order information"
                >
                  <div style={{ marginBottom: "16px" }}>
                    <div>
                      <Form.Item label={"Name"}>
                      <Input
                        value={userData?.data?.name}
                         size="large"
                        readOnly
                      />
                      </Form.Item>
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                  <Form.Item label={"Email"}>
                      <Input
                        value={userData?.data?.email}
                         size="large"
                        readOnly
                      />
                      </Form.Item>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <BSInput
                      label={"Phone"}
                      type={"text"}
                      fieldName={"phone"}
                    />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <BSInput
                      label={"Shipping Address"}
                      type={"text"}
                      fieldName={"address"}
                    />
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card
                  type="inner"
                  style={{ marginTop: "30px" }}
                  title="Order Summary"
                >
                  {cartItems.length > 0 ? (
                    <Table
                      dataSource={cartItems}
                      columns={columns}
                      pagination={false}
                      rowKey="_id"
                      scroll={{ x: "max-content" }}
                    />
                  ) : (
                    <p>Your cart is empty</p>
                  )}
                  <h3 style={{ marginTop: "10px" }}>
                    Total: ${totalPrice.toFixed(2)}
                  </h3>
                </Card>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                >
                  Order Now
                </Button>
              </Col>
            </Row>
          </BSForm>
        </Card>
      </Card>
  );
};

export default CheckoutPage;
