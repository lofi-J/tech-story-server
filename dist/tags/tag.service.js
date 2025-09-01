"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagsService", {
    enumerable: true,
    get: function() {
        return TagsService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _orderbyenum = require("./enums/order-by.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TagsService = class TagsService {
    async getAllTags(orderBy) {
        if (orderBy === _orderbyenum.TagsOrderBy.POPULAR) {
            // 인기순 정렬 (사용 횟수 기준)
            const tagsWithCount = await this.prisma.tags.findMany({
                include: {
                    _count: {
                        select: {
                            post_tags: true
                        }
                    }
                },
                orderBy: {
                    post_tags: {
                        _count: 'desc'
                    }
                }
            });
            return tagsWithCount.map((tag)=>({
                    id: tag.id,
                    tag_name: tag.tag_name,
                    created_at: tag.created_at,
                    usage_count: tag._count.post_tags
                }));
        } else {
            // 기존 정렬 방식
            const tags = await this.prisma.tags.findMany({
                orderBy: {
                    [orderBy]: 'desc'
                }
            });
            return tags.map((tag)=>({
                    id: tag.id,
                    tag_name: tag.tag_name,
                    created_at: tag.created_at,
                    usage_count: undefined
                }));
        }
    }
    async getPopularTags(limit = 10) {
        return await this.prisma.tags.findMany({
            include: {
                _count: {
                    select: {
                        post_tags: true
                    }
                }
            },
            orderBy: {
                post_tags: {
                    _count: 'desc'
                }
            },
            take: limit
        });
    }
    async getTagUsageStats() {
        return await this.prisma.tags.findMany({
            select: {
                id: true,
                tag_name: true,
                created_at: true,
                _count: {
                    select: {
                        post_tags: true
                    }
                }
            },
            orderBy: {
                post_tags: {
                    _count: 'desc'
                }
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
TagsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], TagsService);

//# sourceMappingURL=tag.service.js.map