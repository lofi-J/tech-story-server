"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsOrderBy = void 0;
const graphql_1 = require("@nestjs/graphql");
var TagsOrderBy;
(function (TagsOrderBy) {
    TagsOrderBy["CREATED_AT"] = "created_at";
    TagsOrderBy["TAG_NAME"] = "tag_name";
    TagsOrderBy["ID"] = "id";
    TagsOrderBy["POPULAR"] = "popular";
})(TagsOrderBy || (exports.TagsOrderBy = TagsOrderBy = {}));
(0, graphql_1.registerEnumType)(TagsOrderBy, {
    name: 'TagsOrderBy',
    description: '정렬 기준',
});
//# sourceMappingURL=order-by.enum.js.map