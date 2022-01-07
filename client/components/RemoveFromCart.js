import { useMutation } from '@apollo/client';
import { Button } from 'antd';
import gql from 'graphql-tag';
import { useUser } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(where: {id: $id}) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  })
  const user = useUser();
  return (
    <Button
      title="Remove From Cart"
      type="danger"
      disabled={loading}
      onClick={removeFromCart}
      style={{
        marginTop: "4vh"
      }}
    >
      Remove From Cart
    </Button>
  )
}