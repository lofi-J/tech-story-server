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
exports.PostStatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const post_utils_1 = require("../util/post.utils");
let PostStatsService = class PostStatsService {
    prisma;
    postUtils;
    constructor(prisma, postUtils) {
        this.prisma = prisma;
        this.postUtils = postUtils;
    }
    async increasePostViews(slug, req) {
        const postId = await this.postUtils.getPostIdBySlug(slug);
        if (!postId) {
            throw new Error(`Post with slug '${slug}' not found`);
        }
        const viewedPosts = req.session.viewedPosts || [];
        const sessionKey = `post_${postId}`;
        if (viewedPosts.includes(sessionKey)) {
            const existingStats = await this.prisma.post_stats.findFirst({
                where: { post_id: postId },
            });
            if (existingStats) {
                return existingStats;
            }
            else {
                return await this.prisma.post_stats.create({
                    data: { post_id: postId, views: 0, likes: 0 },
                });
            }
        }
        viewedPosts.push(sessionKey);
        req.session.viewedPosts = viewedPosts;
        const isExisting = await this.prisma.post_stats.findFirst({
            where: { post_id: postId },
        });
        if (isExisting) {
            return await this.prisma.post_stats.update({
                where: { id: isExisting.id },
                data: { views: { increment: 1 } },
            });
        }
        else {
            return await this.prisma.post_stats.create({
                data: { post_id: postId, views: 1 },
            });
        }
    }
    async increasePostLikes(slug, req) {
        const postId = await this.postUtils.getPostIdBySlug(slug);
        if (!postId) {
            throw new Error(`Post with slug '${slug}' not found`);
        }
        const likedPosts = req.session.likedPosts || [];
        const sessionKey = `post_${postId}`;
        if (likedPosts.includes(sessionKey)) {
            const existingStats = await this.prisma.post_stats.findFirst({
                where: { post_id: postId },
            });
            if (existingStats) {
                return existingStats;
            }
            else {
                return await this.prisma.post_stats.create({
                    data: { post_id: postId, views: 0, likes: 0 },
                });
            }
        }
        likedPosts.push(sessionKey);
        req.session.likedPosts = likedPosts;
        const isExisting = await this.prisma.post_stats.findFirst({
            where: { post_id: postId },
        });
        if (isExisting) {
            return await this.prisma.post_stats.update({
                where: { id: isExisting.id },
                data: { likes: { increment: 1 } },
            });
        }
        else {
            return await this.prisma.post_stats.create({
                data: { post_id: postId, likes: 1 },
            });
        }
    }
};
exports.PostStatsService = PostStatsService;
exports.PostStatsService = PostStatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        post_utils_1.PostUtils])
], PostStatsService);
//# sourceMappingURL=post-stats.service.js.map