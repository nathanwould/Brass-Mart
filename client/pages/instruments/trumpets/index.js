import { Layout, Breadcrumb } from "antd";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Products from "../../../components/Products";

export const ALL_TRUMPETS_QUERY = gql`
  query ALL_TRUMPETS_QUERY {
    products(where: {category: {equals: "trumpet"}}) {
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

export default function TrumpetPage() {
  const { Content } = Layout;
  const { data, error, loading } = useQuery(ALL_TRUMPETS_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <Layout style={{ width: "100%" }}>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
      <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/instruments">Instruments</a></Breadcrumb.Item>
        <Breadcrumb.Item>Trumpets</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background" >
      {!!data.products.length ?
          <Products products={data.products} />
          : <p className="out-of-stock-message">
            No trumpets in stock!
          </p>
        }
      </Content>
    </Layout>
  );
}