import { Layout, Breadcrumb } from "antd";
import OrderDetails from "../../components/OrderDetails";

export default function SingleOrder({ query }) {
  const { Content } = Layout;
  return (
    <Layout>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
        <Breadcrumb.Item><a href="/account">Account</a></Breadcrumb.Item>
        <Breadcrumb.Item>Order #{query.id}</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background">
        <OrderDetails id={query.id} />
      </Content>
    </Layout>
  )
}