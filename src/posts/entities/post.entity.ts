import { Field, Int, ObjectType } from '@nestjs/graphql';

// Tag 타입을 Tags로 통일하기 위해 import 사용
import { PostStats } from '../../post-stats/entities/post-stats.entity';
import { Tags } from '../../tags/entities/tags.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  thumbnail: string | null;

  @Field({ nullable: true })
  published?: Date;

  @Field({ nullable: true })
  updated_at?: Date;

  @Field()
  hash_code: string; // BigInt를 문자열로 처리

  @Field(() => [Tags], { nullable: true })
  tags?: Tags[];

  @Field({ nullable: true, description: '첫 번째 태그를 카테고리로 사용' })
  category?: string;

  @Field(() => PostStats, { nullable: true })
  stats?: PostStats;
}

@ObjectType()
export class PostsResponse {
  @Field(() => [Post])
  posts: Post[];

  @Field(() => Int)
  totalCount: number;

  @Field()
  hasMore: boolean;
}
