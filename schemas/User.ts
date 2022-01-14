import { list } from '@keystone-next/keystone';
import { text, password, relationship } from '@keystone-next/keystone/fields';
import { permissions, rules } from '../access';

export const User = list({
  // access: {
  //   create: () => true,
  //   read: rules.canManageUsers,
  //   update: rules.canManageUsers,
  //   // only people with the permission can delete themselves
  //   delete: permissions.canManageUsers,
  // },
  // ui: {
  //   // hide the back end UI from regular users
  //   hideCreate: args => !permissions.canManageUsers(args),
  //   hideDelete: args => !permissions.canManageUsers(args),
  // },
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
    orders: relationship({ ref: 'Order.user', many: true}),
    // role: relationship({
    //   ref: 'Role.assignedTo',
    //   access: {
    //     create: permissions.canManageUsers,
    //     update: permissions.canManageUsers,
    //   },
    // }),
  },
});
