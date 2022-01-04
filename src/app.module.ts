import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthMiddleware } from './core/middleware/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PostsController } from './modules/posts/posts.controller';
import { PostsModule } from './modules/posts/posts.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    PostsModule,
    UsersModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PostsController);
  }
}
