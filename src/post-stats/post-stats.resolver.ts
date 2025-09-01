import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import type { Request } from 'express';
import { PostStats } from './entities/post-stats.entity';
import { PostStatsService } from './post-stats.service';

@Resolver(() => PostStats)
export class PostStatsResolver {
  constructor(private readonly postStatsService: PostStatsService) {}

  @Mutation(() => PostStats)
  async increasePostViews(
    @Args('slug', { type: () => String }) slug: string,
    @Context() context: { req: Request },
  ) {
    return await this.postStatsService.increasePostViews(slug, context.req);
  }

  @Mutation(() => PostStats)
  async increasePostLikes(
    @Args('slug', { type: () => String }) slug: string,
    @Context() context: { req: Request },
  ) {
    return await this.postStatsService.increasePostLikes(slug, context.req);
  }
}
