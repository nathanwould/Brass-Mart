import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import AddToCart from '../components/AddToCart';
import { fakeProduct, fakeUser, fakeCartItem } from '../lib/testUtils';
import '@testing-library/jest-dom/extend-expect';
import { CURRENT_USER_QUERY } from '../components/User';
import wait from 'waait';
import { CartStateProvider } from '../lib/cartState';

const product = fakeProduct();
const id = product.id;

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInWithCartItemMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  }
];

describe('<AddToCart />', () => {
  it('Reroutes to /signin when a user is not signed in', () => {
    const { container, debug } = render(
      <MockedProvider>
        <AddToCart id={id} />
      </MockedProvider>
    );
    const addToCart = screen.getByText(/add to cart/i);
    expect(addToCart).toBeInTheDocument();
    expect(addToCart).toHaveAttribute('href', '/signin');
  });
  it('Diplays the right button when a user is signed in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <AddToCart id={id} />
        </MockedProvider>
      </CartStateProvider>
    );
    await waitForElementToBeRemoved(() => screen.queryByTestId('sign-in'));
    const theRightButton = screen.getByTestId(id);
    expect(theRightButton).toBeInTheDocument();
    // debug();
  });
  it('Displays the right button when the item is already in the cart', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInWithCartItemMocks}>
          <AddToCart id={id} />
        </MockedProvider>
      </CartStateProvider>
    );
    await waitForElementToBeRemoved(() => screen.queryByTestId('sign-in'));
    const theRightButton = screen.getByTestId(id);
    expect(theRightButton).toBeInTheDocument();
    expect(container).toHaveTextContent('Added To Cart');
  });
});
