import { Card, Button, Typography, Row, Col } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../redux/features/Products/ProductsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import CardLoading from "../component/Loading/CardLoading";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return <CardLoading isLoading={isLoading}></CardLoading>;
  }
  const product = data?.data || {};

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        author: product.author,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    navigate("/checkout");
  };

  return (
      <Card
        style={{
          margin: "100px auto 70px auto",
          borderRadius: 10,
          maxWidth: "1720px",
        }}
      >
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
            <Button type="primary" block style={{ marginTop: 15 }} onClick={handleBuyNow}>
              Buy Now
            </Button>
          </Col>
        </Row>
      </Card>
  );
};

export default ProductDetails;
