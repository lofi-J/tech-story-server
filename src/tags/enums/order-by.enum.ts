import { registerEnumType } from '@nestjs/graphql';

export enum TagsOrderBy {
  CREATED_AT = 'created_at',
  TAG_NAME = 'tag_name',
  ID = 'id',
  POPULAR = 'popular',
}

registerEnumType(TagsOrderBy, {
  name: 'TagsOrderBy',
  description: '정렬 기준',
});
