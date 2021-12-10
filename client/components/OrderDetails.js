import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Layout, Space } from "antd";
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
  const order = data?.order
  const { Content } = Layout;
  console.log(order)
  if (!order) return <p>Loading...</p>
  return (
    <>
        <h1>Order #{id}</h1>
        <Space
          direction="vertical"
          style={{
            background: "white",
            borderRadius: "2%",
          }}
        >
        {order?.items?.map(item => (
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
        ))}
        <p style={{
          margin: "1vh",
          fontWeight: "bold"
        }}
        >
          Total: {formatMoney(order.total)}
        </p>
        </Space>
    </>
  )
}