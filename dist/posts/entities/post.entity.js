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
    get Post () {
        return Post;
    },
    get PostsResponse () {
        return PostsResponse;
    }
});
const _graphql = require("@nestjs/graphql");
const _poststatsentity = require("../../post-stats/entities/post-stats.entity");
const _tagsentity = require("../../tags/entities/tags.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Post = class Post {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], Post.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], Post.prototype, "slug", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], Post.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], Post.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Post.prototype, "thumbnail", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Post.prototype, "published", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Post.prototype, "updated_at", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], Post.prototype, "hash_code", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _tagsentity.Tags
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], Post.prototype, "tags", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true,
        description: '첫 번째 태그를 카테고리로 사용'
    }),
    _ts_metadata("design:type", String)
], Post.prototype, "category", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_poststatsentity.PostStats, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _poststatsentity.PostStats === "undefined" ? Object : _poststatsentity.PostStats)
], Post.prototype, "stats", void 0);
Post = _ts_decorate([
    (0, _graphql.ObjectType)()
], Post);
let PostsResponse = class PostsResponse {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            Post
        ]),
    _ts_metadata("design:type", Array)
], PostsResponse.prototype, "posts", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], PostsResponse.prototype, "totalCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], PostsResponse.prototype, "hasMore", void 0);
PostsResponse = _ts_decorate([
    (0, _graphql.ObjectType)()
], PostsResponse);

//# sourceMappingURL=post.entity.js.map