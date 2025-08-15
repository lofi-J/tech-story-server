import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Tags } from './entities/tags.entity';
import { TagsOrderBy } from './enums/order-by.enum';
import { TagsService } from './tag.service';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => [Tags])
  async getAllTags(
    @Args('orderBy', {
      type: () => TagsOrderBy,
      defaultValue: TagsOrderBy.CREATED_AT,
    })
    orderBy: TagsOrderBy,
  ) {
    return await this.tagsService.getAllTags(orderBy);
  }

  @Query(() => [Tags], { name: 'popularTags' })
  async getPopularTags(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    const popularTags = await this.tagsService.getPopularTags(limit);
    return popularTags.map((tag) => ({
      ...tag,
      usage_count: tag._count.post_tags,
    }));
  }

  @Query(() => [Tags], { name: 'tagUsageStats' })
  async getTagUsageStats() {
    const tagStats = await this.tagsService.getTagUsageStats();
    return tagStats.map((tag) => ({
      id: tag.id,
      tag_name: tag.tag_name,
      created_at: tag.created_at,
      usage_count: tag._count.post_tags,
    }));
  }
}
