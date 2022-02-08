import { KeystoneContext } from '@keystone-next/keystone/types';
import { Session } from '../types'
import { CartItemCreateInput } from '.keystone/types';

async function addToCart(root: any, { productId }: { productId: string }, context: KeystoneContext
  ): Promise<CartItemCreateInput> {
    console.log('Adding to cart!', { productId })
    const sesh = context.session as Session;
    if (!sesh.itemId) {
      throw new Error('Please log in to add products to your cart.');
    }
    // console.log(await context.db.CartItem.findMany({
    const allCartItems = await context.db.CartItem.findMany({
      where: { user: { id: { equals: sesh.itemId } }, product: { id: { equals: productId } } },
      // resolveFields: 'id, quantity'
    });
    console.log('All cart items:', allCartItems)
    
    const [existingCartItem] = allCartItems;
    if (existingCartItem) {
      console.log(existingCartItem);
      console.log(`${existingCartItem} has already been added to your cart!`);
      return
    };
    return await context.db.CartItem.createOne({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: sesh.itemId } },
      }
    });
};

export default addToCart;
