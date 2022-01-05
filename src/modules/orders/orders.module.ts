import { Module } from '@nestjs/common';
import { OrderDetailsModule } from '../order-details/order-details.module';
import { OrdersController } from './orders.controller';
import { orderProviders } from './orders.providers';
import { OrdersService } from './orders.service';

@Module({
  imports: [OrderDetailsModule],
  providers: [OrdersService, ...orderProviders],
  controllers: [OrdersController],
})
export class OrdersModule {}
