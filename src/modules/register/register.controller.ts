import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './model/user-regiter.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() userRegisterDto: UserRegisterDto) {
    return userRegisterDto;
  }
}
