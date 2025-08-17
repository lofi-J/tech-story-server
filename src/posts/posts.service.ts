import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetPostsInput } from './dto/posts.dto';
import { PostsOrderBy, SortOrder } from './enums/posts-order-by.enum';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts(input: GetPostsInput) {
    const { limit, offset, orderBy, order, search } = input;

    // 검색 조건 설정
    const whereCondition: Prisma.postsWhereInput = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // 정렬 조건 설정
    const orderByCondition = this.getOrderByCondition(orderBy, order);

    // 포스트 조회
    const posts = await this.prisma.posts.findMany({
      where: whereCondition,
      take: limit,
      skip: offset,
      orderBy: orderByCondition,
      include: {
        post_tags: {
          include: {
            tags: true,
          },
        },
        post_stats: true,
      },
    });

    // 전체 개수 조회
    const totalCount = await this.prisma.posts.count({
      where: whereCondition,
    });

    return {
      posts: posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        published: post.published || undefined,
        updated_at: post.updated_at || undefined,
        hash_code: post.hash_code.toString(),
        tags: post.post_tags.map((pt) => ({
          id: pt.tags.id,
          tag_name: pt.tags.tag_name,
          created_at: pt.tags.created_at || undefined,
        })),
        stats: post.post_stats[0]
          ? {
              id: post.post_stats[0].id,
              post_id: post.post_stats[0].post_id || undefined,
              views: post.post_stats[0].views || 0,
              likes: post.post_stats[0].likes || 0,
              updated_at: post.post_stats[0].updated_at || undefined,
            }
          : {
              views: 0,
              likes: 0,
            },
      })),
      totalCount,
      hasMore: offset + limit < totalCount,
    };
  }

  private getOrderByCondition(
    orderBy: PostsOrderBy,
    order: SortOrder,
  ): Prisma.postsOrderByWithRelationInput {
    const sortDirection =
      order === SortOrder.ASC ? Prisma.SortOrder.asc : Prisma.SortOrder.desc;

    switch (orderBy) {
      case PostsOrderBy.LATEST:
        return { published: sortDirection };

      case PostsOrderBy.UPDATED:
        return { updated_at: sortDirection };

      case PostsOrderBy.POPULAR_VIEWS:
        // 조회수 기준 정렬은 복잡한 쿼리가 필요하므로 별도 처리
        return { id: sortDirection };

      case PostsOrderBy.POPULAR_LIKES:
        // 좋아요 기준 정렬은 복잡한 쿼리가 필요하므로 별도 처리
        return { id: sortDirection };

      case PostsOrderBy.TITLE:
        return { title: sortDirection };

      case PostsOrderBy.ID:
        return { id: sortDirection };

      default:
        return { published: Prisma.SortOrder.desc };
    }
  }

  async getPostBySlug(slug: string) {
    const post = await this.prisma.posts.findUnique({
      where: { slug },
      include: {
        post_tags: {
          include: {
            tags: true,
          },
        },
        post_stats: true,
      },
    });

    if (!post) {
      return null;
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      published: post.published || undefined,
      updated_at: post.updated_at || undefined,
      hash_code: post.hash_code.toString(),
      tags:
        post.post_tags?.map((pt) => ({
          id: pt.tags.id,
          tag_name: pt.tags.tag_name,
          created_at: pt.tags.created_at || undefined,
        })) || [],
      stats: post.post_stats?.[0]
        ? {
            id: post.post_stats[0].id,
            post_id: post.post_stats[0].post_id || undefined,
            views: post.post_stats[0].views || 0,
            likes: post.post_stats[0].likes || 0,
            updated_at: post.post_stats[0].updated_at || undefined,
          }
        : {
            views: 0,
            likes: 0,
          },
    };
  }
}
