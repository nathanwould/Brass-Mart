import { Card } from "antd";
import formatMoney from "../lib/formatMoney";
import RemoveFromCart from "./RemoveFromCart";

export default function CartItem({ cartItem, product }) {
  const { Meta } = Card;
  console.log(product)
  if (!product) return null;
  return (
    <Card
    cover={
      <img
        alt={product.name}
          src={product.photos[0].image.publicUrlTransformed}
      />
    }
    >
      <Meta
        title={product.name}
        description={formatMoney(product.price)}
      />
      <RemoveFromCart id={cartItem.id}/>
    </Card>
  )
}