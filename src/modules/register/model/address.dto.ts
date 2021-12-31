import { IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  address: string;

  number: string;
  neighborhood: string;
  complement: string;
  zipCode: string;
  state: string;

  @IsNotEmpty()
  city: string;
}
