import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa"; // Import React Icons

const quickLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/books", label: "Books" },
];
const socialLinks = [
  { platform: "Facebook", url: "https://facebook.com", icon: <FaFacebook /> },
  { platform: "Twitter", url: "https://twitter.com", icon: <FaTwitter /> },
  {
    platform: "Instagram",
    url: "https://instagram.com",
    icon: <FaInstagram />,
  },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedin /> },
  { platform: "YouTube", url: "https://youtube.com", icon: <FaYoutube /> },
];

const ResponsiveFooter = () => {
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{ maxWidth: "1720px", margin: "0 auto", width: "100%", padding: "40px 0px" }}
        justify="center"

      >
        {/* About Section */}
        <Col
          style={{
            padding: "0",
          }}
          xs={24}
          md={8}
          lg={6}
        >
          <h3
            className="font-open-sans"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            About Us
          </h3>
          <p className="font-open-sans">We provide the best book collections for your reading journey.</p>
        </Col>

        {/* Quick Links */}
        <Col
          style={{
            padding: "0",
          }}
          xs={24}
          md={8}
          lg={6}
        >
          <h3
            className="font-open-sans"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  style={{ color: "#000", textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#1677ff";
                    target.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#000";
                    target.style.textDecoration = "none";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Col>

        

        {/* Contact Section */}
        <Col
          style={{
            padding: "0",
          }}
          xs={24}
          md={8}
          lg={6}
        >
          <h3
            className="font-open-sans"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Contact Us
          </h3>
          <p className="font-open-sans">Email: info@bookshop.com</p>
          <p className="font-open-sans">Phone: +123 456 7890</p>
        </Col>
        {/* Social Media Icons Section */}
        <Col style={{ padding: "0" }} xs={24} md={8} lg={6}>
          <h3
            className="font-open-sans"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Follow Us
          </h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px" }}>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                target="_blank"
                style={{ fontSize: "24px", color: "#000" }}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </Col>
      </Row>

      {/* Copyright */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        © {new Date().getFullYear()} Bookstore. All Rights Reserved.
      </div>
    </>
  );
};

export default ResponsiveFooter;
