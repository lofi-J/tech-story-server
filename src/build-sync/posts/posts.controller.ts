import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { handlePrismaError, isPrismaError } from 'src/util/prisma';
import type { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('api/build-sync/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // API 키 검증 메서드
  private validateApiKey(apiKey: string | undefined): void {
    const validApiKey = process.env.BUILD_SYNC_API_KEY;

    if (!validApiKey) {
      console.warn(
        'BUILD_SYNC_API_KEY 환경변수가 설정되지 않았습니다. 개발 환경에서는 무시됩니다.',
      );
      if (process.env.NODE_ENV === 'production') {
        throw new HttpException(
          'API 키가 설정되지 않았습니다',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return; // 개발 환경에서는 API 키 없이도 허용
    }

    if (!apiKey || apiKey !== validApiKey) {
      throw new HttpException(
        '유효하지 않은 API 키입니다',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post()
  async upsertPost(
    @Headers('x-api-key') apiKey: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    this.validateApiKey(apiKey);

    try {
      console.log('받은 데이터:', createPostDto);

      const post = await this.postsService.upsertPost(createPostDto);

      return {
        ok: true,
        status: 201,
        data: post,
      };
    } catch (error) {
      console.error('Upsert 에러 상세:', error);
      if (isPrismaError(error)) return handlePrismaError(error);
      throw new HttpException('포스트 처리 실패', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('bulk')
  async bulkUpsertPosts(
    @Headers('x-api-key') apiKey: string,
    @Body() posts: CreatePostDto[],
  ) {
    this.validateApiKey(apiKey);
    try {
      const results = await Promise.all(
        posts.map((post) => this.postsService.upsertPost(post)),
      );
      return {
        ok: true,
        status: 200,
        message: `${results.length}개의 포스트를 성공적으로 처리했습니다`,
        data: results,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('대량 포스트 처리 실패', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllPosts() {
    try {
      const posts = await this.postsService.getAllPosts();
      return {
        ok: true,
        status: 200,
        data: posts,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        '포스트 목록 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    try {
      const post = await this.postsService.getPostBySlug(slug);
      if (!post) {
        throw new HttpException(
          '포스트를 찾을 수 없습니다',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        ok: true,
        status: 200,
        data: post,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error(error);
      throw new HttpException(
        '포스트 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    try {
      const post = await this.postsService.getPost(id);
      if (!post) {
        throw new HttpException(
          '포스트를 찾을 수 없습니다',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        ok: true,
        status: 200,
        data: post,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        '포스트 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('slug/:slug')
  async updatePostBySlug(
    @Param('slug') slug: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      const post = await this.postsService.updatePostBySlug(
        slug,
        updatePostDto,
      );
      return {
        ok: true,
        status: 200,
        data: post,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('포스트 업데이트 실패', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      const post = await this.postsService.updatePost(id, updatePostDto);
      return {
        ok: true,
        status: 200,
        data: post,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('포스트 업데이트 실패', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('slug/:slug')
  async deletePostBySlug(@Param('slug') slug: string) {
    try {
      await this.postsService.deletePostBySlug(slug);
      return {
        ok: true,
        status: 200,
        message: '포스트가 성공적으로 삭제되었습니다',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('포스트 삭제 실패', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.postsService.deletePost(id);
      return {
        ok: true,
        status: 200,
        message: '포스트가 성공적으로 삭제되었습니다',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('포스트 삭제 실패', HttpStatus.BAD_REQUEST);
    }
  }
}
