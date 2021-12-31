import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: UserDto }, @Res() res: Response) {
    const user = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json({ user });
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signup(@Body() user: UserDto, @Res() res: Response) {
    await this.authService
      .create(user)
      .then((newUser) => {
        return res.status(HttpStatus.CREATED).json({ newUser });
      })
      .catch(() => {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json('User already taken');
      });
  }
}
