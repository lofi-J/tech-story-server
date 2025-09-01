import { Field, Int, ObjectType } from '@nestjs/graphql';

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
