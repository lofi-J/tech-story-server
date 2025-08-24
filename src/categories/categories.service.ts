import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesOrderBy } from './enums/categories-order-by.enum';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(orderBy: CategoriesOrderBy) {
    if (orderBy === CategoriesOrderBy.POPULAR) {
      // 인기순 정렬 (사용 횟수 기준)
      const categoriesWithCount = await this.prisma.categories.findMany({
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
        orderBy: {
          posts: {
            _count: 'desc',
          },
        },
      });

      return categoriesWithCount.map((category) => ({
        id: category.id,
        category_name: category.category_name,
        created_at: category.created_at,
        usage_count: category._count.posts,
      }));
    } else {
      // 기존 정렬 방식
      const categories = await this.prisma.categories.findMany({
        orderBy: { [orderBy]: 'desc' },
      });

      return categories.map((category) => ({
        id: category.id,
        category_name: category.category_name,
        created_at: category.created_at,
        usage_count: undefined,
      }));
    }
  }

  async getPopularCategories(limit: number = 10) {
    return await this.prisma.categories.findMany({
      include: {
        _count: {
          select: {
            posts: true, // 카테고리가 연결된 포스트 수
          },
        },
      },
      orderBy: {
        posts: {
          _count: 'desc', // 연결된 포스트 수로 내림차순 정렬
        },
      },
      take: limit,
    });
  }

  async getCategoryUsageStats() {
    return await this.prisma.categories.findMany({
      select: {
        id: true,
        category_name: true,
        created_at: true,
        _count: {
          select: {
            posts: true, // 각 카테고리가 연결된 포스트 수
          },
        },
      },
      orderBy: {
        posts: {
          _count: 'desc',
        },
      },
    });
  }
}
