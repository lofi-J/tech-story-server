import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tags {
  @Field(() => Int)
  id: number;

  @Field()
  tag_name: string;

  @Field()
  created_at: Date;

  @Field(() => Int, { nullable: true })
  usage_count?: number; // 태그 사용 횟수 (선택적 필드)
}
