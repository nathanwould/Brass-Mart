import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Layout, Space, Table } from "antd";
import formatMoney from "../lib/formatMoney";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(where: { id: $id }) {
      id
      total
      charge
      items {
        id
        name
        price
        photos {
          altText
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function OrderDetails({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id,
    },
  })
  const orderItems = data?.order?.items
  const { Content } = Layout;
  const columns = [
    {
      dataIndex: 'photos',
      key: 'photo',
      render: photos =>
        <img
          alt={photos[0].alt}
          src={photos[0].image.publicUrlTransformed}
          style={{width: "6rem"}}
        />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => formatMoney(price)
    },
  ]
  console.log(data)
  return (
    <>
      {loading && <p>Loading...</p>}
      {/* <h1>Order #{id}</h1> */}
      {data?.order &&
        <Space
          direction="vertical"
          style={{
            background: "white",
            borderRadius: "2%",
          }}
        >
          {/* {order?.items?.map(item => (
          <Space
            key={item.id}
            align="center"
            style={{
              margin: "1vh"
            }}
          >
          <img
            alt={item.name}
              src={item.photos[0].image.publicUrlTransformed}
              style={{
                width: "10vh"
              }}
            />
          <p>{item.name}</p>
          <p>{formatMoney(item.price)}</p>
        </Space>
        ))} */}
        <Table columns={columns} dataSource={orderItems} pagination={false}/>
          <p style={{
            marginLeft: "1rem",
            fontWeight: "bold"
          }}
          >
            Total: {formatMoney(data.order.total)}
          </p>
        </Space>
      }
    </>
  )
}