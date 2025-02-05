import { Button, Row, Card, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

import BSForm from "../component/form/BSForm";
import BSInput from "../component/form/BSInput";

const { Title } = Typography;

const Signup = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <Row align="middle" justify="center" style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" , padding: "140px 0 90px 0" }}>
      <Card
        style={{
          width: 400,
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",

        }}
      >
        <Title level={2} style={{ textAlign: "center", margin: "0 0 20px 0", color: "#1890ff" }}>
          Sign Up
        </Title>

        <BSForm onSubmit={onSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <BSInput label={"Full Name"} type={"text"} fieldName={"name"} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <BSInput label={"Email"} type={"text"} fieldName={"email"} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <BSInput label={"Password"} type={"password"} fieldName={"password"} />
          </div>


          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </BSForm>
      </Card>
    </Row>
  );
};

export default Signup;
