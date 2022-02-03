import { list } from "@keystone-next/keystone";
import { integer, relationship, text } from "@keystone-next/keystone/fields";
import { isSignedIn, rules } from "../access";
import { permissions } from "../access";

export const OrderItem = list({
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: args => permissions.canManageOrders(args),
      update: args => permissions.canManageOrders(args),
      delete: args => permissions.canManageOrders(args),
    }
  },
  ui: {
    // hide the back end UI from regular users
    hideCreate: args => !permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: true }}),
    photos: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText']},
      },
      many: true,
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ ref: 'Order.items'}),
  },
})