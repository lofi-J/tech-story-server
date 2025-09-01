"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostStatsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const post_utils_1 = require("../util/post.utils");
const post_stats_resolver_1 = require("./post-stats.resolver");
const post_stats_service_1 = require("./post-stats.service");
let PostStatsModule = class PostStatsModule {
};
exports.PostStatsModule = PostStatsModule;
exports.PostStatsModule = PostStatsModule = __decorate([
    (0, common_1.Module)({
        providers: [post_stats_resolver_1.PostStatsResolver, post_stats_service_1.PostStatsService, prisma_service_1.PrismaService, post_utils_1.PostUtils],
        exports: [post_stats_service_1.PostStatsService],
    })
], PostStatsModule);
//# sourceMappingURL=post-stats.module.js.map