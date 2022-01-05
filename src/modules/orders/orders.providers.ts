import { ORDER_REPOSITORY } from 'src/core/constants';
import { Order } from './order.entity';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
];
