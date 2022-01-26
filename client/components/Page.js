import PropTypes from 'prop-types';
import { Layout, Space, Menu, BackTop } from 'antd';
import Header from './Header';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

export default function Page({ children }) {
  const { Content, Footer } = Layout;
  return (
      <Layout className="layout">
      <Header Layout={Layout} />
      <div style={{
        height: "10rem",
        width: "100%",
        backgroundImage: `url("https://res.cloudinary.com/dkyy9wjvs/image/upload/v1637184051/dsc_0383_brtvxm.jpg")`
      }} />
        <Content className="site-layout-content" style={{marginBottom: "5em"}}>
        {children}
        </Content>
      <Footer
        style={{
          background: "white",
          padding: "0 0 1rem"
        }}
      >
        <div
        style={{
            height: '10em',
            width: "100%",
            backgroundImage: `url("https://i.imgur.com/vkuNeWU.png")`,
            backgroundPosition: "center",
            // marginBottom: '4em',
          }}
        />
        <Menu mode="horizontal"
          style={{
            border: "none",
            marginBottom: "1rem",
          }}
        >
          <Menu.Item key="footer-home" style={{paddingLeft: "1rem"}}>
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="footer-instruments">
            <a href="/instruments">Instruments</a>
          </Menu.Item>
          <Menu.Item key="footer-accessories">
            <a href="/accessories">Accessories</a>
          </Menu.Item>
          <Menu.Item key="footer-about">
            <a
              href="https://www.nathanwould.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              About
            </a>
          </Menu.Item>
        </Menu>
        <BackTop />
        <Space
          direction="horizontal"
        >
          <a
            href="https://github.com/nathanwould"
            className="footer-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubOutlined />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-wood-dev/"
            className="footer-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkedinOutlined />
          </a>
          <a href="https://www.instagram.com/_nathanwould_/"
            className="footer-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <InstagramOutlined />
          </a>
        </Space>
      </Footer>
      </Layout>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};