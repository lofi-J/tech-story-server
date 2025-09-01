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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../util/prisma");
const categories_service_1 = require("./categories.service");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getAllCategories() {
        try {
            const categories = await this.categoriesService.getAllCategories();
            return {
                ok: true,
                status: 200,
                data: categories,
            };
        }
        catch (error) {
            if ((0, prisma_1.isPrismaError)(error)) {
                const { message, status } = (0, prisma_1.handlePrismaError)(error);
                throw new common_1.HttpException(message, status);
            }
            throw new common_1.HttpException('카테고리 조회 중 오류가 발생했습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCategory(id) {
        try {
            const category = await this.categoriesService.getCategory(id);
            if (!category) {
                throw new common_1.HttpException('카테고리를 찾을 수 없습니다.', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: category,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if ((0, prisma_1.isPrismaError)(error)) {
                const { message, status } = (0, prisma_1.handlePrismaError)(error);
                throw new common_1.HttpException(message, status);
            }
            throw new common_1.HttpException('카테고리 조회 중 오류가 발생했습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCategoryByName(categoryName) {
        try {
            const category = await this.categoriesService.getCategoryByName(categoryName);
            if (!category) {
                throw new common_1.HttpException('카테고리를 찾을 수 없습니다.', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                ok: true,
                status: 200,
                data: category,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if ((0, prisma_1.isPrismaError)(error)) {
                const { message, status } = (0, prisma_1.handlePrismaError)(error);
                throw new common_1.HttpException(message, status);
            }
            throw new common_1.HttpException('카테고리 조회 중 오류가 발생했습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCategory(createCategoryDto) {
        try {
            const category = await this.categoriesService.createCategory(createCategoryDto);
            return {
                ok: true,
                status: 201,
                data: category,
                message: '카테고리가 성공적으로 생성되었습니다.',
            };
        }
        catch (error) {
            if ((0, prisma_1.isPrismaError)(error)) {
                const { message, status } = (0, prisma_1.handlePrismaError)(error);
                throw new common_1.HttpException(message, status);
            }
            throw new common_1.HttpException('카테고리 생성 중 오류가 발생했습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCategory(id) {
        try {
            await this.categoriesService.deleteCategory(id);
            return {
                ok: true,
                status: 200,
                message: '카테고리가 성공적으로 삭제되었습니다.',
            };
        }
        catch (error) {
            if ((0, prisma_1.isPrismaError)(error)) {
                const { message, status } = (0, prisma_1.handlePrismaError)(error);
                throw new common_1.HttpException(message, status);
            }
            throw new common_1.HttpException('카테고리 삭제 중 오류가 발생했습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Get)('name/:categoryName'),
    __param(0, (0, common_1.Param)('categoryName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryByName", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('api/build-sync/categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map