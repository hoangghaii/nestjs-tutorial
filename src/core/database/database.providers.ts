import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/modules/posts/post.entity';
import { Product } from 'src/modules/products/product.entity';
import { User } from 'src/modules/users/user.entity';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Post, User, Product]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
