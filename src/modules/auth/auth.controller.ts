import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() req: { email: string; password: string }) {
    // const { email, password } = req;
    // return { email, password };
    return await this.authService.login(req);
  }

  @Post('signup')
  async signup(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
