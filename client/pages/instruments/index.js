import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Products from "../../components/Products";
import { Layout, Breadcrumb } from "antd";
import InstrumentCategories from "../../components/InstrumentCategories";
// import ProductCarousel from "../../components/ProductCarousel";

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

export default function InstrumentsPage() {
  const { Content } = Layout;
  const { data, error, loading } = useQuery(ALL_INSTRUMENTS_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  // console.log(data);
  return (
    <Layout>
      <Layout style={{height: "100%"}}>
          <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Instruments</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="site-layout-background" >
            <InstrumentCategories />
            {!!data.products.length ?
          <Products products={data.products} />
            : <p className="out-of-stock-message">
            No horns in stock!
          </p>
        }
          </Content>
      </Layout>
    </Layout>
  );
}