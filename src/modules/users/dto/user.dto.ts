import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../role.enum';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: Gender = Gender.MALE;

  @IsNotEmpty()
  @IsEnum(Role, {
    each: true,
    message: 'Role must be either user or admin or both',
  })
  readonly roles: Role[] = [Role.User];
}
