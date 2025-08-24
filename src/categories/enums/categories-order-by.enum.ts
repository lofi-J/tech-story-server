import { registerEnumType } from '@nestjs/graphql';

export enum CategoriesOrderBy {
  CREATED_AT = 'created_at',
  CATEGORY_NAME = 'category_name',
  ID = 'id',
  POPULAR = 'popular',
}

registerEnumType(CategoriesOrderBy, {
  name: 'CategoriesOrderBy',
  description: '카테고리 정렬 기준',
});
