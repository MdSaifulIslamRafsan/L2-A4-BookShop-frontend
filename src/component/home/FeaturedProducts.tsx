import { Card, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/Products/ProductsApi";
import { Product } from "../../types";

const { Title, Text } = Typography;
const FeaturedProducts = () => {
  const navigate = useNavigate();
  const {data , isLoading} = useGetProductsQuery(undefined);
  if (isLoading) return <div>Loading...</div>;
  const featuredProducts = data?.data || [];

  

  return (
    <div style={{ paddingTop: "70px", textAlign: "center" }}>
      <Title level={2} style={{ marginBottom: "20px" }}>
        Featured Products
      </Title>
      <Row gutter={[16, 16]} >
        {featuredProducts?.slice(0,6).map((product : Product) => (
          <Col key={product._id} xs={24} sm={12} md={8} >
            <Card
              hoverable
              cover={<img style={{
                height: "300px",
              }}  alt={product.title} src={product.image} />}
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                textAlign: "left",
                padding: "20px",
              }}
            >
              <Title level={4} style={{ marginBottom: "10px", fontSize: "18px" }}>
                {product.title}
              </Title>
              <div style={{ marginBottom: "10px" }}>
                <Text strong>Author: </Text>
                <Text>{product.author}</Text>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Text strong>Price: </Text>
                <Text>{product.price}</Text>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <Text strong>Category: </Text>
                <Text>{product.category}</Text>
              </div>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigate(`/products/${product._id}`)}
              >
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: "50px" }}
        onClick={() => navigate("/products")}
      >
        View All
      </Button>
    </div>
  );
};

export default FeaturedProducts;
