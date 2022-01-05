import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Status } from '../order.entity';

class CartItemDto {
  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;
}

export class OrderDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  readonly cartList: CartItemDto[];

  @IsNotEmpty()
  @IsEnum(Status, {
    message:
      'Status must be either pending or prepare or shipping or completed',
  })
  readonly status: Status = Status.Prepare;

  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;
}
