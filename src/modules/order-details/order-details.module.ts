import { Module } from '@nestjs/common';
import { OrderDetailsController } from './order-details.controller';
import { orderDetailsProviders } from './order-details.providers';
import { OrderDetailsService } from './order-details.service';

@Module({
  providers: [OrderDetailsService, ...orderDetailsProviders],
  exports: [OrderDetailsService],
  controllers: [OrderDetailsController],
})
export class OrderDetailsModule {}
