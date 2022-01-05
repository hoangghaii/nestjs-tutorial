import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';

@Module({
  providers: [ProductsService, ...productsProviders],
  controllers: [ProductsController],
})
export class ProductsModule {}
