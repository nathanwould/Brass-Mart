import { createAuth } from '@keystone-next/auth';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { config } from '@keystone-next/keystone';
import {
  DatabaseConfig,
  ListSchemaConfig,
  AdminUIConfig,
  ServerConfig,
  SessionStrategy,
} from '@keystone-next/keystone/types';
import { statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data/index';
import { postgresql } from '@keystone-next/keystone/dist/declarations/src/types/filters';
import { extendGraphqlSchema } from './mutations';
import { sendPasswordResetEmail } from './lib/mail';


const databaseURL = process.env.DATABASE_URL || 'postgres://admin:adminpassword@localhost/brassmart';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.SESSION_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add in intial roles
  },
  sessionData: 'id, name, email',
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity)
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      provider: 'postgresql',
      url: databaseURL,
      onConnect: async context =>  {
        console.log('Connected to Database');
        // console.log(context);
        // if (process.argv.includes('--seed-data')) {
        //   insertSeedData(keystone);
        // }
      },
    },
    lists: ({
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
    }),
    extendGraphqlSchema,
    ui: {
      // TODO: change for roles
      isAccessAllowed: ({ session }) => !!session?.data
    },
    session: statelessSessions(sessionConfig)
  }),
);
