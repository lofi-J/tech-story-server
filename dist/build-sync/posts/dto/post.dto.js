"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CreatePostDto () {
        return CreatePostDto;
    },
    get PostMetadataDto () {
        return PostMetadataDto;
    },
    get UpdatePostDto () {
        return UpdatePostDto;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PostMetadataDto = class PostMetadataDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PostMetadataDto.prototype, "slug", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PostMetadataDto.prototype, "title", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PostMetadataDto.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PostMetadataDto.prototype, "thumbnail", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PostMetadataDto.prototype, "category", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    _ts_metadata("design:type", Array)
], PostMetadataDto.prototype, "tags", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)(),
    _ts_metadata("design:type", Object)
], PostMetadataDto.prototype, "published", void 0);
let CreatePostDto = class CreatePostDto {
};
_ts_decorate([
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>PostMetadataDto),
    _ts_metadata("design:type", typeof PostMetadataDto === "undefined" ? Object : PostMetadataDto)
], CreatePostDto.prototype, "metadata", void 0);
_ts_decorate([
    (0, _classtransformer.Transform)(({ value })=>typeof value === 'string' ? value : String(value)),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreatePostDto.prototype, "hash_code", void 0);
let UpdatePostDto = class UpdatePostDto {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>PostMetadataDto),
    _ts_metadata("design:type", typeof PostMetadataDto === "undefined" ? Object : PostMetadataDto)
], UpdatePostDto.prototype, "metadata", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Transform)(({ value })=>typeof value === 'string' ? value : String(value)),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], UpdatePostDto.prototype, "hash_code", void 0);

//# sourceMappingURL=post.dto.js.map