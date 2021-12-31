import { Column, DataType, Model, Table } from 'sequelize-typescript';

// import { User } from '../users/user.entity';
@Table
export class Post extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  // @ForeignKey(() => User)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // userId: number;

  // @BelongsTo(() => User)
  // user: User;
}