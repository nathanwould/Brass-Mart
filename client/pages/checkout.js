import { useUser } from "../components/User"
import { Layout, Card } from 'antd';
import formatMoney from "../lib/formatMoney";
import RemoveFromCart from "../components/RemoveFromCart";
import CheckoutItems from "../components/CheckoutItems";
import ShippingForm from "../components/ShippingForm";
import Payment from "../components/Payment";


export default function Checkout() {
  const user = useUser();
  const { Content } = Layout;
  const { Meta } = Card;
  console.log(user?.cart)
  return (
    <Layout>
      <Content className="site-layout-background">
        <h3>Order Summary</h3>
        <CheckoutItems cart={user?.cart}/>
        <h3>Ship To:</h3>
        <ShippingForm />
        <h3>Payment Information:</h3>
        <Payment />
      </Content>
    </Layout>
  )
}