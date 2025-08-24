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
      description: '최신순 (발행일 기준) - published 필드로 정렬',
    },
    UPDATED: {
      description: '업데이트순 (수정일 기준) - updated_at 필드로 정렬',
    },
    POPULAR_VIEWS: {
      description:
        '인기순 (조회수 기준) - post_stats.views로 정렬, stats가 없으면 0으로 처리',
    },
    POPULAR_LIKES: {
      description:
        '인기순 (좋아요 기준) - post_stats.likes로 정렬, stats가 없으면 0으로 처리',
    },
    TITLE: {
      description: '제목순 - title 필드로 정렬',
    },
    ID: {
      description: 'ID순 - id 필드로 정렬',
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
