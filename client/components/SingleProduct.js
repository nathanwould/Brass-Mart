import { useQuery } from "@apollo/client";
import { Breadcrumb, Layout, Typography, Image, Carousel, Space, Icon } from "antd";
import gql from "graphql-tag";
import formatBreadcrumb from "../lib/formatBreadcrumb";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      make
      model
      category
      productType
      instrumentType
      bellSize
      boreSize
      instrumentKey
      description
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

export default function SingleProduct({ id }) {
  const { Content } = Layout;
  const { Title, Text, Paragraph } = Typography;
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  const product = data?.product;
  console.log(product)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const categoryLink = product?.productType === "instrument" ? "instruments" : "accessories";
  const category = formatBreadcrumb(product?.category);
  return (
    <Layout>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
        <Breadcrumb.Item >
          <a
            href={`/${categoryLink}`}>
            {formatBreadcrumb(categoryLink)}
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            href={`/${categoryLink}/${product.category}s`}>
            {`${category}s`}
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {formatBreadcrumb(product?.name)}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background product-details">
        <Space direction="vertical">
          <Title>{product.name}</Title>
          <Space wrap>
            <Carousel
              className="single-product-carousel"
              arrows={true}
              prevArrow={<LeftOutlined id="left-arrow"/>}
              nextArrow={<RightOutlined id="right-arrow" />}
              // style={{
              //   height: "50vh",
              //   width: "75vh",
              //   maxWidth: '100%'
              // }}
            >
              {product.photos.map((photo, index) => (
                // <div key={index}>
                  <Image
                  className="single-product-image"
                  key={index}
                    alt={photo.image.alt}
                    src={photo.image.publicUrlTransformed}
                    style={{
                      height: "50vh",
                      width: "80vh",
                      objectFit: "cover",
                    }}
                  />
                // </div>
              ))}
            </Carousel>
            <Space
              direction="vertical"
              style={{
                maxWidth: "60vh"
              }}
            >
              <Text><Text strong>Maker:</Text> {product.make}</Text>
              <Text><Text strong>Model:</Text> {product.model}</Text>
              <Text><Text strong>Bore Size:</Text> {product.boreSize}"</Text>
              <Text><Text strong>Bell Diameter:</Text> {product.bellSize}"</Text>
              <Paragraph>{product.description}</Paragraph>
              <Title level={5}>{formatMoney(product.price)}</Title>
              <AddToCart id={product.id}/>
            </Space>
          </Space>
        </Space>
      </Content>
    </Layout>
  )
}