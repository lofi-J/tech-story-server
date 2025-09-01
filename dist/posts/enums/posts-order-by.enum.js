"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get PostsOrderBy () {
        return PostsOrderBy;
    },
    get SortOrder () {
        return SortOrder;
    }
});
const _graphql = require("@nestjs/graphql");
var PostsOrderBy = /*#__PURE__*/ function(PostsOrderBy) {
    PostsOrderBy["LATEST"] = "latest";
    PostsOrderBy["UPDATED"] = "updated";
    PostsOrderBy["POPULAR_VIEWS"] = "popular_views";
    PostsOrderBy["POPULAR_LIKES"] = "popular_likes";
    PostsOrderBy["TITLE"] = "title";
    PostsOrderBy["ID"] = "id";
    return PostsOrderBy;
}({});
var SortOrder = /*#__PURE__*/ function(SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
    return SortOrder;
}({});
(0, _graphql.registerEnumType)(PostsOrderBy, {
    name: 'PostsOrderBy',
    description: '포스트 정렬 기준',
    valuesMap: {
        LATEST: {
            description: '최신순 (발행일 기준) - published 필드로 정렬'
        },
        UPDATED: {
            description: '업데이트순 (수정일 기준) - updated_at 필드로 정렬'
        },
        POPULAR_VIEWS: {
            description: '인기순 (조회수 기준) - post_stats.views로 정렬, stats가 없으면 0으로 처리'
        },
        POPULAR_LIKES: {
            description: '인기순 (좋아요 기준) - post_stats.likes로 정렬, stats가 없으면 0으로 처리'
        },
        TITLE: {
            description: '제목순 - title 필드로 정렬'
        },
        ID: {
            description: 'ID순 - id 필드로 정렬'
        }
    }
});
(0, _graphql.registerEnumType)(SortOrder, {
    name: 'SortOrder',
    description: '정렬 순서',
    valuesMap: {
        ASC: {
            description: '오름차순'
        },
        DESC: {
            description: '내림차순'
        }
    }
});

//# sourceMappingURL=posts-order-by.enum.js.map