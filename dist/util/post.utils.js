"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostUtils", {
    enumerable: true,
    get: function() {
        return PostUtils;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PostUtils = class PostUtils {
    /**
   * slug를 통해 post의 id를 조회.
   * @param slug - 포스트의 slug
   * @returns post id 또는 null (포스트가 존재하지 않는 경우)
   */ async getPostIdBySlug(slug) {
        try {
            const post = await this.prisma.posts.findUnique({
                where: {
                    slug
                },
                select: {
                    id: true
                }
            });
            return post?.id || null;
        } catch (error) {
            console.error('Error finding post by slug:', error);
            return null;
        }
    }
    /**
   * slug를 통해 post가 존재하는지 확인.
   * @param slug - 포스트의 slug
   * @returns 포스트 존재 여부
   */ async isPostExists(slug) {
        const postId = await this.getPostIdBySlug(slug);
        return postId !== null;
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
PostUtils = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], PostUtils);

//# sourceMappingURL=post.utils.js.map