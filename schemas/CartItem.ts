import { list } from '@keystone-next/keystone';
import { integer, relationship } from "@keystone-next/keystone/fields";
import { isSignedIn, rules } from "../access";

export const CartItem = list({
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: ({ session, context, listKey, operation }) => true,
      update: ({ session, context, listKey, operation }) => true,
      delete: ({ session, context, listKey, operation }) => true,
    }
  },
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user']
    },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true }
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' })
  },
});