import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Categories {
  @Field(() => Int)
  id: number;

  @Field()
  category_name: string;

  @Field()
  created_at: Date;

  @Field(() => Int, { nullable: true })
  usage_count?: number; // 카테고리 사용 횟수 (선택적 필드)
}
