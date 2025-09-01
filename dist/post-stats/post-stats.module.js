"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostStatsModule", {
    enumerable: true,
    get: function() {
        return PostStatsModule;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
const _postutils = require("../util/post.utils");
const _poststatsresolver = require("./post-stats.resolver");
const _poststatsservice = require("./post-stats.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PostStatsModule = class PostStatsModule {
};
PostStatsModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _poststatsresolver.PostStatsResolver,
            _poststatsservice.PostStatsService,
            _prismaservice.PrismaService,
            _postutils.PostUtils
        ],
        exports: [
            _poststatsservice.PostStatsService
        ]
    })
], PostStatsModule);

//# sourceMappingURL=post-stats.module.js.map