import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return await this.prisma.categories.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getCategory(id: number) {
    return await this.prisma.categories.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  }

  async getCategoryByName(categoryName: string) {
    return await this.prisma.categories.findUnique({
      where: { category_name: categoryName },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.categories.create({
      data: createCategoryDto,
    });
  }

  async deleteCategory(id: number) {
    return await this.prisma.categories.delete({
      where: { id },
    });
  }
}
