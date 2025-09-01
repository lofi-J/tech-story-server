"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CategoriesController", {
    enumerable: true,
    get: function() {
        return CategoriesController;
    }
});
const _common = require("@nestjs/common");
const _prisma = require("../../util/prisma");
const _categoriesservice = require("./categories.service");
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
let CategoriesController = class CategoriesController {
    // API 키 검증 메서드
    validateApiKey(apiKey) {
        const validApiKey = process.env.BUILD_SYNC_API_KEY;
        if (!validApiKey) {
            console.warn('BUILD_SYNC_API_KEY 환경변수가 설정되지 않았습니다. 개발 환경에서는 무시됩니다.');
            if (process.env.NODE_ENV === 'production') {
                throw new _common.HttpException('API 키가 설정되지 않았습니다', _common.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return; // 개발 환경에서는 API 키 없이도 허용
        }
        if (!apiKey || apiKey !== validApiKey) {
            throw new _common.HttpException('유효하지 않은 API 키입니다', _common.HttpStatus.UNAUTHORIZED);
        }
    }
    async getAllCategories() {
        try {
            const categories = await this.categoriesService.getAllCategories();
            return {
                ok: true,
                status: 200,
                data: categories
            };
        } catch (error) {
            if ((0, _prisma.isPrismaError)(error)) {
                const { message, status } = (0, _prisma.handlePrismaError)(error);
                throw new _common.HttpException(message, status);
            }
            throw new _common.HttpException('카테고리 조회 중 오류가 발생했습니다.', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCategory(id) {
        try {
            const category = await this.categoriesService.getCategory(id);
            if (!category) {
                throw new _common.HttpException('카테고리를 찾을 수 없습니다.', _common.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: category
            };
        } catch (error) {
            if (error instanceof _common.HttpException) {
                throw error;
            }
            if ((0, _prisma.isPrismaError)(error)) {
                const { message, status } = (0, _prisma.handlePrismaError)(error);
                throw new _common.HttpException(message, status);
            }
            throw new _common.HttpException('카테고리 조회 중 오류가 발생했습니다.', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCategoryByName(categoryName) {
        try {
            const category = await this.categoriesService.getCategoryByName(categoryName);
            if (!category) {
                throw new _common.HttpException('카테고리를 찾을 수 없습니다.', _common.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: category
            };
        } catch (error) {
            if (error instanceof _common.HttpException) {
                throw error;
            }
            if ((0, _prisma.isPrismaError)(error)) {
                const { message, status } = (0, _prisma.handlePrismaError)(error);
                throw new _common.HttpException(message, status);
            }
            throw new _common.HttpException('카테고리 조회 중 오류가 발생했습니다.', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCategory(apiKey, createCategoryDto) {
        this.validateApiKey(apiKey);
        try {
            const category = await this.categoriesService.createCategory(createCategoryDto);
            return {
                ok: true,
                status: 201,
                data: category,
                message: '카테고리가 성공적으로 생성되었습니다.'
            };
        } catch (error) {
            if ((0, _prisma.isPrismaError)(error)) {
                const { message, status } = (0, _prisma.handlePrismaError)(error);
                throw new _common.HttpException(message, status);
            }
            throw new _common.HttpException('카테고리 생성 중 오류가 발생했습니다.', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCategory(apiKey, id) {
        this.validateApiKey(apiKey);
        try {
            await this.categoriesService.deleteCategory(id);
            return {
                ok: true,
                status: 200,
                message: '카테고리가 성공적으로 삭제되었습니다.'
            };
        } catch (error) {
            if ((0, _prisma.isPrismaError)(error)) {
                const { message, status } = (0, _prisma.handlePrismaError)(error);
                throw new _common.HttpException(message, status);
            }
            throw new _common.HttpException('카테고리 삭제 중 오류가 발생했습니다.', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    constructor(categoriesService){
        this.categoriesService = categoriesService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategory", null);
_ts_decorate([
    (0, _common.Get)('name/:categoryName'),
    _ts_param(0, (0, _common.Param)('categoryName')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryByName", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Headers)('x-api-key')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof CreateCategoryDto === "undefined" ? Object : CreateCategoryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Headers)('x-api-key')),
    _ts_param(1, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
CategoriesController = _ts_decorate([
    (0, _common.Controller)('api/build-sync/categories'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _categoriesservice.CategoriesService === "undefined" ? Object : _categoriesservice.CategoriesService
    ])
], CategoriesController);

//# sourceMappingURL=categories.controller.js.map