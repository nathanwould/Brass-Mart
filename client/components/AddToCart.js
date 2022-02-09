import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY, useUser } from './User';
import { Button } from 'antd';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const user = useUser();
  const added = !!user?.cart.find(cartItem => cartItem.product.id === id)
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  if (user) {
    return (
      <>
        {added ?
          <Button
            disabled
            type="button"
            data-testid={id}
          >
            Added To Cart
          </Button>
          : <Button
            type="button"
            onClick={addToCart}
            data-testid={id}
          >
            {`Add${loading ? 'ing' : ''} To Cart 🛒`}
          </Button>
        }
      </>
    )
  }
  else {
    return (
      <>
        <a
          className="ant-btn ant-btn-button"
          href="/signin"
          data-testid='sign-in'
        >
          Add To Cart 🛒
        </a>
      </>
    )
  };
}
