"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CategoriesOrderBy", {
    enumerable: true,
    get: function() {
        return CategoriesOrderBy;
    }
});
const _graphql = require("@nestjs/graphql");
var CategoriesOrderBy = /*#__PURE__*/ function(CategoriesOrderBy) {
    CategoriesOrderBy["CREATED_AT"] = "created_at";
    CategoriesOrderBy["CATEGORY_NAME"] = "category_name";
    CategoriesOrderBy["ID"] = "id";
    CategoriesOrderBy["POPULAR"] = "popular";
    return CategoriesOrderBy;
}({});
(0, _graphql.registerEnumType)(CategoriesOrderBy, {
    name: 'CategoriesOrderBy',
    description: '카테고리 정렬 기준'
});

//# sourceMappingURL=categories-order-by.enum.js.map