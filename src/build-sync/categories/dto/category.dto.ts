import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  category_name!: string;
}

export interface CategoryResponse {
  id: number;
  category_name: string;
  created_at: Date | null;
  posts_count?: number;
}
