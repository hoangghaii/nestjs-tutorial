import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/role.enum';
import { User as UserEntity } from '../users/user.entity';
import { PostDto } from './dto/post.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    // find the post with this id
    const post = await this.postService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // if post exist, return the post
    return post;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() post: PostDto,
    @Request() req: { user: UserEntity },
  ): Promise<PostEntity> {
    return await this.postService.create(post, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req: { user: UserEntity },
  ): Promise<PostEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedPost;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Request() req: { user: UserEntity },
    @Res() res: Response,
  ) {
    // delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return res.status(HttpStatus.OK).json('Successfully deleted');
  }
}
