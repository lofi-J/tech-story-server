import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  GetPostsByCategoryInput,
  GetPostsByTagInput,
  GetPostsInput,
} from './dto/posts.dto';
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

    // 포스트 조회 (인기도 정렬 지원)
    const posts = await this.getPostsWithPopularitySort(
      whereCondition,
      orderBy,
      order,
      limit,
      offset,
    );

    // 전체 개수 조회
    const totalCount = await this.prisma.posts.count({
      where: whereCondition,
    });

    return {
      posts: posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description || '',
        published: post.published || undefined,
        updated_at: post.updated_at || undefined,
        hash_code: post.hash_code,
        tags: post.post_tags.map((pt) => ({
          id: pt.tags.id,
          tag_name: pt.tags.tag_name,
          created_at: pt.tags.created_at || new Date(),
          usage_count: undefined, // 필요시 계산 로직 추가
        })),
        category: post.post_tags[0]?.tags?.tag_name || '', // 첫 번째 태그를 category로 설정
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
        // 조회수 기준 정렬: 기본적으로 ID 정렬하고, 메서드에서 별도 처리
        return { id: sortDirection };

      case PostsOrderBy.POPULAR_LIKES:
        // 좋아요 기준 정렬: 기본적으로 ID 정렬하고, 메서드에서 별도 처리
        return { id: sortDirection };

      case PostsOrderBy.TITLE:
        return { title: sortDirection };

      case PostsOrderBy.ID:
        return { id: sortDirection };

      default:
        return { published: Prisma.SortOrder.desc };
    }
  }

  /**
   * 인기도 기준 정렬을 위한 추가 처리
   * POPULAR_VIEWS와 POPULAR_LIKES의 경우 post_stats 테이블의 값으로 정렬
   */
  private async getPostsWithPopularitySort(
    whereCondition: Prisma.postsWhereInput,
    orderBy: PostsOrderBy,
    order: SortOrder,
    limit: number,
    offset: number,
  ) {
    if (
      orderBy === PostsOrderBy.POPULAR_VIEWS ||
      orderBy === PostsOrderBy.POPULAR_LIKES
    ) {
      // 인기도 정렬을 위한 Raw Query 사용
      const sortField =
        orderBy === PostsOrderBy.POPULAR_VIEWS ? 'views' : 'likes';
      const sortDirection = order === SortOrder.ASC ? 'ASC' : 'DESC';

      // Raw SQL로 정렬된 포스트 ID 조회
      const sortedPostIds = await this.prisma.$queryRaw<{ id: number }[]>`
        SELECT p.id
        FROM posts p
        LEFT JOIN post_stats ps ON p.id = ps.post_id
        ORDER BY COALESCE(ps.${Prisma.raw(sortField)}, 0) ${Prisma.raw(sortDirection)}, p.id ${Prisma.raw(sortDirection)}
        LIMIT ${limit} OFFSET ${offset}
      `;

      const postIds = sortedPostIds.map((p) => p.id);

      if (postIds.length === 0) {
        return [];
      }

      // 정렬된 ID 순서대로 포스트 조회
      const posts = await this.prisma.posts.findMany({
        where: {
          AND: [whereCondition, { id: { in: postIds } }],
        },
        include: {
          post_tags: {
            include: {
              tags: true,
            },
            orderBy: {
              tag_id: 'asc',
            },
          },
          post_stats: true,
        },
      });

      // 정렬 순서 유지
      return postIds
        .map((id) => posts.find((post) => post.id === id))
        .filter((post): post is NonNullable<typeof post> => Boolean(post));
    }

    // 일반 정렬의 경우 기존 방식 사용
    return await this.prisma.posts.findMany({
      where: whereCondition,
      take: limit,
      skip: offset,
      orderBy: this.getOrderByCondition(orderBy, order),
      include: {
        post_tags: {
          include: {
            tags: true,
          },
          orderBy: {
            tag_id: 'asc',
          },
        },
        post_stats: true,
      },
    });
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
      description: post.description || '',
      published: post.published || undefined,
      updated_at: post.updated_at || undefined,
      hash_code: post.hash_code,
      tags:
        post.post_tags?.map((pt) => ({
          id: pt.tags.id,
          tag_name: pt.tags.tag_name,
          created_at: pt.tags.created_at || new Date(),
          usage_count: undefined, // 필요시 계산 로직 추가
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

  async getPostsByTag(input: GetPostsByTagInput) {
    const { tagName, limit, offset, orderBy, order } = input;

    // 검색 조건 설정
    const whereCondition: Prisma.postsWhereInput = {
      post_tags: {
        some: {
          tags: {
            tag_name: tagName,
          },
        },
      },
    };

    // 특정 태그를 가진 포스트들을 조회 (인기도 정렬 지원)
    const posts = await this.getPostsWithPopularitySort(
      whereCondition,
      orderBy,
      order,
      limit,
      offset,
    );

    // 전체 개수 조회
    const totalCount = await this.prisma.posts.count({
      where: whereCondition,
    });

    return {
      posts: posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description || '',
        published: post.published || undefined,
        updated_at: post.updated_at || undefined,
        hash_code: post.hash_code,
        tags: post.post_tags.map((pt) => ({
          id: pt.tags.id,
          tag_name: pt.tags.tag_name,
          created_at: pt.tags.created_at || new Date(),
          usage_count: undefined, // 필요시 계산 로직 추가
        })),
        category: post.post_tags[0]?.tags?.tag_name || '', // 첫 번째 태그를 category로 설정
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

  async getPostsByCategory(input: GetPostsByCategoryInput) {
    const { categoryName, limit, offset, orderBy, order } = input;

    // 검색 조건 설정: post_tags에서 첫 번째 태그가 categoryName과 일치하는 posts 조회
    const whereCondition: Prisma.postsWhereInput = {
      post_tags: {
        some: {
          tags: {
            tag_name: categoryName,
          },
        },
      },
    };

    // 카테고리별 포스트들을 조회 (인기도 정렬 지원)
    const posts = await this.getPostsWithPopularitySort(
      whereCondition,
      orderBy,
      order,
      limit,
      offset,
    );

    // 첫 번째 태그가 category인 posts만 필터링
    const categoryPosts = posts.filter((post) => {
      const firstTag = post.post_tags[0]?.tags?.tag_name;
      return firstTag === categoryName;
    });

    // 전체 개수 조회 (필터링된 결과 기준)
    const allCategoryPosts = await this.prisma.posts.findMany({
      where: whereCondition,
      include: {
        post_tags: {
          include: {
            tags: true,
          },
          orderBy: {
            tag_id: 'asc',
          },
        },
      },
    });

    const totalCount = allCategoryPosts.filter((post) => {
      const firstTag = post.post_tags[0]?.tags?.tag_name;
      return firstTag === categoryName;
    }).length;

    return {
      posts: categoryPosts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description || '',
        published: post.published || undefined,
        updated_at: post.updated_at || undefined,
        hash_code: post.hash_code,
        tags: post.post_tags.map((pt) => ({
          id: pt.tags.id,
          tag_name: pt.tags.tag_name,
          created_at: pt.tags.created_at || new Date(),
          usage_count: undefined, // 필요시 계산 로직 추가
        })),
        category: post.post_tags[0]?.tags?.tag_name || '', // 첫 번째 태그를 category로 설정
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
}
