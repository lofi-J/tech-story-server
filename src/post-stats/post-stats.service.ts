import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostUtils } from '../util/post.utils';

@Injectable()
export class PostStatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postUtils: PostUtils,
  ) {}

  async increasePostViews(slug: string, req: Request) {
    // slug를 통해 post id 조회
    const postId = await this.postUtils.getPostIdBySlug(slug);

    if (!postId) {
      throw new Error(`Post with slug '${slug}' not found`);
    }

    // 세션에서 이미 조회한 포스트인지 확인
    const viewedPosts = req.session.viewedPosts || [];
    const sessionKey = `post_${postId}`;

    if (viewedPosts.includes(sessionKey)) {
      // 이미 조회한 포스트인 경우 기존 통계만 반환
      const existingStats = await this.prisma.post_stats.findFirst({
        where: { post_id: postId },
      });

      if (existingStats) {
        return existingStats;
      } else {
        // 통계가 없는 경우 기본값으로 생성
        return await this.prisma.post_stats.create({
          data: { post_id: postId, views: 0, likes: 0 },
        });
      }
    }

    // 세션에 조회 기록 추가
    viewedPosts.push(sessionKey);
    req.session.viewedPosts = viewedPosts;

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

  async increasePostLikes(slug: string, req: Request) {
    // slug를 통해 post id 조회
    const postId = await this.postUtils.getPostIdBySlug(slug);

    if (!postId) {
      throw new Error(`Post with slug '${slug}' not found`);
    }

    // 세션에서 이미 좋아요를 누른 포스트인지 확인
    const likedPosts = req.session.likedPosts || [];
    const sessionKey = `post_${postId}`;

    if (likedPosts.includes(sessionKey)) {
      // 이미 좋아요를 누른 포스트인 경우 기존 통계만 반환
      const existingStats = await this.prisma.post_stats.findFirst({
        where: { post_id: postId },
      });

      if (existingStats) {
        return existingStats;
      } else {
        // 통계가 없는 경우 기본값으로 생성
        return await this.prisma.post_stats.create({
          data: { post_id: postId, views: 0, likes: 0 },
        });
      }
    }

    // 세션에 좋아요 기록 추가
    likedPosts.push(sessionKey);
    req.session.likedPosts = likedPosts;

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
