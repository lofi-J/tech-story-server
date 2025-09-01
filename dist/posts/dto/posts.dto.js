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
exports.GetPostsByCategoryInput = exports.GetPostsByTagInput = exports.GetPostsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const posts_order_by_enum_1 = require("../enums/posts-order-by.enum");
let GetPostsInput = class GetPostsInput {
    limit = 10;
    offset = 0;
    orderBy = posts_order_by_enum_1.PostsOrderBy.LATEST;
    order = posts_order_by_enum_1.SortOrder.DESC;
    search;
};
exports.GetPostsInput = GetPostsInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 10, description: '가져올 포스트 수' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 0, description: '건너뛸 포스트 수' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsInput.prototype, "offset", void 0);
__decorate([
    (0, graphql_1.Field)(() => posts_order_by_enum_1.PostsOrderBy, {
        defaultValue: posts_order_by_enum_1.PostsOrderBy.LATEST,
        description: '정렬 기준',
    }),
    (0, class_validator_1.IsEnum)(posts_order_by_enum_1.PostsOrderBy),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPostsInput.prototype, "orderBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => posts_order_by_enum_1.SortOrder, {
        defaultValue: posts_order_by_enum_1.SortOrder.DESC,
        description: '정렬 순서',
    }),
    (0, class_validator_1.IsEnum)(posts_order_by_enum_1.SortOrder),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPostsInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: '검색 키워드' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPostsInput.prototype, "search", void 0);
exports.GetPostsInput = GetPostsInput = __decorate([
    (0, graphql_1.InputType)()
], GetPostsInput);
let GetPostsByTagInput = class GetPostsByTagInput {
    tagName;
    limit = 10;
    offset = 0;
    orderBy = posts_order_by_enum_1.PostsOrderBy.LATEST;
    order = posts_order_by_enum_1.SortOrder.DESC;
};
exports.GetPostsByTagInput = GetPostsByTagInput;
__decorate([
    (0, graphql_1.Field)(() => String, { description: '태그 이름' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPostsByTagInput.prototype, "tagName", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 10, description: '가져올 포스트 수' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsByTagInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 0, description: '건너뛸 포스트 수' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsByTagInput.prototype, "offset", void 0);
__decorate([
    (0, graphql_1.Field)(() => posts_order_by_enum_1.PostsOrderBy, {
        defaultValue: posts_order_by_enum_1.PostsOrderBy.LATEST,
        description: '정렬 기준',
    }),
    (0, class_validator_1.IsEnum)(posts_order_by_enum_1.PostsOrderBy),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPostsByTagInput.prototype, "orderBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => posts_order_by_enum_1.SortOrder, {
        defaultValue: posts_order_by_enum_1.SortOrder.DESC,
        description: '정렬 순서',
    }),
    (0, class_validator_1.IsEnum)(posts_order_by_enum_1.SortOrder),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPostsByTagInput.prototype, "order", void 0);
exports.GetPostsByTagInput = GetPostsByTagInput = __decorate([
    (0, graphql_1.InputType)()
], GetPostsByTagInput);
let GetPostsByCategoryInput = class GetPostsByCategoryInput {
    categoryName;
    limit = 10;
    offset = 0;
    orderBy = posts_order_by_enum_1.PostsOrderBy.LATEST;
    order = posts_order_by_enum_1.SortOrder.DESC;
};
exports.GetPostsByCategoryInput = GetPostsByCategoryInput;
__decorate([
    (0, graphql_1.Field)(() => String, { description: '카테고리 이름' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPostsByCategoryInput.prototype, "categoryName", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 10, description: '가져올 포스트 수' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsByCategoryInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 0, description: '건너뛸 포스트 수' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsByCategoryInput.prototype, "offset", void 0);
__decorate([
    (0, graphql_1.Field)(() => posts_order_by_enum_1.PostsOrderBy, {
        defaultValue: posts_order_by_enum_1.PostsOrderBy.LATEST,
        description: '정렬 기준',
    }),
    (0, class_validator_1.IsEnum)(posts_order_by_enum_1.PostsOrderBy),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPostsByCategoryInput.prototype, "orderBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => posts_order_by_enum_1.SortOrder, {
        defaultValue: posts_order_by_enum_1.SortOrder.DESC,
        description: '정렬 순서',
    }),
    (0, class_validator_1.IsEnum)(posts_order_by_enum_1.SortOrder),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPostsByCategoryInput.prototype, "order", void 0);
exports.GetPostsByCategoryInput = GetPostsByCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], GetPostsByCategoryInput);
//# sourceMappingURL=posts.dto.js.map