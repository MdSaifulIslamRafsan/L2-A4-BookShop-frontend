import { Button, Row, Card, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BSForm from "../../component/form/BSForm";
import BSInput from "../../component/form/BSInput";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { TMessage } from "../../types";

const { Title } = Typography;

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { oldPassword, newPassword, confirmNewPassword } = data;

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password updated successfully");

      navigate("/sign-in");
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  return (
    <Row align="middle" justify="center" style={{ height: "85vh" }}>
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
          Update Password
        </Title>

        <BSForm onSubmit={onSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <BSInput
              label={"Old Password"}
              type={"password"}
              fieldName={"oldPassword"}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <BSInput
              label={"New Password"}
              type={"password"}
              fieldName={"newPassword"}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <BSInput
              label={"Confirm New Password"}
              type={"password"}
              fieldName={"confirmNewPassword"}
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

export default UpdatePassword;
