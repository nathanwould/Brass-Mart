import { Layout, Breadcrumb, Card, Skeleton } from "antd";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Products from "../../../components/Products";

export const ALL_TUBAS_QUERY = gql`
  query ALL_TUBAS_QUERY {
    products(where: {category: {equals: "tuba"}}) {
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

export default function TubaPage() {
  const { Content } = Layout;
  const { data, error, loading } = useQuery(ALL_TUBAS_QUERY);
  const { Meta } = Card;
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <Layout style={{ width: "100%" }}>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
      <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/instruments">Instruments</a></Breadcrumb.Item>
        <Breadcrumb.Item>Tubas</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background" >
      <div style={{
        height: "10rem",
        width: "100%",
        backgroundImage: `url("https://i.imgur.com/vkuNeWU.png")`,
        backgroundPosition: 'center',
        marginBottom: '2em',
      }} />
      {!!data ? !!data.products.length ?
            <Products products={data.products} />
              : <p className="out-of-stock-message">
              No tubas in stock!
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