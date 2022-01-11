import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Products from "../../components/Products";
import { Layout, Breadcrumb, Skeleton, Card } from "antd";
import InstrumentCategories from "../../components/InstrumentCategories";

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
  const { Meta } = Card;
  return (
    <Layout>
      <Layout style={{height: "100%"}}>
          <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
            <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
            <Breadcrumb.Item>Instruments</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="site-layout-background" >
            <InstrumentCategories />
            {!!data ? !!data?.products?.length ?
            <Products products={data.products} />
              : <p className="out-of-stock-message">
              No instruments in stock!
            </p>
              :
            <Card className="skeleton-card">
              <Skeleton.Image
              />
                <Skeleton active loading={true}>
                  <Meta
                    title="Card Title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
              }
          </Content>
      </Layout>
    </Layout>
  );
}