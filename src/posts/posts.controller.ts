import {
  Controller,
  Get,
  Delete,
  Body,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { PostInterface } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<string> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostInterface[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostInterface> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto,
  ): string {
    this.postsService.update(id, createPostDto);
    return `#${id} Post Updated`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.postsService.remove(id);
  }
}
