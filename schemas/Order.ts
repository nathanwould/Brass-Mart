import { list } from "@keystone-next/keystone";
import { integer, relationship, text } from "@keystone-next/keystone/fields";
// import { graphql } from '@keystone-next/keystone';
// import formatMoney from "../client/lib/formatMoney";
import { permissions } from "../access";
import { isSignedIn, rules } from "../access";

export const Order = list({
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: args => !permissions.canManageProducts(args),
      update: args => !permissions.canManageProducts(args),
      delete: args => !permissions.canManageProducts(args),
    }
  },
  ui: {
    // hide the back end UI from regular users
    hideCreate: args => !permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),
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
