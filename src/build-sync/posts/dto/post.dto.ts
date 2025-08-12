export interface CreatePostDto {
  slug: string;
  published?: Date;
  tags?: string[];
}

export interface UpdatePostDto {
  slug?: string;
  published?: Date;
  tags?: string[];
}

export interface PostResponse {
  id: number;
  slug: string;
  published: Date | null;
  updated_at: Date | null;
  tags?: string[];
}
