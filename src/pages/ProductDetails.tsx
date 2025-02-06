import { Card, Button, Typography, Row, Col } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/features/Products/ProductsApi";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);

  if (isLoading) return <p>Loading...</p>;
  const product = data?.data || {};

  return (
    <Card hoverable style={{ margin: "100px 0 70px 0", borderRadius: 10 }}>
      <Row
        gutter={[64, 32]}
        justify="center"
        align="middle"
      >
        {/* Image Section */}
        <Col xs={24} lg={12} style={{ textAlign: "center" }}>
          <img
            src={product?.image}
            alt={product.title}
            style={{ width: "60%", height: "350px", borderRadius: 8 }}
          />
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
  );
};

export default ProductDetails;
