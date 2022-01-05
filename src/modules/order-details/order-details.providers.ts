import { ORDER_DETAIL_REPOSITORY } from 'src/core/constants';
import { OrderDetail } from './order-detail.entity';

export const orderDetailsProviders = [
  {
    provide: ORDER_DETAIL_REPOSITORY,
    useValue: OrderDetail,
  },
];
