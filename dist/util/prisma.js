"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = exports.isPrismaError = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const isPrismaError = (error) => {
    return error instanceof client_1.Prisma.PrismaClientKnownRequestError;
};
exports.isPrismaError = isPrismaError;
const handlePrismaError = (error) => {
    switch (error.code) {
        case 'P2002':
            throw new common_1.HttpException('Unique constraint violation', common_1.HttpStatus.CONFLICT);
        case 'P2003':
            throw new common_1.HttpException('Foreign key constraint violation', common_1.HttpStatus.BAD_REQUEST);
        case 'P2025':
            throw new common_1.HttpException('Record not found', common_1.HttpStatus.NOT_FOUND);
        case 'P2014':
            throw new common_1.HttpException('Invalid ID', common_1.HttpStatus.BAD_REQUEST);
        case 'P2021':
            throw new common_1.HttpException('Table does not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        case 'P2022':
            throw new common_1.HttpException('Column does not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        default:
            console.error('Unknown Prisma error:', error);
            throw new common_1.HttpException('데이터베이스 오류가 발생했습니다(default prisma error)', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.handlePrismaError = handlePrismaError;
//# sourceMappingURL=prisma.js.map