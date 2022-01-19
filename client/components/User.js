import { useQuery } from '@apollo/client';
import { gql } from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            photos {
              image {
                publicUrlTransformed
              }
            }
          }
        }
        orders {
          id
          total
          charge
          items {
            id
            name
            description
            price
            quantity
            photos {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  console.log(data);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
