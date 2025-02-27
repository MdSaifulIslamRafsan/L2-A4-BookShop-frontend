import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Typography,
  Upload,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import BSForm from "../../component/form/BSForm";
import BSInput from "../../component/form/BSInput";
import { useCreateProductMutation } from "../../redux/features/Products/ProductsApi";
import axios from "axios";
import { TMessage } from "../../types";

const { Title } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const CreateProduct = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string | null>(null);
  const { reset } = useForm();
  const [createProduct] = useCreateProductMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!imageUrl) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    try {
      const productData = {
        ...data,
        image: imageUrl,
        price: Number(data.price),
        quantity: Number(data.quantity),
        inStock: data.quantity > 0 ? true : false,
      };
      const response = await createProduct(productData).unwrap();
      toast.success(response.message);
      reset();
      setIsUploading(false);
      setImageUrl(null);
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  const handleImageUpload = async (info: any) => {
    const file = info.file;

    // Validate file type
    const isValidFileType =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
    if (!isValidFileType) {
      toast.error("You can only upload JPG, PNG, or GIF files!");
      return;
    }

    if (file.status === "uploading") {
      setIsUploading(true);
      toast.info("Uploading image...");
    }

    try {
      const formData = new FormData();
      formData.append("image", file.originFileObj);

      // Upload to ImgBB
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.data.display_url) {
        setImageUrl(response.data.data.display_url);
        setImageName(file.name);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Row
      align="middle"
      justify="center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 800,
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Product
        </Title>

        {/* Drag and Drop Image Upload */}
        <Dragger
          name="image"
          showUploadList={false}
          onChange={handleImageUpload}
          accept=".jpg,.png,.gif"
          disabled={isUploading}
          style={{ marginBottom: "20px" }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click or Drag Image to Upload</p>
          <p className="ant-upload-hint">Supports JPG, PNG, and GIF formats.</p>
        </Dragger>

        {/* Display uploaded image preview */}
        {imageUrl && (
          <div style={{ marginBottom: "20px" }}>
            <p>{imageName}</p>
          </div>
        )}

        {/* Product Form */}
        <BSForm onSubmit={onSubmit}>
          <Row gutter={[16, 16]}>
            {/* Left Column */}
            <Col xs={24} sm={24} md={12}>
              <BSInput label="Title" type="text" fieldName="title" />
              <BSInput label="Author" type="text" fieldName="author" />
              <BSInput label="Price" type="number" fieldName="price" />
            </Col>

            {/* Right Column */}
            <Col xs={24} sm={24} md={12}>
              <BSInput label="Quantity" type="number" fieldName="quantity" />
              <BSInput label="In Stock" type="text" fieldName="inStock" />
              <label htmlFor="category">Category</label>
              <Controller
                name="category"
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Select a category"
                    style={{ width: "100%", marginTop: "8px" }}
                  >
                    <Option value="Fiction">Fiction</Option>
                    <Option value="Science">Science</Option>
                    <Option value="SelfDevelopment">Self Development</Option>
                    <Option value="Poetry">Poetry</Option>
                    <Option value="Religious">Religious</Option>
                  </Select>
                )}
              />
            </Col>
          </Row>

          {/* Description Field */}
          <Controller
            name="description"
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Description"
                rows={4}
                style={{ marginTop: "16px" }}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginTop: "16px" }}
            disabled={isUploading}
          >
            {isUploading ? "Uploading Image..." : "Create Product"}
          </Button>
        </BSForm>
      </Card>
    </Row>
  );
};

export default CreateProduct;
