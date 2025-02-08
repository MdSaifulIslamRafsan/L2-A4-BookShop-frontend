import { Card, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/Products/ProductsApi";
import { TProduct } from "../../types";
import CardLoading from "../Loading/CardLoading";

const { Title, Text } = Typography;
const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsQuery(undefined);
  if (isLoading) {
    return <CardLoading isLoading={isLoading}></CardLoading>;
  }
  const featuredProducts = data?.data || [];

  return (
    <div style={{ paddingTop: "70px", textAlign: "center" }}>
      <Title level={2} style={{ marginBottom: "20px" }}>
        Featured Products
      </Title>
      <Row gutter={[16, 16]}>
        {featuredProducts?.slice(0, 6).map((product: TProduct) => (
          <Col key={product._id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    background: "#F5F5F5",
                    padding: "20px",
                    borderRadius: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "60%",
                      height: "100%",
                      borderRadius: 8,
                    }}
                    alt={product.title}
                    src={product.image}
                  />
                </div>
              }
              style={{
                width: "100%",
                textAlign: "left",
                padding: "20px",
              }}
            >
              <Title
                level={4}
                style={{ marginBottom: "10px", fontSize: "18px" }}
              >
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
