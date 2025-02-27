import { Typography, Card, Row, Col, Carousel } from "antd";
import {
  FaStore,
  FaUsers,
  FaStar,
  FaPhoneAlt,
  FaBullseye,
  FaEye,
  FaShoppingCart,
  FaHandshake,
} from "react-icons/fa";

const { Title, Paragraph } = Typography;

const aboutSections = [
  {
    title: "Who We Are",
    text: "Established in 2020, we have been serving thousands of happy customers with high-quality products and top-notch customer support.",
    icon: <FaStore style={{ fontSize: "30px", color: "#1890ff" }} />,
  },
  {
    title: "Our Values",
    text: "Our core values are honesty, reliability, and customer satisfaction. We strive to build trust and long-lasting relationships with our customers.",
    icon: <FaHandshake style={{ fontSize: "30px", color: "#52c41a" }} />,
  },
  {
    title: "Our Mission",
    text: "To provide top-quality products at affordable prices while ensuring an exceptional shopping experience.",
    icon: <FaBullseye style={{ fontSize: "30px", color: "#eb2f96" }} />,
  },
  {
    title: "Our Vision",
    text: "Aiming to be a top e-commerce platform, recognized for quality, trust, and innovation. Delivering exceptional products and services with reliability and excellence.",
    icon: <FaEye style={{ fontSize: "30px", color: "#faad14" }} />,
  },
  {
    title: "Why Choose Us?",
    text: "We offer a wide range of products, fast shipping, and reliable customer support to make your shopping experience smooth.",
    icon: <FaShoppingCart style={{ fontSize: "30px", color: "#13c2c2" }} />,
  },
  {
    title: "Trusted by Thousands",
    text: "Over 50,000+ satisfied customers have chosen us for their shopping needs.",
    icon: <FaUsers style={{ fontSize: "30px", color: "#1890ff" }} />,
  },
];

const reviews = [
  { text: "Great service and amazing quality!", name: "Sarah M." },
  { text: "Fast delivery and friendly support!", name: "John D." },
  { text: "Absolutely love their products!", name: "Emily R." },
  { text: "Highly recommended for quality lovers!", name: "David K." },
];

const About = () => {
  return (
    <div style={{ maxWidth: "1720px", margin: "100px auto" }}>
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <FaStore style={{ fontSize: "50px", color: "#1890ff" }} />
        <Title
          className="font-open-sans"
          level={2}
          style={{ marginTop: "10px" }}
        >
          About Our Store
        </Title>
        <Paragraph
          className="font-open-sans"
          style={{ fontSize: "16px", color: "#555" }}
        >
          We are dedicated to providing high-quality products with excellent
          customer service. Our mission is to offer the best shopping
          experience.
        </Paragraph>
      </div>

      {/* About Sections */}
      <Row gutter={[24, 24]}>
        {aboutSections.map((section, index) => (
          <Col xs={24} md={12} key={index}>
            <Card
              hoverable
              title={section.title}
              bordered={false}
              style={{
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {section.icon}
              <Paragraph
                className="font-open-sans"
                style={{ marginTop: "10px", flexGrow: 1 }}
              >
                {section.text}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Customer Reviews */}
      <div style={{ textAlign: "center", margin: "90px 0" }}>
        <Title className="font-open-sans" level={2}>
          Customer Reviews
        </Title>
        <Carousel
          autoplay
          dots={true}
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {reviews.map((review, index) => (
            <div key={index} style={{ padding: "20px" }}>
              <Card
                hoverable
                style={{
                  background: "#fff",
                  padding: "20px",
                  textAlign: "center",
                  minHeight: "150px",
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    style={{
                      fontSize: "20px",
                      color: "#FFC107",
                      marginBottom: "10px",
                      marginLeft: i === 0 ? "0" : "6px",
                    }}
                  />
                ))}

                <p style={{ fontSize: "16px", color: "#555" }}>
                  "{review.text}"
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    marginTop: "10px",
                  }}
                >
                  - {review.name}
                </p>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Contact Section */}
      <div style={{ textAlign: "center" }}>
        <FaPhoneAlt style={{ fontSize: "30px", color: "#1890ff" }} />
        <Title className="font-open-sans" level={2}>
          Contact Us
        </Title>

        <Paragraph
          className="font-open-sans"
          style={{ fontSize: "16px", color: "#555" }}
        >
          Have questions? Reach out to our support team at
          <strong> support@bookstore.com</strong> or call us at{" "}
          <strong>+123-456-7890</strong>.
        </Paragraph>
      </div>
    </div>
  );
};

export default About;