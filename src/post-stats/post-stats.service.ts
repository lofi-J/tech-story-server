import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostUtils } from '../util/post.utils';

@Injectable()
export class PostStatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postUtils: PostUtils,
  ) {}

  async increasePostViews(slug: string) {
    // slug를 통해 post id 조회
    const postId = await this.postUtils.getPostIdBySlug(slug);

    if (!postId) {
      throw new Error(`Post with slug '${slug}' not found`);
    }

    // 기존 post_stats 레코드 찾기
    const isExisting = await this.prisma.post_stats.findFirst({
      where: { post_id: postId },
    });

    if (isExisting) {
      // 기존 레코드가 있으면 조회수 증가
      return await this.prisma.post_stats.update({
        where: { id: isExisting.id },
        data: { views: { increment: 1 } },
      });
    } else {
      // 기존 레코드가 없으면 새로 생성
      return await this.prisma.post_stats.create({
        data: { post_id: postId, views: 1 },
      });
    }
  }

  async increasePostLikes(slug: string) {
    // slug를 통해 post id 조회
    const postId = await this.postUtils.getPostIdBySlug(slug);

    if (!postId) {
      throw new Error(`Post with slug '${slug}' not found`);
    }

    // 기존 post_stats 레코드 찾기
    const isExisting = await this.prisma.post_stats.findFirst({
      where: { post_id: postId },
    });

    if (isExisting) {
      // 기존 레코드가 있으면 좋아요 증가
      return await this.prisma.post_stats.update({
        where: { id: isExisting.id },
        data: { likes: { increment: 1 } },
      });
    } else {
      // 기존 레코드가 없으면 새로 생성
      return await this.prisma.post_stats.create({
        data: { post_id: postId, likes: 1 },
      });
    }
  }
}
