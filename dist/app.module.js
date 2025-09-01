"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const categories_module_1 = require("./build-sync/categories/categories.module");
const posts_module_1 = require("./build-sync/posts/posts.module");
const categories_module_2 = require("./categories/categories.module");
const post_stats_module_1 = require("./post-stats/post-stats.module");
const posts_module_2 = require("./posts/posts.module");
const prisma_service_1 = require("./prisma/prisma.service");
const supabase_service_1 = require("./supabase/supabase.service");
const tags_module_1 = require("./tags/tags.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.local', '.env'],
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
                sortSchema: true,
                context: ({ req, res }) => ({
                    req,
                    res,
                    session: req.session,
                }),
            }),
            categories_module_1.CategoriesModule,
            categories_module_2.CategoriesModule,
            posts_module_1.PostsModule,
            posts_module_2.PostsModule,
            post_stats_module_1.PostStatsModule,
            tags_module_1.TagsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, supabase_service_1.SupabaseService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map