import { list } from "@keystone-next/keystone";
// import { graphql } from '@keystone-next/keystone';
import { integer, relationship, text } from "@keystone-next/keystone/fields";
// import formatMoney from "../client/lib/formatMoney";
import { isSignedIn, rules } from "../access";

export const Order = list({
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: ({ session, context, listKey, operation }) => true,
      update: ({ session, context, listKey, operation }) => true,
      delete: ({ session, context, listKey, operation }) => true,
    }
  },
  fields: {
    // label: virtual({
    //   field: graphql.field({
    //     type: graphql.String,
    //     resolve(item) {
    //       return `${formatMoney(item.total)}`;
    //     },
    //     })
    // }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
