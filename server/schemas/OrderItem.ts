import { list } from "@keystone-next/keystone";
import { integer, relationship, text } from "@keystone-next/keystone/fields";
import { isSignedIn, rules } from "../access";

export const OrderItem = list({
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: ({ session, context, listKey, operation }) => true,
      update: ({ session, context, listKey, operation }) => true,
      delete: ({ session, context, listKey, operation }) => true,
    }
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