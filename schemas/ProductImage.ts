import { list } from '@keystone-next/keystone';
import { relationship, text } from '@keystone-next/keystone/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { isSignedIn, permissions } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  // folder: '',
};

export const ProductImage = list({
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
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photos' }),
  },
});
