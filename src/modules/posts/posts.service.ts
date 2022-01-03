import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { POST_REPOSITORY } from 'src/core/constants';
import { User } from '../users/user.entity';
import { PostDto } from './dto/post.dto';
import { Post as PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    // @Inject(POST_REPOSITORY)
    @InjectModel(PostEntity)
    private readonly postRespository: typeof PostEntity,
  ) {}

  async create(post: PostDto, userId: number): Promise<PostEntity> {
    return await this.postRespository.create({ ...post, userId });
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postRespository.findAll<PostEntity>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this.postRespository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id: number, userId: number): Promise<any> {
    return await this.postRespository.destroy({ where: { id, userId } });
  }

  async update(id: number, data: PostDto, userId: number): Promise<any> {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRespository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}
