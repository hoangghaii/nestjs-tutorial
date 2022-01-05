import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
