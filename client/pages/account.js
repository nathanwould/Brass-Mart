import { Layout } from "antd";
import Orders from "../components/Orders";
import { useUser } from "../components/User";

export default function AccountPage() {
  const user = useUser();
  // console.log(user)
  const { Content } = Layout;
  return (
    <Layout>
      <Content className="site-layout-background">
      <h1>My Account</h1>
        <Orders user={ user }/>
      </Content>
    </Layout>
  );
}
