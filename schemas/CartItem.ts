import { integer, relationship } from "@keystone-next/keystone/fields";
import { list } from '@keystone-next/keystone'

export const CartItem = list({
  // access: {
  //   create: isSignedIn,
  //   read: rules.canOrder,
  //   update: specifiedRules.canOrder,
  //   delete: rules.canOrder,
  // },
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