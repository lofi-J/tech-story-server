import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetPostsInput } from './dto/posts.dto';
import { Post, PostsResponse } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostsResponse, { name: 'getAllPosts' })
  async getAllPosts(
    @Args('input') input: GetPostsInput,
  ): Promise<PostsResponse> {
    return await this.postsService.getAllPosts(input);
  }

  @Query(() => Post, { name: 'getPostBySlug', nullable: true })
  async getPostBySlug(@Args('slug') slug: string): Promise<Post | null> {
    return await this.postsService.getPostBySlug(slug);
  }

  @Query(() => PostsResponse, { name: 'getPostsByTag' })
  async getPostsByTag(@Args('tag') tag: string): Promise<PostsResponse> {
    return await this.postsService.getPostsByTag(tag);
  }
}
