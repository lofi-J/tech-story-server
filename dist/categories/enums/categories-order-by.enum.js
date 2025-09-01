"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesOrderBy = void 0;
const graphql_1 = require("@nestjs/graphql");
var CategoriesOrderBy;
(function (CategoriesOrderBy) {
    CategoriesOrderBy["CREATED_AT"] = "created_at";
    CategoriesOrderBy["CATEGORY_NAME"] = "category_name";
    CategoriesOrderBy["ID"] = "id";
    CategoriesOrderBy["POPULAR"] = "popular";
})(CategoriesOrderBy || (exports.CategoriesOrderBy = CategoriesOrderBy = {}));
(0, graphql_1.registerEnumType)(CategoriesOrderBy, {
    name: 'CategoriesOrderBy',
    description: '카테고리 정렬 기준',
});
//# sourceMappingURL=categories-order-by.enum.js.map