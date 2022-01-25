import { Layout, Breadcrumb, Card, Skeleton } from "antd";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Products from "../../../components/Products";

export const ALL_MOUTHPIECES_QUERY = gql`
  query ALL_MOUTHPIECES_QUERY {
    products(where: {category: {equals: "mouthpiece"}}) {
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

export default function MouthpiecePage() {
  const { Content } = Layout;
  const { data, error, loading } = useQuery(ALL_MOUTHPIECES_QUERY);
  const { Meta } = Card;
  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>
  return (
    <Layout style={{ width: "100%" }}>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
        <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/accessories">Accessories</a></Breadcrumb.Item>
        <Breadcrumb.Item>Mouthpieces</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background" >
      {!!data ? !!data.products.length ?
          <Products products={data.products} />
            : <p className="out-of-stock-message">
            No mouthpieces in stock!
          </p>
            :
          <Card className="skeleton-card">
            <Skeleton
              active
              loading={true}
            >
              <Skeleton.Image />
                <Meta
                  title="Card Title"
                  description="This is the description"
                />
              </Skeleton>
            </Card>
            }
      </Content>
    </Layout>
  );
}