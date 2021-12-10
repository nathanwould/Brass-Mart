import { Card, Space } from "antd";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import RemoveFromCart from "./RemoveFromCart";

export default function CheckoutItems({ cart }) {
  const { Meta } = Card;
  if (!cart) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <>
      <Space
        direction="vertical"
        // align="center"
        style={{
          padding: "2vh",
          background: "white",
          borderRadius: "2%",
          marginBottom: "4vh"
        }}
      >
        {cart?.map(cartItem => (
          <Space
            key={cartItem.id}
            align="center"
            style={{
              margin: "1vh"
            }}
          >
          <img
            alt={cartItem.product.name}
              src={cartItem.product.photos[0].image.publicUrlTransformed}
              style={{
                width: "10vh"
              }}
            />
          <p>{cartItem.product.name}</p>
          <p>{formatMoney(cartItem.product.price)}</p>
          <RemoveFromCart id={cartItem.id} />
        </Space>
        ))}
        <p style={{
          margin: "1vh",
          fontWeight: "bold"
        }}
        >
          Total: {formatMoney(calcTotalPrice(cart))}
        </p>
        </Space>
      </>
  )
}