import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from '../posts/post.entity';
import { Role } from './role.enum';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.JSON,
    defaultValue: [Role.User],
    allowNull: false,
  })
  roles: string[];

  @HasMany(() => Post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  posts: Post;
}
