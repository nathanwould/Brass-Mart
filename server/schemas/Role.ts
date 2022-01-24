import { relationship, text } from "@keystone-next/keystone/fields";
import { list } from "@keystone-next/keystone";
import { permissions } from "../access";
import { permissionFields } from "./Fields";

export const Role = list({
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: ({ session, context, listKey, operation }) => true,
      update: ({ session, context, listKey, operation }) => true,
      delete: ({ session, context, listKey, operation }) => true,
    }
  },
  // ui: {
  //   hideCreate: (args) => !permissions.canManageRoles(args),
  //   hideDelete: (args) => !permissions.canManageRoles(args),
  //   isHidden: (args) => !permissions.canManageRoles(args),
  // },
  fields: {
    name: text({
      validation: { isRequired: true, },
    }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role', //TODO: add this to the User
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});