import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

export enum Status {
  Pending = 'pending',
  Prepare = 'prepare',
  Shipping = 'shipping',
  Completed = 'completed',
}

@Table
export class Order extends Model {
  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['pending', 'prepare', 'shipping', 'completed'],
    defaultValue: Status.Prepare,
  })
  status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalPrice: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;
}
