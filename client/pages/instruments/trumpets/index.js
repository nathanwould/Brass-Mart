import { Layout, Breadcrumb, Card, Skeleton, Typography } from "antd";
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
  const { Meta } = Card;
  const { Title } = Typography;
  return (
    <Layout style={{ width: "100%" }}>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
      <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/instruments">Instruments</a></Breadcrumb.Item>
        <Breadcrumb.Item>Trumpets</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background" >
      <div style={{
        height: "10rem",
        width: "100%",
        backgroundImage: `url("https://i.imgur.com/Pdc8w9p.jpg")`,
        backgroundPosition: 'center',
        marginBottom: '2em',
        }}>
          <Title
            style={{
              padding: '1rem',
              color: "white",
            }}
          >
            Trumpets
          </Title>
      </div>
      {!!data ? !!data.products.length ?
            <Products products={data.products} />
              : <p className="out-of-stock-message">
              No trupets in stock!
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