import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthMiddleware } from './core/middleware/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersController } from './modules/orders/orders.controller';
import { OrdersModule } from './modules/orders/orders.module';
import { PostsController } from './modules/posts/posts.controller';
import { PostsModule } from './modules/posts/posts.module';
import { ProductsController } from './modules/products/products.controller';
import { ProductsModule } from './modules/products/products.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    PostsModule,
    UsersModule,
    UploadModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        PostsController,
        UsersController,
        ProductsController,
        OrdersController,
      );
  }
}
