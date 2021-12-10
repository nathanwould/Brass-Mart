import { list } from '@keystone-next/keystone';
import { text, password, relationship } from '@keystone-next/keystone/fields';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({
      validation: {isRequired: true,}
    }),
    email: text({ 
      validation: {
        isRequired: true,
      },
      isIndexed: 'unique',
    }),
    password: password(),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({ ref: 'Order.user', many: true})
    // TODO: roles, cart, orders
  },
});
