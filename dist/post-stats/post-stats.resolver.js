"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostStatsResolver", {
    enumerable: true,
    get: function() {
        return PostStatsResolver;
    }
});
const _graphql = require("@nestjs/graphql");
const _poststatsentity = require("./entities/post-stats.entity");
const _poststatsservice = require("./post-stats.service");
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
let PostStatsResolver = class PostStatsResolver {
    async increasePostViews(slug, context) {
        return await this.postStatsService.increasePostViews(slug, context.req);
    }
    async increasePostLikes(slug, context) {
        return await this.postStatsService.increasePostLikes(slug, context.req);
    }
    constructor(postStatsService){
        this.postStatsService = postStatsService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_poststatsentity.PostStats),
    _ts_param(0, (0, _graphql.Args)('slug', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PostStatsResolver.prototype, "increasePostViews", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_poststatsentity.PostStats),
    _ts_param(0, (0, _graphql.Args)('slug', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PostStatsResolver.prototype, "increasePostLikes", null);
PostStatsResolver = _ts_decorate([
    (0, _graphql.Resolver)(()=>_poststatsentity.PostStats),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _poststatsservice.PostStatsService === "undefined" ? Object : _poststatsservice.PostStatsService
    ])
], PostStatsResolver);

//# sourceMappingURL=post-stats.resolver.js.map