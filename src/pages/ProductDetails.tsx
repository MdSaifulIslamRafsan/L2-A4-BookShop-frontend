import { Card, Button, Typography, Row, Col } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/features/Products/ProductsApi";
import CardLoading from "../component/Loading/CardLoading";
import ProtectedRoute from "../component/layout/ProtectedRoute";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);

  if (isLoading) {
    return <CardLoading isLoading={isLoading}></CardLoading>;
  }
  const product = data?.data || {};

  return (
    <ProtectedRoute>
      <Card style={{ margin: "100px 0 70px 0", borderRadius: 10 }}>
        <Row gutter={[64, 32]} justify="center" align="middle">
          {/* Image Section */}
          <Col xs={24} lg={12} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                height: "400px",
                background: "#F5F5F5",
                padding: "20px",
                borderRadius: 8,
              }}
            >
              <img
                src={product?.image}
                alt={product.title}
                style={{
                  width: "60%",
                  height: "100%",
                  borderRadius: 8,
                }}
              />
            </div>
          </Col>

          {/* Product Details */}
          <Col xs={24} lg={12}>
            <Title level={3}>{product.title}</Title>
            <Text strong>Author: {product.author}</Text>
            <p style={{ marginTop: 10 }}>{product.description}</p>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Price: ${product.price}
            </Text>
            <br />
            <Link to={"/checkout"}>
              <Button type="primary" block style={{ marginTop: 15 }}>
                Buy Now
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </ProtectedRoute>
  );
};

export default ProductDetails;
