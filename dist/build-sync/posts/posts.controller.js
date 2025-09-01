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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../util/prisma");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    validateApiKey(apiKey) {
        const validApiKey = process.env.BUILD_SYNC_API_KEY;
        if (!validApiKey) {
            console.warn('BUILD_SYNC_API_KEY 환경변수가 설정되지 않았습니다. 개발 환경에서는 무시됩니다.');
            if (process.env.NODE_ENV === 'production') {
                throw new common_1.HttpException('API 키가 설정되지 않았습니다', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return;
        }
        if (!apiKey || apiKey !== validApiKey) {
            throw new common_1.HttpException('유효하지 않은 API 키입니다', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async upsertPost(apiKey, createPostDto) {
        this.validateApiKey(apiKey);
        try {
            console.log('받은 데이터:', createPostDto);
            const post = await this.postsService.upsertPost(createPostDto);
            return {
                ok: true,
                status: 201,
                data: post,
            };
        }
        catch (error) {
            console.error('Upsert 에러 상세:', error);
            if ((0, prisma_1.isPrismaError)(error))
                return (0, prisma_1.handlePrismaError)(error);
            throw new common_1.HttpException('포스트 처리 실패', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkUpsertPosts(apiKey, posts) {
        this.validateApiKey(apiKey);
        try {
            const results = await Promise.all(posts.map((post) => this.postsService.upsertPost(post)));
            return {
                ok: true,
                status: 200,
                message: `${results.length}개의 포스트를 성공적으로 처리했습니다`,
                data: results,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('대량 포스트 처리 실패', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllPosts() {
        try {
            const posts = await this.postsService.getAllPosts();
            return {
                ok: true,
                status: 200,
                data: posts,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('포스트 목록 조회 실패', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPostBySlug(slug) {
        try {
            const post = await this.postsService.getPostBySlug(slug);
            if (!post) {
                throw new common_1.HttpException('포스트를 찾을 수 없습니다', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: post,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            console.error(error);
            throw new common_1.HttpException('포스트 조회 실패', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPost(id) {
        try {
            const post = await this.postsService.getPost(id);
            if (!post) {
                throw new common_1.HttpException('포스트를 찾을 수 없습니다', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: post,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException('포스트 조회 실패', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePostBySlug(slug, updatePostDto) {
        try {
            const post = await this.postsService.updatePostBySlug(slug, updatePostDto);
            return {
                ok: true,
                status: 200,
                data: post,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('포스트 업데이트 실패', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePost(id, updatePostDto) {
        try {
            const post = await this.postsService.updatePost(id, updatePostDto);
            return {
                ok: true,
                status: 200,
                data: post,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('포스트 업데이트 실패', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePostBySlug(slug) {
        try {
            await this.postsService.deletePostBySlug(slug);
            return {
                ok: true,
                status: 200,
                message: '포스트가 성공적으로 삭제되었습니다',
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('포스트 삭제 실패', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePost(id) {
        try {
            await this.postsService.deletePost(id);
            return {
                ok: true,
                status: 200,
                message: '포스트가 성공적으로 삭제되었습니다',
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('포스트 삭제 실패', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('x-api-key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "upsertPost", null);
__decorate([
    (0, common_1.Put)('bulk'),
    __param(0, (0, common_1.Headers)('x-api-key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "bulkUpsertPosts", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, common_1.Put)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePostBySlug", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePostBySlug", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('api/build-sync/posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map