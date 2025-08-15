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
} from '@nestjs/common';
import { handlePrismaError, isPrismaError } from 'src/util/prisma';
import type { CreateTagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@Controller('api/build-sync/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags() {
    try {
      const tags = await this.tagsService.getAllTags();
      return {
        ok: true,
        status: 200,
        data: tags,
      };
    } catch {
      throw new HttpException(
        '태그 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getTagById(@Param('id', ParseIntPipe) id: number) {
    try {
      const tag = await this.tagsService.getTagById(id);
      if (!tag) {
        throw new HttpException(
          '태그를 찾을 수 없습니다',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        ok: true,
        status: 200,
        data: tag,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        '태그 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto) {
    try {
      const tag = await this.tagsService.createTag(createTagDto);
      return {
        ok: true,
        status: 201,
        data: tag,
      };
    } catch (error) {
      if (isPrismaError(error)) {
        return handlePrismaError(error);
      }
      throw new HttpException(
        '태그 생성 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteTag(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.tagsService.deleteTag({ id });
      return {
        ok: true,
        status: 200,
        data: null,
      };
    } catch (error) {
      if (isPrismaError(error)) {
        return handlePrismaError(error);
      }
      throw new HttpException('태그 삭제 실패', HttpStatus.BAD_REQUEST);
    }
  }
}
