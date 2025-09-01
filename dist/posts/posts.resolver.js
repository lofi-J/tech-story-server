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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const posts_dto_1 = require("./dto/posts.dto");
const post_entity_1 = require("./entities/post.entity");
const posts_service_1 = require("./posts.service");
let PostsResolver = class PostsResolver {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getAllPosts(input) {
        return await this.postsService.getAllPosts(input);
    }
    async getPostBySlug(slug) {
        return await this.postsService.getPostBySlug(slug);
    }
    async getPostsByTag(input) {
        return await this.postsService.getPostsByTag(input);
    }
    async getPostsByCategory(input) {
        return await this.postsService.getPostsByCategory(input);
    }
};
exports.PostsResolver = PostsResolver;
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.PostsResponse, { name: 'getAllPosts' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetPostsInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getAllPosts", null);
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.Post, { name: 'getPostBySlug', nullable: true }),
    __param(0, (0, graphql_1.Args)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostBySlug", null);
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.PostsResponse, { name: 'getPostsByTag' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetPostsByTagInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostsByTag", null);
__decorate([
    (0, graphql_1.Query)(() => post_entity_1.PostsResponse, { name: 'getPostsByCategory' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetPostsByCategoryInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostsByCategory", null);
exports.PostsResolver = PostsResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_entity_1.Post),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolver);
//# sourceMappingURL=posts.resolver.js.map