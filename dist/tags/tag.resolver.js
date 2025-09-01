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
exports.TagsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tags_entity_1 = require("./entities/tags.entity");
const order_by_enum_1 = require("./enums/order-by.enum");
const tag_service_1 = require("./tag.service");
let TagsResolver = class TagsResolver {
    tagsService;
    constructor(tagsService) {
        this.tagsService = tagsService;
    }
    async getAllTags(orderBy) {
        return await this.tagsService.getAllTags(orderBy);
    }
    async getPopularTags(limit) {
        const popularTags = await this.tagsService.getPopularTags(limit);
        return popularTags.map((tag) => ({
            ...tag,
            usage_count: tag._count.post_tags,
        }));
    }
    async getTagUsageStats() {
        const tagStats = await this.tagsService.getTagUsageStats();
        return tagStats.map((tag) => ({
            id: tag.id,
            tag_name: tag.tag_name,
            created_at: tag.created_at,
            usage_count: tag._count.post_tags,
        }));
    }
};
exports.TagsResolver = TagsResolver;
__decorate([
    (0, graphql_1.Query)(() => [tags_entity_1.Tags]),
    __param(0, (0, graphql_1.Args)('orderBy', {
        type: () => order_by_enum_1.TagsOrderBy,
        defaultValue: order_by_enum_1.TagsOrderBy.CREATED_AT,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagsResolver.prototype, "getAllTags", null);
__decorate([
    (0, graphql_1.Query)(() => [tags_entity_1.Tags], { name: 'popularTags' }),
    __param(0, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, defaultValue: 10 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagsResolver.prototype, "getPopularTags", null);
__decorate([
    (0, graphql_1.Query)(() => [tags_entity_1.Tags], { name: 'tagUsageStats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagsResolver.prototype, "getTagUsageStats", null);
exports.TagsResolver = TagsResolver = __decorate([
    (0, graphql_1.Resolver)(() => tags_entity_1.Tags),
    __metadata("design:paramtypes", [tag_service_1.TagsService])
], TagsResolver);
//# sourceMappingURL=tag.resolver.js.map