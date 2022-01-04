import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../core/constants';
import { UserDto } from './dto/user.dto';
import { User as UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserEntity,
  ) {}

  async create(user: UserDto): Promise<UserEntity> {
    return await this.userRepository.create(user);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne<UserEntity>({ where: { email } });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne<UserEntity>({ where: { id } });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async update(id: number, data: UserDto): Promise<any> {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedUser };
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.destroy({ cascade: true, where: { id } });
  }
}
