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
} from '@nestjs/common';
import { handlePrismaError, isPrismaError } from 'src/util/prisma';
import { CategoriesService } from './categories.service';
import type { CreateCategoryDto } from './dto/category.dto';

@Controller('api/build-sync/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

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

  @Get()
  async getAllCategories() {
    try {
      const categories = await this.categoriesService.getAllCategories();
      return {
        ok: true,
        status: 200,
        data: categories,
      };
    } catch (error) {
      if (isPrismaError(error)) {
        const { message, status } = handlePrismaError(error);
        throw new HttpException(message, status);
      }
      throw new HttpException(
        '카테고리 조회 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    try {
      const category = await this.categoriesService.getCategory(id);
      if (!category) {
        throw new HttpException(
          '카테고리를 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        ok: true,
        status: 200,
        data: category,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (isPrismaError(error)) {
        const { message, status } = handlePrismaError(error);
        throw new HttpException(message, status);
      }
      throw new HttpException(
        '카테고리 조회 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('name/:categoryName')
  async getCategoryByName(@Param('categoryName') categoryName: string) {
    try {
      const category =
        await this.categoriesService.getCategoryByName(categoryName);
      if (!category) {
        throw new HttpException(
          '카테고리를 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        ok: true,
        status: 200,
        data: category,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (isPrismaError(error)) {
        const { message, status } = handlePrismaError(error);
        throw new HttpException(message, status);
      }
      throw new HttpException(
        '카테고리 조회 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createCategory(
    @Headers('x-api-key') apiKey: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    this.validateApiKey(apiKey);
    try {
      const category =
        await this.categoriesService.createCategory(createCategoryDto);
      return {
        ok: true,
        status: 201,
        data: category,
        message: '카테고리가 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      if (isPrismaError(error)) {
        const { message, status } = handlePrismaError(error);
        throw new HttpException(message, status);
      }
      throw new HttpException(
        '카테고리 생성 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteCategory(
    @Headers('x-api-key') apiKey: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.validateApiKey(apiKey);
    try {
      await this.categoriesService.deleteCategory(id);
      return {
        ok: true,
        status: 200,
        message: '카테고리가 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      if (isPrismaError(error)) {
        const { message, status } = handlePrismaError(error);
        throw new HttpException(message, status);
      }
      throw new HttpException(
        '카테고리 삭제 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
