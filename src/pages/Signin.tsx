import { Button, Row, Card, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

import BSForm from "../component/form/BSForm";
import BSInput from "../component/form/BSInput";

const { Title } = Typography;

const Signin = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <Row align="middle" justify="center" style={{ height: "100vh", backgroundColor: "#f0f2f5", marginTop: "50px" }}>
      <Card 
        style={{ 
          width: 400, 
          padding: "24px", 
          borderRadius: "8px", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
          backgroundColor: "#fff" 
        }}
      >
        <Title level={2} style={{ textAlign: "center", margin: "0 0 20px 0", color: "#1890ff" }}>
          Sign In
        </Title>
        
        <BSForm onSubmit={onSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <BSInput label={"Email"} type={"text"} fieldName={"email"} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <BSInput label={"Password"} type={"password"} fieldName={"password"} />
          </div>

          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </BSForm>
      </Card>
    </Row>
  );
};

export default Signin;
