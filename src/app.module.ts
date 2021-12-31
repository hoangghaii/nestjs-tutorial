import { Module } from '@nestjs/common';
import { RegisterModule } from './modules/register/register.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/user.model';

@Module({
  imports: [
    RegisterModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'test',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
