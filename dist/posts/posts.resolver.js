"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostsResolver", {
    enumerable: true,
    get: function() {
        return PostsResolver;
    }
});
const _graphql = require("@nestjs/graphql");
const _postsdto = require("./dto/posts.dto");
const _postentity = require("./entities/post.entity");
const _postsservice = require("./posts.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let PostsResolver = class PostsResolver {
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
    constructor(postsService){
        this.postsService = postsService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_postentity.PostsResponse, {
        name: 'getAllPosts'
    }),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsdto.GetPostsInput === "undefined" ? Object : _postsdto.GetPostsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsResolver.prototype, "getAllPosts", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_postentity.Post, {
        name: 'getPostBySlug',
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)('slug')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostBySlug", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_postentity.PostsResponse, {
        name: 'getPostsByTag'
    }),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsdto.GetPostsByTagInput === "undefined" ? Object : _postsdto.GetPostsByTagInput
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostsByTag", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_postentity.PostsResponse, {
        name: 'getPostsByCategory'
    }),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsdto.GetPostsByCategoryInput === "undefined" ? Object : _postsdto.GetPostsByCategoryInput
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostsByCategory", null);
PostsResolver = _ts_decorate([
    (0, _graphql.Resolver)(()=>_postentity.Post),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsservice.PostsService === "undefined" ? Object : _postsservice.PostsService
    ])
], PostsResolver);

//# sourceMappingURL=posts.resolver.js.map