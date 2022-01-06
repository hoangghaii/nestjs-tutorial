import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Status } from '../order.entity';

class CartItemUpdateDto {
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

export class OrderUpdateDto {
  @IsNotEmpty()
  @IsEnum(Status, {
    message:
      'Status must be either pending or prepare or shipping or completed',
  })
  readonly status: Status = Status.Prepare;

  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItemUpdateDto)
  readonly cartList: CartItemUpdateDto[];
}
