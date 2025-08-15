import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto, DeleteTagDto } from './dto/tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async createTag(createTagDto: CreateTagDto) {
    return await this.prisma.tags.create({
      data: {
        tag_name: createTagDto.tag_name,
      },
    });
  }

  async deleteTag(deleteTagDto: DeleteTagDto) {
    return await this.prisma.tags.delete({
      where: { id: deleteTagDto.id },
    });
  }

  async getAllTags() {
    return await this.prisma.tags.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async getTagById(id: number) {
    return await this.prisma.tags.findUnique({
      where: { id },
    });
  }

  async getTagByName(tagName: string) {
    return await this.prisma.tags.findUnique({
      where: { tag_name: tagName },
    });
  }
}
