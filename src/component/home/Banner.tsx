import { Button, Carousel, Col, Row, Typography } from "antd";
const { Paragraph } = Typography;

const contentStyle: React.CSSProperties = {
  minHeight: "450px",
  padding: "0",
  margin: "0",
  textAlign: "center",
  borderRadius: "15px",
};
const bannerData = [
  {
    id: 1,
    title: "Welcome to Our Store",
    description:
      "Find the best products at unbeatable prices. Shop now and enjoy great deals!",
    image:
      "https://media.istockphoto.com/id/2167759411/photo/portrait-of-an-asian-boy-studying-on-a-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_79Xe7e4tELqVExXsb_eDff_rdiTSQ269FnALg7DEU=",
  },
  {
    id: 2,
    title: "Exclusive Deals",
    description:
      "Special discounts available for a limited time. Don't miss out on our best offers!",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    title: "Fast & Secure Shipping",
    description:
      "We deliver products safely to your doorstep. Enjoy quick and reliable service!",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2t8ZW58MHx8MHx8fDA%3D",
  },
];

const Banner = () => {
  return (
    <Carousel autoplay dotPosition="bottom">
      {bannerData.map((item) => (
        <div key={item.id}>
          <div style={contentStyle}>
            <Row>
              <Col
                xs={24}
                lg={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="p-banner"
              >
                <h1 className="b-title font-open-sans">{item.title}</h1>
                <Paragraph
                  className="font-open-sans"
                  style={{ fontSize: "16px", color: "#555" }}
                >
                  {item.description}
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  style={{ marginTop: "12px" }}
                >
                  Learn More
                </Button>
              </Col>
              <Col
                xs={24}
                lg={12}
                style={{
                  height: "450px",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={item.image}
                  alt={item.title}
                />
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
