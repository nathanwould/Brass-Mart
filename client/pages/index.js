import { useQuery } from "@apollo/client";
import { Layout } from "antd";
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
  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>
  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <Content className="site-layout-background">
        <div
          className="welcome-message"
          style={{
            marginBottom: "10vh"
          }}
        >
          <h2 style={{ marginBottom: "0" }}>Welcome to Brass Mart!</h2>
          <h3>A demo webstore</h3>
          <p>Please for the love of God don't enter your actual credit card information.</p>
        </div>
        {data && <ProductCarousel products={data.products} />}
      </Content>
    </Layout>
  );
}
