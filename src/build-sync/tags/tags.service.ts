import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BuildSyncResponse } from 'src/types/build-sync.response';
import { CreateTagDto, DeleteTagDto } from './dto/tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  // TODO 태그 타입?
  async createTag(createTagDto: CreateTagDto): Promise<BuildSyncResponse<any>> {
    const tag = await this.prisma.tags.create({
      data: {
        tag_name: createTagDto.tag_name,
      },
    });

    return {
      ok: true,
      status: 201,
      data: tag,
    };
  }

  async deleteTag(deleteTagDto: DeleteTagDto): Promise<BuildSyncResponse<any>> {
    await this.prisma.tags.delete({
      where: { id: deleteTagDto.id },
    });

    return {
      ok: true,
      status: 200,
      data: null,
    };
  }
}
