import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, Card, Button, Row, Col, Typography, Slider } from "antd";

const { Title, Text } = Typography;

const products = [
  { id: 1, name: "React Mastery", author: "John Doe", price: 29.99, category: "Programming", available: true, image: "https://via.placeholder.com/150" },
  { id: 2, name: "JavaScript Essentials", author: "Jane Smith", price: 19.99, category: "Web Development", available: false, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Node.js in Depth", author: "Mike Johnson", price: 24.99, category: "Backend", available: true, image: "https://via.placeholder.com/150" },
  { id: 4, name: "CSS for Beginners", author: "Alice Brown", price: 15.99, category: "Design", available: true, image: "https://via.placeholder.com/150" },
  { id: 5, name: "MongoDB Guide", author: "Robert Wilson", price: 21.99, category: "Database", available: false, image: "https://via.placeholder.com/150" },
  { id: 6, name: "TypeScript Handbook", author: "Emma Watson", price: 27.99, category: "Programming", available: true, image: "https://via.placeholder.com/150" },
];

// Extract unique categories dynamically
const categories = ["All Categories", ...new Set(products.map((p) => p.category))];

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([10, 50]);
  const [availability, setAvailability] = useState("all");

  const filteredProducts = products.filter((product) => {
    return (
      (search === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.author.toLowerCase().includes(search.toLowerCase())) &&
      (filterCategory === "All Categories" || product.category === filterCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (availability === "all" || (availability === "available" && product.available) || (availability === "unavailable" && !product.available))
    );
  });

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "90px" }}>
      <Row gutter={[16, 16]}>
        {/* Filter Section (Left Side) */}
        <Col xs={24} sm={8} md={6}>
          <div style={{ position: "sticky", top: "100px" }}>
            <div style={{ marginBottom: "20px" }}>
              <Input
                placeholder="Search by title or author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Select value={filterCategory} onChange={setFilterCategory} style={{ width: "100%" }}>
                {categories.map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Slider
                range
                min={10}
                max={50}
                value={priceRange}
                onChange={setPriceRange}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Select value={availability} onChange={setAvailability} style={{ width: "100%" }}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="available">Available</Select.Option>
                <Select.Option value="unavailable">Unavailable</Select.Option>
              </Select>
            </div>
          </div>
        </Col>

        {/* Product List Section (Right Side) */}
        <Col xs={24} sm={16} md={18}>
          <div style={{ textAlign: "center" }}>
            <Row gutter={[16, 16]}>
              {filteredProducts.map((product) => (
                <Col key={product.id} xs={24} lg={12} >
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
                    <Title level={4} style={{ marginBottom: "10px", fontSize: "18px" }}>{product.name}</Title>
                    <Text strong>Author: </Text><Text>{product.author}</Text><br />
                    <Text strong>Price: </Text><Text>${product.price.toFixed(2)}</Text><br />
                    <Text strong>Category: </Text><Text>{product.category}</Text><br />
                    <Text strong>Availability: </Text><Text style={{ color: product.available ? "green" : "red" }}>{product.available ? "In Stock" : "Out of Stock"}</Text><br />
                    <Button type="primary" size="large" block onClick={() => navigate(`/products/${product.id}`)}>
                      View Details
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>

            {filteredProducts.length === 0 && <Text type="secondary">No products found!</Text>}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
