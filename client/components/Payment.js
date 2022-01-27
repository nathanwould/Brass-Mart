import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from "react";
import nProgress from 'nprogress';
import { useRouter } from 'next/dist/client/router';
import { Popover } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

function PaymentForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    // 1. Stop form from causing page reload and turn on loading state
    e.preventDefault();
    setLoading(true);
    // 2. Start page transition
    nProgress.start();
    // 3. Create payment method via stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; //stops checkout from continuing if there's an error
    };
    // 5. Send the token from step 3 to our keystone server
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log('Order placed!');
    console.log(order);
    // 6. redirect to order page
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id
      },
    });
    // 7. turn loader off
    setLoading(false);
    nProgress.done();
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "54vh" }}
    >
        {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
        {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <Popover content="Please use the Stripe test card: 4242 4242 4242 4242 02/22 222" title="Wait!">
        <div
          style={{
            background: "white",
            padding: "2vh",
            borderRadius: "2%",
            marginBottom: "2vh"
          }}
        >
          <CardElement />
        </div>
      </Popover>
      <button
        type="submit"
        className="ant-btn ant-btn-primary ant-btn-dangerous"
      >
        Place Order
      </button>
    </form>
  )
}

export default function Payment() {
  return (
    <Elements stripe={stripeLib}>
      <PaymentForm />
    </Elements>
  )
}