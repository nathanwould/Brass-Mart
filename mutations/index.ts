import { graphQLSchemaExtension } from "@keystone-next/keystone";
import { KeystoneContext } from "@keystone-next/keystone/types";
import { Session } from '../types'
import { CartItem } from "../schemas/CartItem";
import { CartItemCreateInput, OrderCreateInput } from '.keystone/types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

interface Arguments {
  token: string
}

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
  type Mutation {
    addToCart(productId: ID): CartItem
    checkout(token: String!): Order
  }
  `,
  resolvers: {
    Mutation: {
      addToCart: async (root: any, { productId }: { productId: string }, context: KeystoneContext
      ): Promise<CartItemCreateInput> => {
        console.log('Adding to cart!', {productId})
        const sesh = context.session as Session;
        if (!sesh.itemId) {
          throw new Error('Please log in to add products to your cart.');
        }
        // console.log(await context.db.CartItem.findMany({
        const allCartItems = await context.db.CartItem.findMany({
          where: { user: { id: {equals: sesh.itemId} }, product: { id: {equals: productId} } },
          // resolveFields: 'id, quantity'
        });
        console.log('All cart items:')
        
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
      },
      checkout: async (root: any, { token }: Arguments, context: KeystoneContext):
        Promise<OrderCreateInput> => {
        // 1. Make sure they're signed in
        const userId = context.session.itemId;
        // console.log(userId)
        if (!userId) {
          throw new Error('Sorry, you must be signed in to place an order.')
        }
        // 2. Query current user
        const user = await context.query.User.findOne({
          where: { id: userId },
          query: 'id name email cart { id quantity product { name price id description photos {id image { id publicUrlTransformed }}}}'
        });
        // console.log(user)
        // 3. Calculate the total order price
        const cartItems = user?.cart?.filter(cartItem => cartItem.product);
        const amount = cartItems.reduce(function (tally: number, cartItem: CartItemCreateInput) {
          return tally + cartItem.quantity * cartItem.product.price;
        }, 0);
        console.log(amount)
        // 4. Create the charge with the Stripe Library
        const charge = await stripeConfig.paymentIntents.create({
          amount,
          currency: 'USD',
          confirm: true,
          payment_method: token,
        }).catch(err => {
          console.log(err)
          throw new Error(err.message)
        });
        // console.log(charge)
        // 5. Convert CartItems to OrderItems
        const orderItems = cartItems.map(cartItem => {
          const orderItem = {
            name: cartItem.product.name,
            description: cartItem.product.description,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            photos: { connect: { id: cartItem.product.photos[0].id }},
          }
          // console.log(orderItem)
          return orderItem
        })
        // 6. Create order and return it
        const order = await context.db.Order.createOne({
          data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { id: userId } },
          },
        });
        // console.log(order)
        const cartItemIds = user.cart.map(cartItem => ({ id: cartItem.id} ));
        console.log(cartItemIds)
        await context.db.CartItem.deleteMany({
          where: cartItemIds,
        });
        return order;
      }
    }
  }
})