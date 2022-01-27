import { list } from '@keystone-next/keystone';
import { integer, relationship } from "@keystone-next/keystone/fields";
import { isSignedIn, rules } from "../access";
import { permissions } from '../access';

export const CartItem = list({
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: args => permissions.canManageCart(args),
      update: args => permissions.canManageCart(args),
      delete: args => permissions.canManageCart(args),
    }
  },
  ui: {
    // hide the back end UI from regular users
    hideCreate: args => !permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),
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