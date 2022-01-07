import { Card } from "antd";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";
import { useUser } from "./User";

export default function InstrumentCard({ product }) {
  const { id, name, photos, price } = product;
  const image = photos[0].image;
  // const user = useUser();
  // console.log(id, user.cart)
  return (
      <Card
      hoverable
        style={{
          width: '20rem',
          marginBottom: '1rem',
          marginRight: '1rem',
        }}
        cover={
          <a href={`/instrument/${id}`}>
            <img
              alt={name}
              src={image.publicUrlTransformed}
              style={{
                width: '100%',
                height: '15rem',
                objectFit: 'cover'
              }}
              />
          </a>
      }
      actions={[<AddToCart id={id}/>]}
    >
        <a href={`/instrument/${id}`}>
            <h2>{name}</h2>
            <p style={{
              textDecoration: 'none',
              color: 'black',
              marginBottom: "0",
            }}
            >{formatMoney(price)}</p>
        </a>
      </Card>
  )
}