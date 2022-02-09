import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import ProductCard from '../components/ProductCard';
import { fakeProduct, fakeUser } from '../lib/testUtils';
import '@testing-library/jest-dom/extend-expect';
import { CURRENT_USER_QUERY } from '../components/User';

const product = fakeProduct();

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

describe('<Product />', () => {
  it('Renders out price tag and title', () => {
    const { container, debug } = render(
      <MockedProvider>
        <ProductCard product={product} />
      </MockedProvider>
    );
    expect(screen.getByText('$500')).toBeInTheDocument();
    const link = container.querySelector('a');
    // const linkText = container.querySelector('a').closest('h2');
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/instrument/abc123')
  });
  it('Renders the image properly', () => {
    const { container, debug } = render(
      <MockedProvider>
        <ProductCard product={product} />
      </MockedProvider>
    );
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });
  it('Renders <AddToCart /> and redirects to /signin when a user is not signed in', () => {
    const { container, debug } = render(
      <MockedProvider>
        <ProductCard product={product} />
      </MockedProvider>
    );
    const addToCart = screen.getByText(/add to cart/i);
    expect(addToCart).toBeInTheDocument();
    expect(addToCart).toHaveAttribute('href', '/signin');
  });
});
