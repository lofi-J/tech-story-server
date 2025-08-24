import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';
import { CategoriesOrderBy } from './enums/categories-order-by.enum';

@Resolver(() => Categories)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Categories])
  async getAllCategories(
    @Args('orderBy', {
      type: () => CategoriesOrderBy,
      defaultValue: CategoriesOrderBy.CREATED_AT,
    })
    orderBy: CategoriesOrderBy,
  ) {
    return await this.categoriesService.getAllCategories(orderBy);
  }

  @Query(() => [Categories], { name: 'popularCategories' })
  async getPopularCategories(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    const popularCategories =
      await this.categoriesService.getPopularCategories(limit);
    return popularCategories.map((category) => ({
      ...category,
      usage_count: category._count.posts,
    }));
  }

  @Query(() => [Categories], { name: 'categoryUsageStats' })
  async getCategoryUsageStats() {
    const categoryStats = await this.categoriesService.getCategoryUsageStats();
    return categoryStats.map((category) => ({
      id: category.id,
      category_name: category.category_name,
      created_at: category.created_at,
      usage_count: category._count.posts,
    }));
  }
}
