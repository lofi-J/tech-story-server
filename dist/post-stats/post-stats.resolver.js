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
exports.PostStatsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const post_stats_entity_1 = require("./entities/post-stats.entity");
const post_stats_service_1 = require("./post-stats.service");
let PostStatsResolver = class PostStatsResolver {
    postStatsService;
    constructor(postStatsService) {
        this.postStatsService = postStatsService;
    }
    async increasePostViews(slug, context) {
        return await this.postStatsService.increasePostViews(slug, context.req);
    }
    async increasePostLikes(slug, context) {
        return await this.postStatsService.increasePostLikes(slug, context.req);
    }
};
exports.PostStatsResolver = PostStatsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => post_stats_entity_1.PostStats),
    __param(0, (0, graphql_1.Args)('slug', { type: () => String })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostStatsResolver.prototype, "increasePostViews", null);
__decorate([
    (0, graphql_1.Mutation)(() => post_stats_entity_1.PostStats),
    __param(0, (0, graphql_1.Args)('slug', { type: () => String })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostStatsResolver.prototype, "increasePostLikes", null);
exports.PostStatsResolver = PostStatsResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_stats_entity_1.PostStats),
    __metadata("design:paramtypes", [post_stats_service_1.PostStatsService])
], PostStatsResolver);
//# sourceMappingURL=post-stats.resolver.js.map