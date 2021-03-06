import { list } from "@keystone-next/keystone";
import { text, integer, select, relationship, float } from "@keystone-next/keystone/fields";
import { rules } from "../access";
import { permissions } from "../access";

export const Product = list({
  // TODO:
  access: {
    operation: {
      query: ({ session, context, listKey, operation }) => true,
      create: args => permissions.canManageProducts(args),
      update: args => permissions.canManageProducts(args),
      delete: args => permissions.canManageProducts(args),
    }
  },
  ui: {
    // hide the back end UI from regular users
    // hideCreate: args => !permissions.canManageUsers(args),
    // hideDelete: args => !permissions.canManageUsers(args),
  },
  fields: {
    productType: select({
      options: [
        { label: 'Instrument', value: 'instrument' },
        { label: 'Accessory', value: 'accessory' },
      ],
      validation: {isRequired: true,},
      defaultValue: 'instrument',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    name: text({
      validation: {isRequired: true,},
    }),
    make: text({
      validation: { isRequired: true, }
    }),
    model: text({
      validation: {isRequired: true, }
    }),
    category: select({
      options: [
        { label: 'Trombone', value: 'trombone' },
        { label: 'Trumpet', value: 'trumpet' },
        { label: 'Euphonium', value: 'euphonium' },
        { label: 'Tuba', value: 'tuba' },
        { label: 'Horn', value: 'horn' },
        { label: 'Mouthpiece', value: 'mouthpiece' },
        { label: 'Case', value: 'case' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
      validation: {isRequired: true,}
    }),
    instrumentType: select({
      options: [
        { label: 'Alto Trombone', value: 'trombone-alto' },
        { label: 'Tenor Trombone', value: 'trombone-tenor' },
        { label: 'Bass Trombone', value: 'trombone-bass' },
        { label: 'Cornet', value: 'cornet' },
        { label: 'Mellophone', value: 'mellophone' },
        { label: 'Euphonium', value: 'euphonium' },
      ],
    }),
    instrumentKey: text(),
    boreSize: float(),
    bellSize: float(),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
      validation: {isRequired: true,},
    }),
    photos: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
      many: true,
    }),
    price: integer({
      validation: {isRequired: true,}
    }),
    status: select({
      options: [
        { label: 'In Stock', value: 'IN-STOCK' },
        { label: 'Out of Stock', value: 'OUT-OF-STOCK' },
      ],
      validation: {isRequired: true,},
      defaultValue: 'IN-STOCK',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' }
      }
    }),
  },
});