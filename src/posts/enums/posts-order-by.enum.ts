import { registerEnumType } from '@nestjs/graphql';

export enum PostsOrderBy {
  LATEST = 'latest', // 최신순 (published 기준)
  UPDATED = 'updated', // 업데이트순 (updated_at 기준)
  POPULAR_VIEWS = 'popular_views', // 인기순 (조회수 기준)
  POPULAR_LIKES = 'popular_likes', // 인기순 (좋아요 기준)
  TITLE = 'title', // 제목순
  ID = 'id', // ID순
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(PostsOrderBy, {
  name: 'PostsOrderBy',
  description: '포스트 정렬 기준',
  valuesMap: {
    LATEST: {
      description: '최신순 (발행일 기준)',
    },
    UPDATED: {
      description: '업데이트순 (수정일 기준)',
    },
    POPULAR_VIEWS: {
      description: '인기순 (조회수 기준)',
    },
    POPULAR_LIKES: {
      description: '인기순 (좋아요 기준)',
    },
    TITLE: {
      description: '제목순',
    },
    ID: {
      description: 'ID순',
    },
  },
});

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: '정렬 순서',
  valuesMap: {
    ASC: {
      description: '오름차순',
    },
    DESC: {
      description: '내림차순',
    },
  },
});
