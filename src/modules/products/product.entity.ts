import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum Availability {
  Stock = 'in stock',
  Sold = 'sold out',
}

export enum Condition {
  New = 'new',
  Available = 'available',
  Inventory = 'inventory',
}

export enum Size {
  X = 'x',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
}

export enum AgeGroup {
  Child = 'child',
  Adult = 'adult',
  Old = 'old',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

@Table
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['new', 'available', 'inventory'],
    defaultValue: Condition.New,
  })
  condition: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['in stock', 'sold out'],
    defaultValue: Availability.Stock,
  })
  availability: string;

  @Column({
    type: DataType.STRING,
  })
  imageLink: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.JSON,
    defaultValue: [Size.M],
    allowNull: false,
  })
  size: string[];

  @Column({
    type: DataType.JSON,
    defaultValue: [AgeGroup.Adult],
    allowNull: false,
  })
  age_group: string[];

  @Column({
    type: DataType.JSON,
    defaultValue: [Gender.Male],
    allowNull: false,
  })
  gender: string[];
}
