export declare class PostMetadataDto {
    slug: string;
    title: string;
    description?: string;
    thumbnail?: string;
    category?: string;
    tags?: string[];
    published?: string | Date;
}
export declare class CreatePostDto {
    metadata: PostMetadataDto;
    hash_code: string;
}
export declare class UpdatePostDto {
    metadata?: PostMetadataDto;
    hash_code?: string;
}
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
