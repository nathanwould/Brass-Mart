import { Breadcrumb, Layout, Typography } from "antd";

export default function AccessoriesPage() {
  const { Content } = Layout;
  const { Title } = Typography;
  return (
    <Layout style={{height: "100%"}}>
      <Breadcrumb style={{ margin: '1rem 0 0 1.5rem' }}>
        <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item>Accessories</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="site-layout-background">
        <Title>Coming Soon!</Title>
      </Content>
    </Layout>
  );
}
