import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field()
  tag_name: string;

  @Field({ nullable: true })
  created_at?: Date;
}

@ObjectType()
export class PostStats {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  post_id?: number;

  @Field(() => Int, { defaultValue: 0 })
  views: number;

  @Field(() => Int, { defaultValue: 0 })
  likes: number;

  @Field({ nullable: true })
  updated_at?: Date;
}

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  published?: Date;

  @Field({ nullable: true })
  updated_at?: Date;

  @Field()
  hash_code: string; // BigInt를 문자열로 처리

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];

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
