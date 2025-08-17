import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PostsOrderBy, SortOrder } from '../enums/posts-order-by.enum';

@InputType()
export class GetPostsInput {
  @Field(() => Int, { defaultValue: 10, description: '가져올 포스트 수' })
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number = 10;

  @Field(() => Int, { defaultValue: 0, description: '건너뛸 포스트 수' })
  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @Field(() => PostsOrderBy, {
    defaultValue: PostsOrderBy.LATEST,
    description: '정렬 기준',
  })
  @IsEnum(PostsOrderBy)
  @IsOptional()
  orderBy: PostsOrderBy = PostsOrderBy.LATEST;

  @Field(() => SortOrder, {
    defaultValue: SortOrder.DESC,
    description: '정렬 순서',
  })
  @IsEnum(SortOrder)
  @IsOptional()
  order: SortOrder = SortOrder.DESC;

  @Field(() => String, { nullable: true, description: '검색 키워드' })
  @IsString()
  @IsOptional()
  search?: string;
}
