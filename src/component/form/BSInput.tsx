import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type TBSInput = {
  type: string;
  fieldName: string;
  label?: string;
  placeholder?: string
};

const BSInput = ({ type, fieldName, label , placeholder}: TBSInput) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={fieldName}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type === "password" && !visible ? "password" : "text"}
              id={fieldName}
              name={fieldName}
              placeholder={placeholder}
              required
              size="large"
              suffix={
                type === "password" ? (
                  <span onClick={() => setVisible(!visible)} style={{ cursor: "pointer" }}>
                    {visible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                ) : null
              }
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BSInput;
