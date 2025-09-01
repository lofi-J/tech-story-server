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
    get GetPostsByCategoryInput () {
        return GetPostsByCategoryInput;
    },
    get GetPostsByTagInput () {
        return GetPostsByTagInput;
    },
    get GetPostsInput () {
        return GetPostsInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _postsorderbyenum = require("../enums/posts-order-by.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GetPostsInput = class GetPostsInput {
    constructor(){
        this.limit = 10;
        this.offset = 0;
        this.orderBy = _postsorderbyenum.PostsOrderBy.LATEST;
        this.order = _postsorderbyenum.SortOrder.DESC;
    }
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 10,
        description: '가져올 포스트 수'
    }),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], GetPostsInput.prototype, "limit", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 0,
        description: '건너뛸 포스트 수'
    }),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], GetPostsInput.prototype, "offset", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_postsorderbyenum.PostsOrderBy, {
        defaultValue: _postsorderbyenum.PostsOrderBy.LATEST,
        description: '정렬 기준'
    }),
    (0, _classvalidator.IsEnum)(_postsorderbyenum.PostsOrderBy),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _postsorderbyenum.PostsOrderBy === "undefined" ? Object : _postsorderbyenum.PostsOrderBy)
], GetPostsInput.prototype, "orderBy", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_postsorderbyenum.SortOrder, {
        defaultValue: _postsorderbyenum.SortOrder.DESC,
        description: '정렬 순서'
    }),
    (0, _classvalidator.IsEnum)(_postsorderbyenum.SortOrder),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _postsorderbyenum.SortOrder === "undefined" ? Object : _postsorderbyenum.SortOrder)
], GetPostsInput.prototype, "order", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true,
        description: '검색 키워드'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], GetPostsInput.prototype, "search", void 0);
GetPostsInput = _ts_decorate([
    (0, _graphql.InputType)()
], GetPostsInput);
let GetPostsByTagInput = class GetPostsByTagInput {
    constructor(){
        this.limit = 10;
        this.offset = 0;
        this.orderBy = _postsorderbyenum.PostsOrderBy.LATEST;
        this.order = _postsorderbyenum.SortOrder.DESC;
    }
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: '태그 이름'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], GetPostsByTagInput.prototype, "tagName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 10,
        description: '가져올 포스트 수'
    }),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], GetPostsByTagInput.prototype, "limit", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 0,
        description: '건너뛸 포스트 수'
    }),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], GetPostsByTagInput.prototype, "offset", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_postsorderbyenum.PostsOrderBy, {
        defaultValue: _postsorderbyenum.PostsOrderBy.LATEST,
        description: '정렬 기준'
    }),
    (0, _classvalidator.IsEnum)(_postsorderbyenum.PostsOrderBy),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _postsorderbyenum.PostsOrderBy === "undefined" ? Object : _postsorderbyenum.PostsOrderBy)
], GetPostsByTagInput.prototype, "orderBy", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_postsorderbyenum.SortOrder, {
        defaultValue: _postsorderbyenum.SortOrder.DESC,
        description: '정렬 순서'
    }),
    (0, _classvalidator.IsEnum)(_postsorderbyenum.SortOrder),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _postsorderbyenum.SortOrder === "undefined" ? Object : _postsorderbyenum.SortOrder)
], GetPostsByTagInput.prototype, "order", void 0);
GetPostsByTagInput = _ts_decorate([
    (0, _graphql.InputType)()
], GetPostsByTagInput);
let GetPostsByCategoryInput = class GetPostsByCategoryInput {
    constructor(){
        this.limit = 10;
        this.offset = 0;
        this.orderBy = _postsorderbyenum.PostsOrderBy.LATEST;
        this.order = _postsorderbyenum.SortOrder.DESC;
    }
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: '카테고리 이름'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], GetPostsByCategoryInput.prototype, "categoryName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 10,
        description: '가져올 포스트 수'
    }),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], GetPostsByCategoryInput.prototype, "limit", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 0,
        description: '건너뛸 포스트 수'
    }),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], GetPostsByCategoryInput.prototype, "offset", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_postsorderbyenum.PostsOrderBy, {
        defaultValue: _postsorderbyenum.PostsOrderBy.LATEST,
        description: '정렬 기준'
    }),
    (0, _classvalidator.IsEnum)(_postsorderbyenum.PostsOrderBy),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _postsorderbyenum.PostsOrderBy === "undefined" ? Object : _postsorderbyenum.PostsOrderBy)
], GetPostsByCategoryInput.prototype, "orderBy", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_postsorderbyenum.SortOrder, {
        defaultValue: _postsorderbyenum.SortOrder.DESC,
        description: '정렬 순서'
    }),
    (0, _classvalidator.IsEnum)(_postsorderbyenum.SortOrder),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _postsorderbyenum.SortOrder === "undefined" ? Object : _postsorderbyenum.SortOrder)
], GetPostsByCategoryInput.prototype, "order", void 0);
GetPostsByCategoryInput = _ts_decorate([
    (0, _graphql.InputType)()
], GetPostsByCategoryInput);

//# sourceMappingURL=posts.dto.js.map