"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagsResolver", {
    enumerable: true,
    get: function() {
        return TagsResolver;
    }
});
const _graphql = require("@nestjs/graphql");
const _tagsentity = require("./entities/tags.entity");
const _orderbyenum = require("./enums/order-by.enum");
const _tagservice = require("./tag.service");
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
let TagsResolver = class TagsResolver {
    async getAllTags(orderBy) {
        return await this.tagsService.getAllTags(orderBy);
    }
    async getPopularTags(limit) {
        const popularTags = await this.tagsService.getPopularTags(limit);
        return popularTags.map((tag)=>({
                ...tag,
                usage_count: tag._count.post_tags
            }));
    }
    async getTagUsageStats() {
        const tagStats = await this.tagsService.getTagUsageStats();
        return tagStats.map((tag)=>({
                id: tag.id,
                tag_name: tag.tag_name,
                created_at: tag.created_at,
                usage_count: tag._count.post_tags
            }));
    }
    constructor(tagsService){
        this.tagsService = tagsService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _tagsentity.Tags
        ]),
    _ts_param(0, (0, _graphql.Args)('orderBy', {
        type: ()=>_orderbyenum.TagsOrderBy,
        defaultValue: _orderbyenum.TagsOrderBy.CREATED_AT
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _orderbyenum.TagsOrderBy === "undefined" ? Object : _orderbyenum.TagsOrderBy
    ]),
    _ts_metadata("design:returntype", Promise)
], TagsResolver.prototype, "getAllTags", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _tagsentity.Tags
        ], {
        name: 'popularTags'
    }),
    _ts_param(0, (0, _graphql.Args)('limit', {
        type: ()=>_graphql.Int,
        defaultValue: 10
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], TagsResolver.prototype, "getPopularTags", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _tagsentity.Tags
        ], {
        name: 'tagUsageStats'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], TagsResolver.prototype, "getTagUsageStats", null);
TagsResolver = _ts_decorate([
    (0, _graphql.Resolver)(()=>_tagsentity.Tags),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _tagservice.TagsService === "undefined" ? Object : _tagservice.TagsService
    ])
], TagsResolver);

//# sourceMappingURL=tag.resolver.js.map