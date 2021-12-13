import Link from "next/link";
import { Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CURRENT_USER_QUERY, useUser } from './User.js';
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client";
import router from "next/router";
import { useCart } from "../lib/cartState.js";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function Nav({ Layout }) {
  const user = useUser();
  const { openCart } = useCart();
  const { SubMenu } = Menu;
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  )
  let cartCount = user?.cart?.reduce(
    (tally, cartItem) =>
      tally + (cartItem.product ? cartItem.quantity : 0),
    0
  )
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
        <Link href="/about">
          About
        </Link>
      </Menu.Item>
      <Menu.Item key='contact'>
        <Link href="/contact">
          Contact Us
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
              style={{border: 'none'}}
              onClick={openCart}

            >
              Cart {cartCount}
            </Button>
          </Menu.Item>
          <Menu.Item key="sign-out-button">
          <Button
          //   style={{
          //     position: "absolute",
          //     right: '2vh',
          //     top: '2vh'
          // }}
              onClick={(e) => {
                signout()
                router.push({
                  pathname: '/'
                })
              }} >
              Sign Out
          </Button>
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