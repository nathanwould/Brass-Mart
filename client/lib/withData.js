import { ApolloClient, createHttpLink, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

// const responseLogger = new ApolloLink((operation, forward) => {
//   return forward(operation).map(result => {
//     console.info(operation.getContext().response.headers)
//     return result
//   })
// });

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link:
      ApolloLink.from([
      // responseLogger,
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) {
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          )
        };
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createHttpLink({
        uri: process.env.NODE_ENV === 'development' ? prodEndpoint : endpoint,
        // fetchOptions: {
        credentials: 'include',
        // },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: Pagination if I decide to use the Wes Bos method!
          },
        },
      },
    }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
