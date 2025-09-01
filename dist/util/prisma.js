"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get handlePrismaError () {
        return handlePrismaError;
    },
    get isPrismaError () {
        return isPrismaError;
    }
});
const _common = require("@nestjs/common");
const _client = require("@prisma/client");
const isPrismaError = (error)=>{
    return error instanceof _client.Prisma.PrismaClientKnownRequestError;
};
const handlePrismaError = (error)=>{
    switch(error.code){
        case 'P2002':
            throw new _common.HttpException('Unique constraint violation', _common.HttpStatus.CONFLICT);
        case 'P2003':
            throw new _common.HttpException('Foreign key constraint violation', _common.HttpStatus.BAD_REQUEST);
        case 'P2025':
            throw new _common.HttpException('Record not found', _common.HttpStatus.NOT_FOUND);
        case 'P2014':
            throw new _common.HttpException('Invalid ID', _common.HttpStatus.BAD_REQUEST);
        case 'P2021':
            throw new _common.HttpException('Table does not exist', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        case 'P2022':
            throw new _common.HttpException('Column does not exist', _common.HttpStatus.INTERNAL_SERVER_ERROR);
        default:
            // 기타 Prisma 에러 (추후 추가)
            console.error('Unknown Prisma error:', error);
            throw new _common.HttpException('데이터베이스 오류가 발생했습니다(default prisma error)', _common.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

//# sourceMappingURL=prisma.js.map