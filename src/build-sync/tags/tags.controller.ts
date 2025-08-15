import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { handlePrismaError, isPrismaError } from 'src/util/prisma';
import type { CreateTagDto, DeleteTagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@Controller('api/build-sync/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createTag(@Body() createTagDto: CreateTagDto) {
    try {
      return await this.tagsService.createTag(createTagDto);
    } catch (error) {
      if (isPrismaError(error)) {
        return handlePrismaError(error);
      }

      throw new HttpException(
        '태그 생성 중 오류가 발생했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: DeleteTagDto) {
    try {
      return await this.tagsService.deleteTag(id);
    } catch (error) {
      if (isPrismaError(error)) {
        return handlePrismaError(error);
      }

      throw new HttpException('Failed to delete tag', HttpStatus.BAD_REQUEST);
    }
  }
}
