"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagsOrderBy", {
    enumerable: true,
    get: function() {
        return TagsOrderBy;
    }
});
const _graphql = require("@nestjs/graphql");
var TagsOrderBy = /*#__PURE__*/ function(TagsOrderBy) {
    TagsOrderBy["CREATED_AT"] = "created_at";
    TagsOrderBy["TAG_NAME"] = "tag_name";
    TagsOrderBy["ID"] = "id";
    TagsOrderBy["POPULAR"] = "popular";
    return TagsOrderBy;
}({});
(0, _graphql.registerEnumType)(TagsOrderBy, {
    name: 'TagsOrderBy',
    description: '정렬 기준'
});

//# sourceMappingURL=order-by.enum.js.map