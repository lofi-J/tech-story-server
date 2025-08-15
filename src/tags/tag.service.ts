import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagsOrderBy } from './enums/order-by.enum';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTags(orderBy: TagsOrderBy) {
    if (orderBy === TagsOrderBy.POPULAR) {
      // 인기순 정렬 (사용 횟수 기준)
      const tagsWithCount = await this.prisma.tags.findMany({
        include: {
          _count: {
            select: {
              post_tags: true,
            },
          },
        },
        orderBy: {
          post_tags: {
            _count: 'desc',
          },
        },
      });

      return tagsWithCount.map((tag) => ({
        id: tag.id,
        tag_name: tag.tag_name,
        created_at: tag.created_at,
        usage_count: tag._count.post_tags,
      }));
    } else {
      // 기존 정렬 방식
      const tags = await this.prisma.tags.findMany({
        orderBy: { [orderBy]: 'desc' },
      });

      return tags.map((tag) => ({
        id: tag.id,
        tag_name: tag.tag_name,
        created_at: tag.created_at,
        usage_count: undefined,
      }));
    }
  }

  async getPopularTags(limit: number = 10) {
    return await this.prisma.tags.findMany({
      include: {
        _count: {
          select: {
            post_tags: true, // 태그가 연결된 포스트 수
          },
        },
      },
      orderBy: {
        post_tags: {
          _count: 'desc', // 연결된 포스트 수로 내림차순 정렬
        },
      },
      take: limit,
    });
  }

  async getTagUsageStats() {
    return await this.prisma.tags.findMany({
      select: {
        id: true,
        tag_name: true,
        created_at: true,
        _count: {
          select: {
            post_tags: true, // 각 태그가 연결된 포스트 수
          },
        },
      },
      orderBy: {
        post_tags: {
          _count: 'desc',
        },
      },
    });
  }
}
