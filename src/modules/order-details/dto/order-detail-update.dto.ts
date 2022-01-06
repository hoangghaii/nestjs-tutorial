import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDetailUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;
}
