export interface CreatePostDto {
  slug: string;
  published?: Date;
  tags?: string[];
  hash_code: bigint;
  title: string;
}

export interface UpdatePostDto {
  slug?: string;
  published?: Date;
  tags?: string[];
  hash_code?: bigint;
  title?: string;
}

export interface PostResponse {
  id: number;
  slug: string;
  published: Date | null;
  updated_at: Date | null;
  title: string;
  tags?: string[];
  hash_code: bigint;
}
