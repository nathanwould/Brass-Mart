import { list } from "@keystone-next/keystone";
// import { graphql } from '@keystone-next/keystone';
import { integer, relationship, text } from "@keystone-next/keystone/fields";
// import formatMoney from "../client/lib/formatMoney";
import { rules } from "../access";

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
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
