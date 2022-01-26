import { Layout, Breadcrumb, Skeleton, Card, Typography } from "antd";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Products from "../../../components/Products";

export const ALL_HORNS_QUERY = gql`
  query ALL_HORNS_QUERY {
    products(where: {category: {equals: "horns"}}) {
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

export default function HornPage() {
  const { Content } = Layout;
  const { data, error, loading } = useQuery(ALL_HORNS_QUERY);
  const { Meta } = Card;
  const { Title } = Typography;
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  console.log(!!data.products.length)
  return (
    <Layout style={{ width: "100%" }}>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
      <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/instruments">Instruments</a></Breadcrumb.Item>
        <Breadcrumb.Item>Horns</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background" >
        <div style={{
          height: "10rem",
          width: "100%",
          backgroundImage: `url("https://i.imgur.com/vkuNeWU.png")`,
          backgroundPosition: 'center',
          marginBottom: '2em',
        }}>
          <Title
            style={{
              padding: '1rem',
              color: "white",
            }}
          >
            Horns
          </Title>
        </div>
        {!!data ? !!data.products.length ?
          <Products products={data.products} />
            : <p className="out-of-stock-message">
            No horns in stock!
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