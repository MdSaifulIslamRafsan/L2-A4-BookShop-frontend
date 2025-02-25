import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Select,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Slider,
  Pagination,
} from "antd";
import { useGetProductsQuery } from "../redux/features/Products/ProductsApi";
import { TProduct } from "../types";
import CardLoading from "../component/Loading/CardLoading";

const { Title, Text } = Typography;

const Products = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);

  const products = useMemo(() => data?.data || [], [data?.data]);
  const categories = [
    "All Categories",
    ...new Set(products.map((product: TProduct) => product.category)),
  ];
  const authors = [
    "All Authors",
    ...new Set(products.map((product: TProduct) => product.author)),
  ];
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterAuthor, setFilterAuthor] = useState("All Authors");
  const [priceRange, setPriceRange] = useState([10, 50]);
  const [maxPriceRange, setMaxPriceRange] = useState(0);
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [availability, setAvailability] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product: TProduct) => product.price);
      setMinPriceRange(Math.min(...prices));
      setMaxPriceRange(Math.max(...prices));
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [products]);
  const filteredProducts = products.filter((product: TProduct) => {
    return (
      (search === "" ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.author.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())) &&
      (filterCategory === "All Categories" ||
        product.category === filterCategory) &&
      (filterAuthor === "All Authors" || product.author === filterAuthor) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (availability === "all" ||
        (availability === "available" && product.inStock) ||
        (availability === "unavailable" && !product.inStock))
    );
  });
  if (isLoading) {
    return <CardLoading></CardLoading>;
  }

  const paginateProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div style={{ paddingTop: "100px", paddingBottom: "90px",    maxWidth: "1720px",
      margin: "0 auto", }}>
      <Row gutter={[32, 32]}>
        {/* Filter Section (Left Side) */}
        <Col xs={24} sm={8} md={6}>
          <Card
            hoverable
            title={<span style={{ fontSize: "28px" }}>Filters</span>}
            bordered={true}
            style={{
              position: "sticky",
              top: "100px",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <Input
                placeholder="Search by title , category or author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "20px",  padding: "10px 0" }}>
              <Select
                value={filterCategory}
                onChange={setFilterCategory}
                style={{ width: "100%" }}
              >
                {categories.map((category) => (
                  <Select.Option key={category as string} value={category}>
                    {category as string}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Select
                value={filterAuthor}
                onChange={setFilterAuthor}
                style={{ width: "100%" }}
              >
                {authors.map((author) => (
                  <Select.Option key={author as string} value={author}>
                    {author as string}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Slider
                range
                min={minPriceRange}
                max={maxPriceRange}
                value={priceRange}
                onChange={setPriceRange}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Select
                value={availability}
                onChange={setAvailability}
                style={{ width: "100%" }}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="available">Available</Select.Option>
                <Select.Option value="unavailable">Unavailable</Select.Option>
              </Select>
            </div>
          </Card>
        </Col>
        {/* Product List Section (Right Side) */}
        <Col xs={24} sm={16} md={18}>
          <div style={{ textAlign: "center" }}>
            <Row gutter={[16, 16]}>
              {paginateProducts.map((product: TProduct) => (
                <Col key={product._id} xs={24} md={12}>
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

            {filteredProducts.length === 0 && (
              <Text type="secondary">No products found!</Text>
            )}
          </div>
          <Pagination
            align="center"
            style={{
              marginTop: "50px",
            }}
            defaultCurrent={currentPage}
            onChange={handlePageChange}
            pageSize={pageSize}
            total={filteredProducts.length}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Products;
