import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostStats } from './entities/post-stats.entity';
import { PostStatsService } from './post-stats.service';

@Resolver(() => PostStats)
export class PostStatsResolver {
  constructor(private readonly postStatsService: PostStatsService) {}

  @Mutation(() => PostStats)
  async increasePostViews(@Args('slug', { type: () => String }) slug: string) {
    return await this.postStatsService.increasePostViews(slug);
  }

  @Mutation(() => PostStats)
  async increasePostLikes(@Args('slug', { type: () => String }) slug: string) {
    return await this.postStatsService.increasePostLikes(slug);
  }
}
