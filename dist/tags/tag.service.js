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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const order_by_enum_1 = require("./enums/order-by.enum");
let TagsService = class TagsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllTags(orderBy) {
        if (orderBy === order_by_enum_1.TagsOrderBy.POPULAR) {
            const tagsWithCount = await this.prisma.tags.findMany({
                include: {
                    _count: {
                        select: {
                            post_tags: true,
                        },
                    },
                },
                orderBy: {
                    post_tags: {
                        _count: 'desc',
                    },
                },
            });
            return tagsWithCount.map((tag) => ({
                id: tag.id,
                tag_name: tag.tag_name,
                created_at: tag.created_at,
                usage_count: tag._count.post_tags,
            }));
        }
        else {
            const tags = await this.prisma.tags.findMany({
                orderBy: { [orderBy]: 'desc' },
            });
            return tags.map((tag) => ({
                id: tag.id,
                tag_name: tag.tag_name,
                created_at: tag.created_at,
                usage_count: undefined,
            }));
        }
    }
    async getPopularTags(limit = 10) {
        return await this.prisma.tags.findMany({
            include: {
                _count: {
                    select: {
                        post_tags: true,
                    },
                },
            },
            orderBy: {
                post_tags: {
                    _count: 'desc',
                },
            },
            take: limit,
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
                        post_tags: true,
                    },
                },
            },
            orderBy: {
                post_tags: {
                    _count: 'desc',
                },
            },
        });
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagsService);
//# sourceMappingURL=tag.service.js.map