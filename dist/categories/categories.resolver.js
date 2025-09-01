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
exports.CategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const categories_service_1 = require("./categories.service");
const categories_entity_1 = require("./entities/categories.entity");
const categories_order_by_enum_1 = require("./enums/categories-order-by.enum");
let CategoriesResolver = class CategoriesResolver {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getAllCategories(orderBy) {
        return await this.categoriesService.getAllCategories(orderBy);
    }
    async getPopularCategories(limit) {
        const popularCategories = await this.categoriesService.getPopularCategories(limit);
        return popularCategories.map((category) => ({
            ...category,
            usage_count: category._count.posts,
        }));
    }
    async getCategoryUsageStats() {
        const categoryStats = await this.categoriesService.getCategoryUsageStats();
        return categoryStats.map((category) => ({
            id: category.id,
            category_name: category.category_name,
            created_at: category.created_at,
            usage_count: category._count.posts,
        }));
    }
};
exports.CategoriesResolver = CategoriesResolver;
__decorate([
    (0, graphql_1.Query)(() => [categories_entity_1.Categories]),
    __param(0, (0, graphql_1.Args)('orderBy', {
        type: () => categories_order_by_enum_1.CategoriesOrderBy,
        defaultValue: categories_order_by_enum_1.CategoriesOrderBy.CREATED_AT,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getAllCategories", null);
__decorate([
    (0, graphql_1.Query)(() => [categories_entity_1.Categories], { name: 'popularCategories' }),
    __param(0, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, defaultValue: 10 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getPopularCategories", null);
__decorate([
    (0, graphql_1.Query)(() => [categories_entity_1.Categories], { name: 'categoryUsageStats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getCategoryUsageStats", null);
exports.CategoriesResolver = CategoriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => categories_entity_1.Categories),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesResolver);
//# sourceMappingURL=categories.resolver.js.map