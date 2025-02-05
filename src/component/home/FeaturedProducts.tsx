import { Card, Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const featuredProducts = [
  {
    id: 1,
    name: "React Mastery",
    author: "John Doe",
    price: "$29.99",
    category: "Programming",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "JavaScript Essentials",
    author: "Jane Smith",
    price: "$19.99",
    category: "Web Development",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Node.js in Depth",
    author: "Mike Johnson",
    price: "$24.99",
    category: "Backend",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "CSS for Beginners",
    author: "Alice Brown",
    price: "$15.99",
    category: "Design",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "MongoDB Guide",
    author: "Robert Wilson",
    price: "$21.99",
    category: "Database",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "TypeScript Handbook",
    author: "Emma Watson",
    price: "$27.99",
    category: "Programming",
    image: "https://via.placeholder.com/150",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: "70px", textAlign: "center" }}>
      <Title level={2} style={{ marginBottom: "20px" }}>
        Featured Products
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {featuredProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} >
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                textAlign: "left",
                padding: "20px",
              }}
            >
              <Title level={4} style={{ marginBottom: "10px", fontSize: "18px" }}>
                {product.name}
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
                onClick={() => navigate(`/product/${product.id}`)}
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
        onClick={() => navigate("/all-products")}
      >
        View All
      </Button>
    </div>
  );
};

export default FeaturedProducts;
