import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// 프론트엔드 metadata 구조에 맞는 DTO
export class PostMetadataDto {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsDateString()
  published?: string | Date;
}

export class CreatePostDto {
  @ValidateNested()
  @Type(() => PostMetadataDto)
  metadata!: PostMetadataDto;

  @Transform(({ value }) => (typeof value === 'string' ? value : String(value)))
  @IsString()
  hash_code!: string;
}

// 업데이트용 DTO (필요시 사용)
export class UpdatePostDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PostMetadataDto)
  metadata?: PostMetadataDto;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value : String(value)))
  @IsString()
  hash_code?: string;
}

// Prisma에서 반환하는 포스트 객체 타입 (관계 포함)
export interface PostWithRelations {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  hash_code: string;
  published: Date | null;
  updated_at: Date | null;
  category_id: number | null;
  categories: {
    id: number;
    category_name: string;
    created_at: Date | null;
  } | null;
  post_tags: Array<{
    post_id: number;
    tag_id: number;
    tags: {
      id: number;
      tag_name: string;
      created_at: Date | null;
    };
  }>;
}

// 프론트엔드가 기대하는 응답 구조
export interface PostResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  hash_code: string;
  category: string;
  published: string | null;
  updated_at: string;
}
