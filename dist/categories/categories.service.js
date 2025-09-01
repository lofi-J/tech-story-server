"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CategoriesService", {
    enumerable: true,
    get: function() {
        return CategoriesService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
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
let CategoriesService = class CategoriesService {
    async getAllCategories(orderBy) {
        if (orderBy === _categoriesorderbyenum.CategoriesOrderBy.POPULAR) {
            // 인기순 정렬 (사용 횟수 기준)
            const categoriesWithCount = await this.prisma.categories.findMany({
                include: {
                    _count: {
                        select: {
                            posts: true
                        }
                    }
                },
                orderBy: {
                    posts: {
                        _count: 'desc'
                    }
                }
            });
            return categoriesWithCount.map((category)=>({
                    id: category.id,
                    category_name: category.category_name,
                    created_at: category.created_at,
                    usage_count: category._count.posts
                }));
        } else {
            // 기존 정렬 방식
            const categories = await this.prisma.categories.findMany({
                orderBy: {
                    [orderBy]: 'desc'
                }
            });
            return categories.map((category)=>({
                    id: category.id,
                    category_name: category.category_name,
                    created_at: category.created_at,
                    usage_count: undefined
                }));
        }
    }
    async getPopularCategories(limit = 10) {
        return await this.prisma.categories.findMany({
            include: {
                _count: {
                    select: {
                        posts: true
                    }
                }
            },
            orderBy: {
                posts: {
                    _count: 'desc'
                }
            },
            take: limit
        });
    }
    async getCategoryUsageStats() {
        return await this.prisma.categories.findMany({
            select: {
                id: true,
                category_name: true,
                created_at: true,
                _count: {
                    select: {
                        posts: true
                    }
                }
            },
            orderBy: {
                posts: {
                    _count: 'desc'
                }
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
CategoriesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], CategoriesService);

//# sourceMappingURL=categories.service.js.map