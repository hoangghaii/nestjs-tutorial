import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const userDecoded: User = jwt.verify(token, process.env.JWTKEY) as User;

      const user = await this.userService.findOneById(userDecoded.id);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      req.user = user;
      next();
    } else {
      throw new UnauthorizedException('User not found.');
    }
  }
}

/**
 * NOTE: Can use middleware or guard

 * With middleware: 
 * import NestModule in module
 * Eg: 
 * export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes(UsersController);
    }
   }
  
  * With guard 
  * Use @UseGuards in controller
  * Eg: 
  * @UseGuards(JwtAuthGuard)
    @Put(':id')
    async findAll() {
     return await this.postService.findAll();
    }
 */
