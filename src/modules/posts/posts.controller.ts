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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { editFileName } from '../upload/upload.utils';
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

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async create(
    @Body() post: PostDto,
    @Request() req: { user: UserEntity },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostEntity> {
    const filename = file.filename;
    const createdPost = {
      ...post,
      fileUrl: `./files/${filename}`,
    };
    return await this.postService.create(createdPost, req.user.id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req: { user: UserEntity },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostEntity> {
    const filename = file.filename;
    const updatePost = {
      ...post,
      fileUrl: `./files/${filename}`,
    };
    const updatedPost = await this.postService.update(
      id,
      updatePost,
      req.user.id,
    );

    // if !updatedPost,
    // it means the post doesn't exist in our db
    if (!updatedPost) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedPost;
  }

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
