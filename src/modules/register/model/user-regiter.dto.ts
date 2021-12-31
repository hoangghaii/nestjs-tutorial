import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { AddressDto } from './address.dto';

export class UserRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;

  @IsNotEmpty()
  address: AddressDto;
}
