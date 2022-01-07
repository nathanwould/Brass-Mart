import { Button, Drawer, Layout } from "antd";
import { useCart } from "../lib/cartState";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import CartItem from "./CartItem";
import { useUser } from "./User";

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();
  const { Content, Footer } = Layout;

  return (
    <Drawer
      title={`${user?.name}'s Cart`}
      placement="right"
      onClose={closeCart}
      visible={cartOpen}
    >
      <Content style={{
        height: "75vh",
        overflow: "scroll"
      }}>
        {user?.cart?.map(cartItem => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            product={cartItem.product} />
        ))
        }
      </Content>
      <Footer style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "2vh"
      }}>
          {user && <p>Total: {formatMoney(calcTotalPrice(user?.cart))}</p>}
          <Button type="primary" href="/checkout">Checkout</Button>
        </Footer>
    </Drawer>
  )
}