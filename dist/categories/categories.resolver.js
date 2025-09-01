"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CategoriesResolver", {
    enumerable: true,
    get: function() {
        return CategoriesResolver;
    }
});
const _graphql = require("@nestjs/graphql");
const _categoriesservice = require("./categories.service");
const _categoriesentity = require("./entities/categories.entity");
const _categoriesorderbyenum = require("./enums/categories-order-by.enum");
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
let CategoriesResolver = class CategoriesResolver {
    async getAllCategories(orderBy) {
        return await this.categoriesService.getAllCategories(orderBy);
    }
    async getPopularCategories(limit) {
        const popularCategories = await this.categoriesService.getPopularCategories(limit);
        return popularCategories.map((category)=>({
                ...category,
                usage_count: category._count.posts
            }));
    }
    async getCategoryUsageStats() {
        const categoryStats = await this.categoriesService.getCategoryUsageStats();
        return categoryStats.map((category)=>({
                id: category.id,
                category_name: category.category_name,
                created_at: category.created_at,
                usage_count: category._count.posts
            }));
    }
    constructor(categoriesService){
        this.categoriesService = categoriesService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _categoriesentity.Categories
        ]),
    _ts_param(0, (0, _graphql.Args)('orderBy', {
        type: ()=>_categoriesorderbyenum.CategoriesOrderBy,
        defaultValue: _categoriesorderbyenum.CategoriesOrderBy.CREATED_AT
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _categoriesorderbyenum.CategoriesOrderBy === "undefined" ? Object : _categoriesorderbyenum.CategoriesOrderBy
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getAllCategories", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _categoriesentity.Categories
        ], {
        name: 'popularCategories'
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
], CategoriesResolver.prototype, "getPopularCategories", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _categoriesentity.Categories
        ], {
        name: 'categoryUsageStats'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getCategoryUsageStats", null);
CategoriesResolver = _ts_decorate([
    (0, _graphql.Resolver)(()=>_categoriesentity.Categories),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _categoriesservice.CategoriesService === "undefined" ? Object : _categoriesservice.CategoriesService
    ])
], CategoriesResolver);

//# sourceMappingURL=categories.resolver.js.map