import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import SignUp, { SIGN_UP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';
import gql from 'graphql-tag';

const me = fakeUser();
const password = 'BosDaddy';
const mocks = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          name: me.name,
          email: me.email,
        },
      },
    },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: me } },
  },
];

// current user mock
// const userMocks = [
//   {
//     request: { query: CURRENT_USER_QUERY },
//     result: { data: { authenticatedItem: me } },
//   },
// ];

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('<SignUp />', () => {
  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    // checking typing into boxes works
    await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);
    // Click the sign up button
    await userEvent.click(screen.getByTestId('sign-up-button'));
    wait(400);
    await screen.findByText(
      `Welcome, ${me.name}`
    );
  });
});