import { Button, Row, Card, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

import BSForm from "../component/form/BSForm";
import BSInput from "../component/form/BSInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TMessage } from "../types";



const { Title } = Typography;

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const token = res.data.accessToken;
      const user = verifyToken(token);
      dispatch(setUser({ user, token }));
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (error : unknown) {
      toast.error((error as TMessage).data.message);
    }
  };

  return (
    <Row
      align="middle"
      justify="center"
      style={{ height: "100vh", backgroundColor: "#f0f2f5", }}
    >
      <Card
        style={{
          width: 450,
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            margin: "0 0 20px 0",
            color: "#1890ff",
          }}
        >
          Sign In
        </Title>

        <BSForm onSubmit={onSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <BSInput label={"Email"} type={"text"} fieldName={"email"} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <BSInput
              label={"Password"}
              type={"password"}
              fieldName={"password"}
            />
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
