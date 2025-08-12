import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import type { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('api/build-sync/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.postsService.createPost(createPostDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create post', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('upsert')
  async upsertPost(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.postsService.upsertPost(createPostDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to upsert post', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('bulk')
  async bulkUpsertPosts(@Body() posts: CreatePostDto[]) {
    try {
      const results: any[] = [];
      for (const post of posts) {
        const result = await this.postsService.upsertPost(post);
        results.push(result);
      }
      return {
        message: `Successfully processed ${results.length} posts`,
        data: results,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to bulk upsert posts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAllPosts() {
    try {
      return await this.postsService.getAllPosts();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to retrieve posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    try {
      const post = await this.postsService.getPost(id);
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return post;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    try {
      const post = await this.postsService.getPostBySlug(slug);
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return post;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(
        'Failed to retrieve post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      return await this.postsService.updatePost(id, updatePostDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to update post', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('slug/:slug')
  async updatePostBySlug(
    @Param('slug') slug: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      return await this.postsService.updatePostBySlug(slug, updatePostDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to update post', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.postsService.deletePost(id);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to delete post', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('slug/:slug')
  async deletePostBySlug(@Param('slug') slug: string) {
    try {
      await this.postsService.deletePostBySlug(slug);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to delete post', HttpStatus.BAD_REQUEST);
    }
  }
}
