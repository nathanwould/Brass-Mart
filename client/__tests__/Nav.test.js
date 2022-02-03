import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom/extend-expect';
import wait from 'waait';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { CartStateProvider } from '../lib/cartState';
import { fakeUser } from '../lib/testUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

describe('<Nav/>', () => {
  it('Renders a minimal nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    // debug();
    expect(container).toHaveTextContent('Sign In');
    const link = screen.getByText('Sign In').closest('a');
    expect(link).toHaveAttribute('href', '/signin');
    const shopLink = screen.getByText('Shop');
    expect(shopLink).toBeInTheDocument();
    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveAttribute('href', 'https://www.nathanwould.com');
  });
  it('Renders a full nav when signed in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    // debug();
    expect(container).toHaveTextContent('Account');
    expect(container).toHaveTextContent('Cart');
    expect(container).toHaveTextContent('Sign Out')
  });
  it('Renders the amount of items in the cart', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Cart');
    // debug();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
