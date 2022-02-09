import { graphQLSchemaExtension } from "@keystone-next/keystone";
import checkout from "./checkout";
import addToCart from "./addToCart";

const graphql = String.raw;

interface Arguments {
  token: string
}

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
  type Mutation {
    addToCart(productId: ID): CartItem
    checkout(token: String!): Order
  }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});
