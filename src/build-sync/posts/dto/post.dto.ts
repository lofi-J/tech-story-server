import { Transform } from 'class-transformer';
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  slug!: string;

  @IsOptional()
  @IsDateString()
  published?: string | Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  category?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value : String(value)))
  @IsString()
  hash_code!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsDateString()
  published?: string | Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value : String(value)))
  @IsString()
  hash_code?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export interface PostResponse {
  id: number;
  slug: string;
  published: Date | null;
  updated_at: Date | null;
  title: string;
  description: string;
  tags?: string[];
  category?: string;
  hash_code: string;
}
