import PropTypes from 'prop-types';
import { Layout, Space, Menu, BackTop } from 'antd';
import Header from './Header';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

export default function Page({ children }) {
  const { Footer } = Layout;
  return (
      <Layout className="layout">
      <Header Layout={Layout} />
      <div style={{
        height: "10rem",
        width: "100%",
        backgroundImage: `url("https://res.cloudinary.com/dkyy9wjvs/image/upload/v1637184051/dsc_0383_brtvxm.jpg")`
      }} />
        <div className="site-layout-content">
        {children}
        </div>
      <Footer
        style={{
          background: "white",
          padding: "1.5rem 1rem"
        }}
      >
        <Menu mode="horizontal"
          style={{
            border: "none",
            marginBottom: "1rem",
          }}
        >
          <Menu.Item key="footer-home" style={{paddingLeft: "1rem"}}>
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="footer-about">
            <a href="/about">About</a>
          </Menu.Item>
          <Menu.Item key="footer-contact">
            <a href="/contact">Contact Us</a>
          </Menu.Item>
        </Menu>
        <BackTop />
        <Space direction="horizontal">
          <a href="/" className="footer-link"><GithubOutlined /></a>
          <a href="/" className="footer-link"><LinkedinOutlined /></a>
          <a href="/" className="footer-link"><InstagramOutlined /></a>
        </Space>
      </Footer>
      </Layout>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};