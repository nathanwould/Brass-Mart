import { useQuery } from "@apollo/client";
import { Layout, Typography, Space } from "antd";
import gql from "graphql-tag";
import ProductCarousel from "../components/ProductCarousel";

export const ALL_INSTRUMENTS_QUERY = gql`
  query ALL_INSTRUMENTS_QUERY {
    products(where: {productType: {equals: "instrument"}}) {
      id
      name
      make
      model
      price
      status
      photos {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Index() {
  const {data, error, loading} = useQuery(ALL_INSTRUMENTS_QUERY)
  const { Content } = Layout;
  const { Title, Paragraph } = Typography;
  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <Content
        className="site-layout-background"
      >
        <Space
          className="welcome-message"
          direction="vertical"
          style={{
            marginBottom: "4em"
          }}
        >
          <Title style={{ marginBottom: "0" }}>Welcome to Brass Mart!</Title>
          <Title level={3} style={{ marginTop: '.5em'}}>A demo webstore</Title>
          <Paragraph>Please whatever you do don't enter your actual credit card information.</Paragraph>
        </Space>
        <div
          // style={{
          //   height: '10em',
          //   width: "100%",
          //   backgroundImage: `url("https://i.imgur.com/vkuNeWU.png")`,
          //   backgroundPosition: "center",
          //   marginBottom: '4em',
          // }}
        >
        </div>
        {data && <ProductCarousel products={data.products} />}
      </Content>
    </Layout>
  );
}
