"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostsService", {
    enumerable: true,
    get: function() {
        return PostsService;
    }
});
const _common = require("@nestjs/common");
const _client = require("@prisma/client");
const _prismaservice = require("../prisma/prisma.service");
const _postsorderbyenum = require("./enums/posts-order-by.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PostsService = class PostsService {
    async getAllPosts(input) {
        const { limit, offset, orderBy, order, search } = input;
        // 검색 조건 설정
        const whereCondition = search ? {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    slug: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        } : {};
        // 포스트 조회 (인기도 정렬 지원)
        const posts = await this.getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset);
        // 전체 개수 조회
        const totalCount = await this.prisma.posts.count({
            where: whereCondition
        });
        return {
            posts: posts.map((post)=>({
                    id: post.id,
                    slug: post.slug,
                    title: post.title,
                    description: post.description || '',
                    thumbnail: post.thumbnail || null,
                    published: post.published || undefined,
                    updated_at: post.updated_at || undefined,
                    hash_code: post.hash_code,
                    tags: post.post_tags.map((pt)=>({
                            id: pt.tags.id,
                            tag_name: pt.tags.tag_name,
                            created_at: pt.tags.created_at || new Date(),
                            usage_count: undefined
                        })),
                    category: post.categories?.category_name || '',
                    stats: post.post_stats[0] ? {
                        id: post.post_stats[0].id,
                        post_id: post.post_stats[0].post_id || undefined,
                        views: post.post_stats[0].views || 0,
                        likes: post.post_stats[0].likes || 0,
                        updated_at: post.post_stats[0].updated_at || undefined
                    } : {
                        views: 0,
                        likes: 0
                    }
                })),
            totalCount,
            hasMore: offset + limit < totalCount
        };
    }
    getOrderByCondition(orderBy, order) {
        const sortDirection = order === _postsorderbyenum.SortOrder.ASC ? _client.Prisma.SortOrder.asc : _client.Prisma.SortOrder.desc;
        switch(orderBy){
            case _postsorderbyenum.PostsOrderBy.LATEST:
                return {
                    published: sortDirection
                };
            case _postsorderbyenum.PostsOrderBy.UPDATED:
                return {
                    updated_at: sortDirection
                };
            case _postsorderbyenum.PostsOrderBy.POPULAR_VIEWS:
                // 조회수 기준 정렬: 기본적으로 ID 정렬하고, 메서드에서 별도 처리
                return {
                    id: sortDirection
                };
            case _postsorderbyenum.PostsOrderBy.POPULAR_LIKES:
                // 좋아요 기준 정렬: 기본적으로 ID 정렬하고, 메서드에서 별도 처리
                return {
                    id: sortDirection
                };
            case _postsorderbyenum.PostsOrderBy.TITLE:
                return {
                    title: sortDirection
                };
            case _postsorderbyenum.PostsOrderBy.ID:
                return {
                    id: sortDirection
                };
            default:
                return {
                    published: _client.Prisma.SortOrder.desc
                };
        }
    }
    /**
   * 인기도 기준 정렬을 위한 추가 처리
   * POPULAR_VIEWS와 POPULAR_LIKES의 경우 post_stats 테이블의 값으로 정렬
   */ async getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset) {
        if (orderBy === _postsorderbyenum.PostsOrderBy.POPULAR_VIEWS || orderBy === _postsorderbyenum.PostsOrderBy.POPULAR_LIKES) {
            // 인기도 정렬을 위한 Raw Query 사용
            const sortField = orderBy === _postsorderbyenum.PostsOrderBy.POPULAR_VIEWS ? 'views' : 'likes';
            const sortDirection = order === _postsorderbyenum.SortOrder.ASC ? 'ASC' : 'DESC';
            // Raw SQL로 정렬된 포스트 ID 조회
            const sortedPostIds = await this.prisma.$queryRaw`
        SELECT p.id
        FROM posts p
        LEFT JOIN post_stats ps ON p.id = ps.post_id
        ORDER BY COALESCE(ps.${_client.Prisma.raw(sortField)}, 0) ${_client.Prisma.raw(sortDirection)}, p.id ${_client.Prisma.raw(sortDirection)}
        LIMIT ${limit} OFFSET ${offset}
      `;
            const postIds = sortedPostIds.map((p)=>p.id);
            if (postIds.length === 0) {
                return [];
            }
            // 정렬된 ID 순서대로 포스트 조회
            const posts = await this.prisma.posts.findMany({
                where: {
                    AND: [
                        whereCondition,
                        {
                            id: {
                                in: postIds
                            }
                        }
                    ]
                },
                include: {
                    categories: true,
                    post_tags: {
                        include: {
                            tags: true
                        },
                        orderBy: {
                            tag_id: 'asc'
                        }
                    },
                    post_stats: true
                }
            });
            return postIds.map((id)=>posts.find((post)=>post.id === id)).filter((post)=>Boolean(post));
        }
        // 일반 정렬의 경우 기존 방식 사용
        return await this.prisma.posts.findMany({
            where: whereCondition,
            take: limit,
            skip: offset,
            orderBy: this.getOrderByCondition(orderBy, order),
            include: {
                categories: true,
                post_tags: {
                    include: {
                        tags: true
                    },
                    orderBy: {
                        tag_id: 'asc'
                    }
                },
                post_stats: true
            }
        });
    }
    async getPostBySlug(slug) {
        const post = await this.prisma.posts.findUnique({
            where: {
                slug
            },
            include: {
                categories: true,
                post_tags: {
                    include: {
                        tags: true
                    }
                },
                post_stats: true
            }
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
            tags: post.post_tags?.map((pt)=>({
                    id: pt.tags.id,
                    tag_name: pt.tags.tag_name,
                    created_at: pt.tags.created_at || new Date(),
                    usage_count: undefined
                })) || [],
            stats: post.post_stats?.[0] ? {
                id: post.post_stats[0].id,
                post_id: post.post_stats[0].post_id || undefined,
                views: post.post_stats[0].views || 0,
                likes: post.post_stats[0].likes || 0,
                updated_at: post.post_stats[0].updated_at || undefined
            } : {
                views: 0,
                likes: 0
            }
        };
    }
    async getPostsByTag(input) {
        const { tagName, limit, offset, orderBy, order } = input;
        // 검색 조건 설정
        const whereCondition = {
            post_tags: {
                some: {
                    tags: {
                        tag_name: tagName
                    }
                }
            }
        };
        // 특정 태그를 가진 포스트들을 조회 (인기도 정렬 지원)
        const posts = await this.getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset);
        // 전체 개수 조회
        const totalCount = await this.prisma.posts.count({
            where: whereCondition
        });
        return {
            posts: posts.map((post)=>({
                    id: post.id,
                    slug: post.slug,
                    title: post.title,
                    description: post.description || '',
                    thumbnail: post.thumbnail,
                    published: post.published ?? undefined,
                    updated_at: post.updated_at ?? undefined,
                    hash_code: post.hash_code,
                    tags: post.post_tags.map((pt)=>({
                            id: pt.tags.id,
                            tag_name: pt.tags.tag_name,
                            created_at: pt.tags.created_at || new Date(),
                            usage_count: undefined
                        })),
                    category: post.categories?.category_name || '',
                    stats: post.post_stats[0] ? {
                        id: post.post_stats[0].id,
                        post_id: post.post_stats[0].post_id ?? undefined,
                        views: post.post_stats[0].views || 0,
                        likes: post.post_stats[0].likes || 0,
                        updated_at: post.post_stats[0].updated_at ?? undefined
                    } : {
                        views: 0,
                        likes: 0
                    }
                })),
            totalCount,
            hasMore: offset + limit < totalCount
        };
    }
    async getPostsByCategory(input) {
        const { categoryName, limit, offset, orderBy, order } = input;
        // 검색 조건 설정: categories 테이블에서 category_name이 일치하는 posts 조회
        const whereCondition = {
            categories: {
                category_name: categoryName
            }
        };
        // 카테고리별 포스트들을 조회 (인기도 정렬 지원)
        const categoryPosts = await this.getPostsWithPopularitySort(whereCondition, orderBy, order, limit, offset);
        // 전체 개수 조회 (필터링된 결과 기준)
        const totalCount = await this.prisma.posts.count({
            where: whereCondition
        });
        return {
            posts: categoryPosts.map((post)=>({
                    id: post.id,
                    slug: post.slug,
                    title: post.title,
                    description: post.description || '',
                    thumbnail: post.thumbnail,
                    published: post.published || undefined,
                    updated_at: post.updated_at || undefined,
                    hash_code: post.hash_code,
                    category: post.categories?.category_name || '',
                    tags: post.post_tags.map((pt)=>({
                            id: pt.tags.id,
                            tag_name: pt.tags.tag_name,
                            created_at: pt.tags.created_at || new Date(),
                            usage_count: undefined
                        })),
                    stats: post.post_stats[0] ? {
                        id: post.post_stats[0].id,
                        post_id: post.post_stats[0].post_id || undefined,
                        views: post.post_stats[0].views || 0,
                        likes: post.post_stats[0].likes || 0,
                        updated_at: post.post_stats[0].updated_at || undefined
                    } : {
                        views: 0,
                        likes: 0
                    }
                })),
            totalCount,
            hasMore: offset + limit < totalCount
        };
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
PostsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], PostsService);

//# sourceMappingURL=posts.service.js.map