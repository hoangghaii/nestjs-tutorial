import { Controller, Get, Param } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  findAll(): string {
    return 'This action returns all posts';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return 'This action returns one post';
  }
}
