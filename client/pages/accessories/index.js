import { useQuery } from "@apollo/client";
import { Breadcrumb, Layout, Typography, Skeleton, Card } from "antd";
import gql from "graphql-tag";
import Products from "../../components/Products";

export const ALL_ACCESSORIES_QUERY = gql`
  query ALL_ACCESSORIES_QUERY {
    products( where : { productType: { equals: "accessory"}}) {
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

export default function AccessoriesPage() {
  const { data, loading, error } = useQuery(ALL_ACCESSORIES_QUERY);
  const { Content } = Layout;
  const { Meta } = Card;
  const { Title } = Typography;
  console.log(data)
  return (
    <Layout style={{height: "100%"}}>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
        <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item>Accessories</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background">
        <div
          className='category-container'
          style={{
          display: 'flex',
          flexDirection: "column",
        }}
        >
          <h2>Shop Accessories By Category:</h2>
          <div
            className="category-buttons"
            style={{
            marginTop: "2vh",
            display: "flex",
            margin: "1rem 0 2rem"
          }}>
          <a
              className=""
              href='/accessories/cases'
            >
              <Card
                hoverable
                className="category-card">
            <Card.Meta title="Cases" style={{textAlign: 'center'}} />
          </Card>
          </a>
          <a
              className=""
              href='/accessories/maintenance'
          >
            <Card
              hoverable
              className="category-card"
            >
              <Card.Meta title="Care & Cleaning" style={{textAlign: 'center'}} />
            </Card>
          </a>
          <a
              className=""
              href='/accessories/mouthpieces'
          >
            <Card
              hoverable
              className="category-card"
            >
              <Card.Meta title="Mouthpieces" style={{textAlign: 'center'}} />
            </Card>
          </a>
        </div>
      </div>
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
  );
}
