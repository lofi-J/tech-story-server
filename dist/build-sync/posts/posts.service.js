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
const _prismaservice = require("../../prisma/prisma.service");
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
    // 프론트엔드가 기대하는 응답 구조로 변환
    transformToPostResponse(post) {
        if (!post) return null;
        return {
            id: post.id,
            slug: post.slug,
            title: post.title,
            description: post.description || '',
            thumbnail: post.thumbnail || null,
            hash_code: post.hash_code,
            category: post.categories?.category_name || '',
            published: post.published ? post.published.toISOString() : null,
            updated_at: post.updated_at ? post.updated_at.toISOString() : new Date().toISOString()
        };
    }
    async upsertPost(postDto) {
        const { metadata, hash_code } = postDto;
        const { slug, published, tags, category, title, description, thumbnail } = metadata;
        const inputTags = tags ?? [];
        const publishedDate = published ? new Date(published) : null;
        const postDescription = description ?? '';
        return await this.prisma.$transaction(async (tx)=>{
            let categoryId = null;
            // 카테고리 처리 (있는 경우)
            if (category) {
                const categoryRecord = await tx.categories.upsert({
                    where: {
                        category_name: category
                    },
                    update: {},
                    create: {
                        category_name: category
                    }
                });
                categoryId = categoryRecord.id;
            }
            // posts 테이블에 upsert
            const post = await tx.posts.upsert({
                where: {
                    slug
                },
                update: {
                    published: publishedDate,
                    hash_code,
                    title,
                    description: postDescription,
                    thumbnail,
                    category_id: categoryId
                },
                create: {
                    slug,
                    published: publishedDate,
                    hash_code,
                    title,
                    description: postDescription,
                    category_id: categoryId
                }
            });
            // 태그 처리가 필요한 경우에만 실행
            if (inputTags.length > 0) {
                // 태그들을 한 번에 upsert (없으면 생성, 있으면 그대로)
                await tx.tags.createMany({
                    data: inputTags.map((tagName)=>({
                            tag_name: tagName
                        })),
                    skipDuplicates: true
                });
                // 기존 포스트-태그 관계 삭제
                await tx.post_tags.deleteMany({
                    where: {
                        post_id: post.id
                    }
                });
                // 새로운 포스트-태그 관계 생성
                const tagRecords = await tx.tags.findMany({
                    where: {
                        tag_name: {
                            in: inputTags
                        }
                    },
                    select: {
                        id: true
                    }
                });
                await tx.post_tags.createMany({
                    data: tagRecords.map((tag)=>({
                            post_id: post.id,
                            tag_id: tag.id
                        }))
                });
            } else {
                // 태그가 없는 경우 기존 관계만 삭제
                await tx.post_tags.deleteMany({
                    where: {
                        post_id: post.id
                    }
                });
            }
            // 생성/업데이트된 포스트를 카테고리 정보와 함께 조회
            const fullPost = await tx.posts.findUnique({
                where: {
                    id: post.id
                },
                include: {
                    categories: true,
                    post_tags: {
                        include: {
                            tags: true
                        }
                    }
                }
            });
            return this.transformToPostResponse(fullPost);
        });
    }
    async getAllPosts() {
        return await this.prisma.posts.findMany({
            include: {
                categories: true,
                post_tags: {
                    include: {
                        tags: true
                    }
                }
            },
            orderBy: {
                updated_at: 'desc'
            }
        });
    }
    async getPost(id) {
        return await this.prisma.posts.findUnique({
            where: {
                id
            },
            include: {
                categories: true,
                post_tags: {
                    include: {
                        tags: true
                    }
                }
            }
        });
    }
    async getPostBySlug(slug) {
        return await this.prisma.posts.findUnique({
            where: {
                slug
            },
            include: {
                categories: true,
                post_tags: {
                    include: {
                        tags: true
                    }
                }
            }
        });
    }
    async updatePost(id, updatePostDto) {
        if (!updatePostDto.metadata) {
            throw new Error('metadata is required');
        }
        const { metadata, hash_code } = updatePostDto;
        const { published, tags, category, title, description } = metadata;
        const inputTags = tags ?? [];
        return await this.prisma.$transaction(async (tx)=>{
            // undefined 필드는 제외하고 업데이트
            const updateData = {};
            if (published !== undefined) updateData.published = published;
            if (hash_code !== undefined) updateData.hash_code = hash_code;
            if (title !== undefined) updateData.title = title;
            if (description !== undefined) updateData.description = description ?? '';
            // 카테고리 처리 (category가 정의된 경우에만)
            if (category !== undefined) {
                if (category) {
                    const categoryRecord = await tx.categories.upsert({
                        where: {
                            category_name: category
                        },
                        update: {},
                        create: {
                            category_name: category
                        }
                    });
                    updateData.category_id = categoryRecord.id;
                } else {
                    updateData.category_id = null;
                }
            }
            const post = await tx.posts.update({
                where: {
                    id
                },
                data: updateData
            });
            // 태그 업데이트는 tags가 정의된 경우에만
            if (tags !== undefined) {
                if (inputTags.length > 0) {
                    await tx.tags.createMany({
                        data: inputTags.map((tagName)=>({
                                tag_name: tagName
                            })),
                        skipDuplicates: true
                    });
                    await tx.post_tags.deleteMany({
                        where: {
                            post_id: post.id
                        }
                    });
                    const tagRecords = await tx.tags.findMany({
                        where: {
                            tag_name: {
                                in: inputTags
                            }
                        },
                        select: {
                            id: true
                        }
                    });
                    await tx.post_tags.createMany({
                        data: tagRecords.map((tag)=>({
                                post_id: post.id,
                                tag_id: tag.id
                            }))
                    });
                } else {
                    await tx.post_tags.deleteMany({
                        where: {
                            post_id: post.id
                        }
                    });
                }
            }
            return post;
        });
    }
    async updatePostBySlug(slug, updatePostDto) {
        const post = await this.getPostBySlug(slug);
        if (!post) {
            throw new Error('Post not found');
        }
        return await this.updatePost(post.id, updatePostDto);
    }
    async deletePost(id) {
        return await this.prisma.posts.delete({
            where: {
                id
            }
        });
    }
    async deletePostBySlug(slug) {
        return await this.prisma.posts.delete({
            where: {
                slug
            }
        });
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