"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _apollo = require("@nestjs/apollo");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _graphql = require("@nestjs/graphql");
const _appcontroller = require("./app.controller");
const _appservice = require("./app.service");
const _categoriesmodule = require("./build-sync/categories/categories.module");
const _postsmodule = require("./build-sync/posts/posts.module");
const _categoriesmodule1 = require("./categories/categories.module");
const _poststatsmodule = require("./post-stats/post-stats.module");
const _postsmodule1 = require("./posts/posts.module");
const _prismaservice = require("./prisma/prisma.service");
const _supabaseservice = require("./supabase/supabase.service");
const _tagsmodule = require("./tags/tags.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                envFilePath: [
                    '.env.local',
                    '.env'
                ],
                isGlobal: true
            }),
            _graphql.GraphQLModule.forRoot({
                driver: _apollo.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
                sortSchema: true,
                context: ({ req, res })=>({
                        req,
                        res,
                        session: req.session
                    })
            }),
            _categoriesmodule.CategoriesModule,
            _categoriesmodule1.CategoriesModule,
            _postsmodule.PostsModule,
            _postsmodule1.PostsModule,
            _poststatsmodule.PostStatsModule,
            _tagsmodule.TagsModule
        ],
        controllers: [
            _appcontroller.AppController
        ],
        providers: [
            _appservice.AppService,
            _supabaseservice.SupabaseService,
            _prismaservice.PrismaService
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map