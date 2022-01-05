import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import {
  AgeGroup,
  Availability,
  Condition,
  Gender,
  Size,
} from '../product.entity';

export class ProductDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  readonly description: string;

  @IsNotEmpty()
  @IsEnum(Condition, {
    message: 'Condition must be either new or available or inventory',
  })
  readonly condition: Condition = Condition.New;

  @IsNotEmpty()
  readonly price: string;

  @IsEnum(Availability, {
    message: 'Condition must be either in stock or sold out',
  })
  readonly availability: Availability = Availability.Stock;

  @IsNotEmpty()
  readonly brand: string;

  @IsNotEmpty()
  readonly color: string[];

  @IsNotEmpty()
  @IsEnum(Size, {
    each: true,
    message: 'Size must be either x or m or l or xl or xxl or all',
  })
  readonly size: Size[] = [Size.M];

  @IsNotEmpty()
  @IsEnum(AgeGroup, {
    each: true,
    message: 'Age group must be either child or adult or old or all',
  })
  readonly age_group: AgeGroup[] = [AgeGroup.Adult];

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'Gender must be either male or female',
  })
  readonly gender: Gender = Gender.Male;
}
