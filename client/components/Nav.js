import { Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useUser } from './User.js';
import { useCart } from "../lib/cartState.js";
import Link from 'next/link';
import { SignOut } from './SignOut';

export default function Nav({ Layout }) {
  const user = useUser();
  const { openCart } = useCart();
  const { SubMenu } = Menu;
  return (
    <Menu mode="horizontal">
      <Menu.Item key='home' className="logo">
        <Link
            href="/"
          >
            Brass Mart
          </Link>
        </Menu.Item>
      <SubMenu title={<span>Shop <DownOutlined /></span>} key='sub-menu'>
        <Menu.Item key='instruments'>
          <Link href="/instruments">
            Instruments
          </Link>
        </Menu.Item>
        <Menu.Item key='accessories'>
          <Link href="/accessories">
            Accessories
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key='about'>
        <Link href="https://www.nathanwould.com" target="_blank">
          About
        </Link>
      </Menu.Item>
      {user && (
        <>
          <Menu.Item key='account'>
            <Link href="/account">
              Account
            </Link>
          </Menu.Item>
          <Menu.Item key='cart'>
            <Button
              style={{ border: 'none'}}
              onClick={openCart}

            >
              Cart
              <span style={{
                padding: '.2rem',
                marginLeft: ".5rem",
                
              }}>
                {user.cartCount}
              </span>
            </Button>
          </Menu.Item>
          <Menu.Item key="sign-out-button">
            <SignOut />
          </Menu.Item>
        </>
      )}
      {!user && (
        <Menu.Item key='sign-in'>
        <Button href="/signin">
          Sign In
        </Button>
      </Menu.Item>
      )}
    </Menu>
  );
}