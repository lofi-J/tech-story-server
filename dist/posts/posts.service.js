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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const posts_order_by_enum_1 = require("./enums/posts-order-by.enum");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllPosts(input) {
        const { limit, offset, orderBy, order, search } = input;
        const whereCondition = search
            ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { slug: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const posts = await this.getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset);
        const totalCount = await this.prisma.posts.count({
            where: whereCondition,
        });
        return {
            posts: posts.map((post) => ({
                id: post.id,
                slug: post.slug,
                title: post.title,
                description: post.description || '',
                thumbnail: post.thumbnail || null,
                published: post.published || undefined,
                updated_at: post.updated_at || undefined,
                hash_code: post.hash_code,
                tags: post.post_tags.map((pt) => ({
                    id: pt.tags.id,
                    tag_name: pt.tags.tag_name,
                    created_at: pt.tags.created_at || new Date(),
                    usage_count: undefined,
                })),
                category: post.categories?.category_name || '',
                stats: post.post_stats[0]
                    ? {
                        id: post.post_stats[0].id,
                        post_id: post.post_stats[0].post_id || undefined,
                        views: post.post_stats[0].views || 0,
                        likes: post.post_stats[0].likes || 0,
                        updated_at: post.post_stats[0].updated_at || undefined,
                    }
                    : {
                        views: 0,
                        likes: 0,
                    },
            })),
            totalCount,
            hasMore: offset + limit < totalCount,
        };
    }
    getOrderByCondition(orderBy, order) {
        const sortDirection = order === posts_order_by_enum_1.SortOrder.ASC ? client_1.Prisma.SortOrder.asc : client_1.Prisma.SortOrder.desc;
        switch (orderBy) {
            case posts_order_by_enum_1.PostsOrderBy.LATEST:
                return { published: sortDirection };
            case posts_order_by_enum_1.PostsOrderBy.UPDATED:
                return { updated_at: sortDirection };
            case posts_order_by_enum_1.PostsOrderBy.POPULAR_VIEWS:
                return { id: sortDirection };
            case posts_order_by_enum_1.PostsOrderBy.POPULAR_LIKES:
                return { id: sortDirection };
            case posts_order_by_enum_1.PostsOrderBy.TITLE:
                return { title: sortDirection };
            case posts_order_by_enum_1.PostsOrderBy.ID:
                return { id: sortDirection };
            default:
                return { published: client_1.Prisma.SortOrder.desc };
        }
    }
    async getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset) {
        if (orderBy === posts_order_by_enum_1.PostsOrderBy.POPULAR_VIEWS ||
            orderBy === posts_order_by_enum_1.PostsOrderBy.POPULAR_LIKES) {
            const sortField = orderBy === posts_order_by_enum_1.PostsOrderBy.POPULAR_VIEWS ? 'views' : 'likes';
            const sortDirection = order === posts_order_by_enum_1.SortOrder.ASC ? 'ASC' : 'DESC';
            const sortedPostIds = await this.prisma.$queryRaw `
        SELECT p.id
        FROM posts p
        LEFT JOIN post_stats ps ON p.id = ps.post_id
        ORDER BY COALESCE(ps.${client_1.Prisma.raw(sortField)}, 0) ${client_1.Prisma.raw(sortDirection)}, p.id ${client_1.Prisma.raw(sortDirection)}
        LIMIT ${limit} OFFSET ${offset}
      `;
            const postIds = sortedPostIds.map((p) => p.id);
            if (postIds.length === 0) {
                return [];
            }
            const posts = await this.prisma.posts.findMany({
                where: {
                    AND: [whereCondition, { id: { in: postIds } }],
                },
                include: {
                    categories: true,
                    post_tags: {
                        include: {
                            tags: true,
                        },
                        orderBy: {
                            tag_id: 'asc',
                        },
                    },
                    post_stats: true,
                },
            });
            return postIds
                .map((id) => posts.find((post) => post.id === id))
                .filter((post) => Boolean(post));
        }
        return await this.prisma.posts.findMany({
            where: whereCondition,
            take: limit,
            skip: offset,
            orderBy: this.getOrderByCondition(orderBy, order),
            include: {
                categories: true,
                post_tags: {
                    include: {
                        tags: true,
                    },
                    orderBy: {
                        tag_id: 'asc',
                    },
                },
                post_stats: true,
            },
        });
    }
    async getPostBySlug(slug) {
        const post = await this.prisma.posts.findUnique({
            where: { slug },
            include: {
                categories: true,
                post_tags: {
                    include: {
                        tags: true,
                    },
                },
                post_stats: true,
            },
        });
        if (!post) {
            return null;
        }
        return {
            id: post.id,
            slug: post.slug,
            title: post.title,
            description: post.description || '',
            thumbnail: post.thumbnail || null,
            published: post.published || undefined,
            updated_at: post.updated_at || undefined,
            hash_code: post.hash_code,
            category: post.categories?.category_name || '',
            tags: post.post_tags?.map((pt) => ({
                id: pt.tags.id,
                tag_name: pt.tags.tag_name,
                created_at: pt.tags.created_at || new Date(),
                usage_count: undefined,
            })) || [],
            stats: post.post_stats?.[0]
                ? {
                    id: post.post_stats[0].id,
                    post_id: post.post_stats[0].post_id || undefined,
                    views: post.post_stats[0].views || 0,
                    likes: post.post_stats[0].likes || 0,
                    updated_at: post.post_stats[0].updated_at || undefined,
                }
                : {
                    views: 0,
                    likes: 0,
                },
        };
    }
    async getPostsByTag(input) {
        const { tagName, limit, offset, orderBy, order } = input;
        const whereCondition = {
            post_tags: {
                some: {
                    tags: {
                        tag_name: tagName,
                    },
                },
            },
        };
        const posts = await this.getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset);
        const totalCount = await this.prisma.posts.count({
            where: whereCondition,
        });
        return {
            posts: posts.map((post) => ({
                id: post.id,
                slug: post.slug,
                title: post.title,
                description: post.description || '',
                thumbnail: post.thumbnail,
                published: post.published ?? undefined,
                updated_at: post.updated_at ?? undefined,
                hash_code: post.hash_code,
                tags: post.post_tags.map((pt) => ({
                    id: pt.tags.id,
                    tag_name: pt.tags.tag_name,
                    created_at: pt.tags.created_at || new Date(),
                    usage_count: undefined,
                })),
                category: post.categories?.category_name || '',
                stats: post.post_stats[0]
                    ? {
                        id: post.post_stats[0].id,
                        post_id: post.post_stats[0].post_id ?? undefined,
                        views: post.post_stats[0].views || 0,
                        likes: post.post_stats[0].likes || 0,
                        updated_at: post.post_stats[0].updated_at ?? undefined,
                    }
                    : {
                        views: 0,
                        likes: 0,
                    },
            })),
            totalCount,
            hasMore: offset + limit < totalCount,
        };
    }
    async getPostsByCategory(input) {
        const { categoryName, limit, offset, orderBy, order } = input;
        const whereCondition = {
            categories: {
                category_name: categoryName,
            },
        };
        const categoryPosts = await this.getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset);
        const totalCount = await this.prisma.posts.count({
            where: whereCondition,
        });
        return {
            posts: categoryPosts.map((post) => ({
                id: post.id,
                slug: post.slug,
                title: post.title,
                description: post.description || '',
                thumbnail: post.thumbnail,
                published: post.published || undefined,
                updated_at: post.updated_at || undefined,
                hash_code: post.hash_code,
                category: post.categories?.category_name || '',
                tags: post.post_tags.map((pt) => ({
                    id: pt.tags.id,
                    tag_name: pt.tags.tag_name,
                    created_at: pt.tags.created_at || new Date(),
                    usage_count: undefined,
                })),
                stats: post.post_stats[0]
                    ? {
                        id: post.post_stats[0].id,
                        post_id: post.post_stats[0].post_id || undefined,
                        views: post.post_stats[0].views || 0,
                        likes: post.post_stats[0].likes || 0,
                        updated_at: post.post_stats[0].updated_at || undefined,
                    }
                    : {
                        views: 0,
                        likes: 0,
                    },
            })),
            totalCount,
            hasMore: offset + limit < totalCount,
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map