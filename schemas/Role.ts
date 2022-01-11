import { relationship, text } from "@keystone-next/keystone/fields";
import { list } from "@keystone-next/keystone";
import { permissions } from "../access";
import { permissionFields } from "./fields";

export const Role = list({
  access: {
    query: () => true,
    create: permissions.canManageRoles,
    read: permissions.canManageRoles,
    update: permissions.canManageRoles,
    delete: permissions.canManageRoles,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
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