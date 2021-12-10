import { relationship, text } from '@keystone-next/keystone/fields';
import { list } from '@keystone-next/keystone';
import { cloudinaryImage } from '@keystone-next/cloudinary';
// import { isSignedIn, permissions } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  // folder: '',
};

export const ProductImage = list({
  // access: {
  //   create: isSignedIn,
  //   read: () => true,
  //   update: permissions.canManageProducts,
  //   delete: permissions.canManageProducts,
  // },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photos' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});
