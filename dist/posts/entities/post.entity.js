"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsResponse = exports.Post = void 0;
const graphql_1 = require("@nestjs/graphql");
const post_stats_entity_1 = require("../../post-stats/entities/post-stats.entity");
const tags_entity_1 = require("../../tags/entities/tags.entity");
let Post = class Post {
    id;
    slug;
    title;
    description;
    thumbnail;
    published;
    updated_at;
    hash_code;
    tags;
    category;
    stats;
};
exports.Post = Post;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Post.prototype, "thumbnail", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Post.prototype, "published", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Post.prototype, "updated_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "hash_code", void 0);
__decorate([
    (0, graphql_1.Field)(() => [tags_entity_1.Tags], { nullable: true }),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, description: '첫 번째 태그를 카테고리로 사용' }),
    __metadata("design:type", String)
], Post.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => post_stats_entity_1.PostStats, { nullable: true }),
    __metadata("design:type", post_stats_entity_1.PostStats)
], Post.prototype, "stats", void 0);
exports.Post = Post = __decorate([
    (0, graphql_1.ObjectType)()
], Post);
let PostsResponse = class PostsResponse {
    posts;
    totalCount;
    hasMore;
};
exports.PostsResponse = PostsResponse;
__decorate([
    (0, graphql_1.Field)(() => [Post]),
    __metadata("design:type", Array)
], PostsResponse.prototype, "posts", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PostsResponse.prototype, "totalCount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PostsResponse.prototype, "hasMore", void 0);
exports.PostsResponse = PostsResponse = __decorate([
    (0, graphql_1.ObjectType)()
], PostsResponse);
//# sourceMappingURL=post.entity.js.map