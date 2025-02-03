import { Collapse, Typography } from "antd";
const {Paragraph , Title} = Typography;

const items = [
  {
    key: "1",
    label: "How can I track my order?",
    children: (
      <p>
        You can track your order by logging into your account and visiting the
        'Order History' section.
      </p>
    ),
  },
  {
    key: "2",
    label: "What payment methods do you accept?",
    children: (
      <p>We accept credit/debit cards, PayPal, and various digital wallets.</p>
    ),
  },
  {
    key: "3",
    label: "Can I return a product if I’m not satisfied?",
    children: (
      <p>
        Yes, we offer a 30-day return policy. Please check our return policy
        page for more details.
      </p>
    ),
  },
  {
    key: "4",
    label: "Do you offer international shipping?",
    children: (
      <p>Yes, we ship worldwide. Shipping costs may vary based on location.</p>
    ),
  },
  {
    key: "5",
    label: "What are your shipping and delivery fees?",
    children: (
      <p>
        Shipping fees may vary based on location and weight of your order.
        Please check our shipping policy page for more details.
      </p>
    ),
  },
];
const Faq = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div
     className="w-faq"
      style={{
        margin: "0 auto",
        padding: "70px 0"
      }}
    >
      <div style={{
       
        margin: "0 auto",
      }}>
        <Title level={2} style={{
            textAlign: "center"
        }}  className="font-open-sans">Frequently Asked Questions</Title>
        <Paragraph style={{
            textAlign: "center"
        }}  className="font-open-sans">
          Find answers to FAQs on services, payments, and shipping, or contact support!
        </Paragraph>
      </div>
      <Collapse  className="font-open-sans" style={{
        marginTop : "40px",
      }} items={items} onChange={onChange} />
    </div>
  );
};

export default Faq;
