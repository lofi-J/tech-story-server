"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostStats", {
    enumerable: true,
    get: function() {
        return PostStats;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PostStats = class PostStats {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], PostStats.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], PostStats.prototype, "post_id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], PostStats.prototype, "views", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], PostStats.prototype, "likes", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PostStats.prototype, "updated_at", void 0);
PostStats = _ts_decorate([
    (0, _graphql.ObjectType)()
], PostStats);

//# sourceMappingURL=post-stats.entity.js.map