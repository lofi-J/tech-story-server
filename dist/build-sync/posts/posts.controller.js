"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostsController", {
    enumerable: true,
    get: function() {
        return PostsController;
    }
});
const _common = require("@nestjs/common");
const _prisma = require("../../util/prisma");
const _postsservice = require("./posts.service");
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
let PostsController = class PostsController {
    async upsertPost(createPostDto) {
        try {
            console.log('받은 데이터:', createPostDto);
            const post = await this.postsService.upsertPost(createPostDto);
            return {
                ok: true,
                status: 201,
                data: post
            };
        } catch (error) {
            console.error('Upsert 에러 상세:', error);
            if ((0, _prisma.isPrismaError)(error)) return (0, _prisma.handlePrismaError)(error);
            throw new _common.HttpException('포스트 처리 실패', _common.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkUpsertPosts(posts) {
        try {
            const results = await Promise.all(posts.map((post)=>this.postsService.upsertPost(post)));
            return {
                ok: true,
                status: 200,
                message: `${results.length}개의 포스트를 성공적으로 처리했습니다`,
                data: results
            };
        } catch (error) {
            console.error(error);
            throw new _common.HttpException('대량 포스트 처리 실패', _common.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllPosts() {
        try {
            const posts = await this.postsService.getAllPosts();
            return {
                ok: true,
                status: 200,
                data: posts
            };
        } catch (error) {
            console.error(error);
            throw new _common.HttpException('포스트 목록 조회 실패', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPostBySlug(slug) {
        try {
            const post = await this.postsService.getPostBySlug(slug);
            if (!post) {
                throw new _common.HttpException('포스트를 찾을 수 없습니다', _common.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: post
            };
        } catch (error) {
            if (error instanceof _common.HttpException) throw error;
            console.error(error);
            throw new _common.HttpException('포스트 조회 실패', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPost(id) {
        try {
            const post = await this.postsService.getPost(id);
            if (!post) {
                throw new _common.HttpException('포스트를 찾을 수 없습니다', _common.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: post
            };
        } catch (error) {
            if (error instanceof _common.HttpException) throw error;
            throw new _common.HttpException('포스트 조회 실패', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePostBySlug(slug, updatePostDto) {
        try {
            const post = await this.postsService.updatePostBySlug(slug, updatePostDto);
            return {
                ok: true,
                status: 200,
                data: post
            };
        } catch (error) {
            console.error(error);
            throw new _common.HttpException('포스트 업데이트 실패', _common.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePost(id, updatePostDto) {
        try {
            const post = await this.postsService.updatePost(id, updatePostDto);
            return {
                ok: true,
                status: 200,
                data: post
            };
        } catch (error) {
            console.error(error);
            throw new _common.HttpException('포스트 업데이트 실패', _common.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePostBySlug(slug) {
        try {
            await this.postsService.deletePostBySlug(slug);
            return {
                ok: true,
                status: 200,
                message: '포스트가 성공적으로 삭제되었습니다'
            };
        } catch (error) {
            console.error(error);
            throw new _common.HttpException('포스트 삭제 실패', _common.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePost(id) {
        try {
            await this.postsService.deletePost(id);
            return {
                ok: true,
                status: 200,
                message: '포스트가 성공적으로 삭제되었습니다'
            };
        } catch (error) {
            console.error(error);
            throw new _common.HttpException('포스트 삭제 실패', _common.HttpStatus.BAD_REQUEST);
        }
    }
    constructor(postsService){
        this.postsService = postsService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreatePostDto === "undefined" ? Object : CreatePostDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "upsertPost", null);
_ts_decorate([
    (0, _common.Put)('bulk'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "bulkUpsertPosts", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
_ts_decorate([
    (0, _common.Get)('slug/:slug'),
    _ts_param(0, (0, _common.Param)('slug')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getPostBySlug", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
_ts_decorate([
    (0, _common.Put)('slug/:slug'),
    _ts_param(0, (0, _common.Param)('slug')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdatePostDto === "undefined" ? Object : UpdatePostDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "updatePostBySlug", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof UpdatePostDto === "undefined" ? Object : UpdatePostDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
_ts_decorate([
    (0, _common.Delete)('slug/:slug'),
    _ts_param(0, (0, _common.Param)('slug')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "deletePostBySlug", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
PostsController = _ts_decorate([
    (0, _common.Controller)('api/build-sync/posts'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsservice.PostsService === "undefined" ? Object : _postsservice.PostsService
    ])
], PostsController);

//# sourceMappingURL=posts.controller.js.map