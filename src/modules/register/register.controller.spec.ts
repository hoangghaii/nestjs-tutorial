import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterDto } from './model/user-regiter.dto';
import { RegisterController } from './register.controller';

describe('RegisterController', () => {
  let controller: RegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('given user register validation, when name is empty, then return error 400', (done) => {
    const validationPipe = new ValidationPipe({ transform: true });

    const userRegister = new UserRegisterDto();
    userRegister.name = '';

    validationPipe
      .transform(userRegister, {
        type: 'body',
        metatype: UserRegisterDto,
      })
      .catch((error) => {
        expect(error.getResponse().statusCode).toEqual(400);
        done();
      });
  });
});
