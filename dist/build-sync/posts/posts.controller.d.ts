import type { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    upsertPost(createPostDto: CreatePostDto): Promise<{
        ok: boolean;
        status: number;
        data: import("./dto/post.dto").PostResponse | null;
    }>;
    bulkUpsertPosts(posts: CreatePostDto[]): Promise<{
        ok: boolean;
        status: number;
        message: string;
        data: (import("./dto/post.dto").PostResponse | null)[];
    }>;
    getAllPosts(): Promise<{
        ok: boolean;
        status: number;
        data: ({
            post_tags: ({
                tags: {
                    id: number;
                    created_at: Date | null;
                    tag_name: string;
                };
            } & {
                post_id: number;
                tag_id: number;
            })[];
            categories: {
                category_name: string;
                id: number;
                created_at: Date | null;
            } | null;
        } & {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            thumbnail: string | null;
            published: Date | null;
            hash_code: string;
            updated_at: Date | null;
            category_id: number | null;
        })[];
    }>;
    getPostBySlug(slug: string): Promise<{
        ok: boolean;
        status: number;
        data: {
            post_tags: ({
                tags: {
                    id: number;
                    created_at: Date | null;
                    tag_name: string;
                };
            } & {
                post_id: number;
                tag_id: number;
            })[];
            categories: {
                category_name: string;
                id: number;
                created_at: Date | null;
            } | null;
        } & {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            thumbnail: string | null;
            published: Date | null;
            hash_code: string;
            updated_at: Date | null;
            category_id: number | null;
        };
    }>;
    getPost(id: number): Promise<{
        ok: boolean;
        status: number;
        data: {
            post_tags: ({
                tags: {
                    id: number;
                    created_at: Date | null;
                    tag_name: string;
                };
            } & {
                post_id: number;
                tag_id: number;
            })[];
            categories: {
                category_name: string;
                id: number;
                created_at: Date | null;
            } | null;
        } & {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            thumbnail: string | null;
            published: Date | null;
            hash_code: string;
            updated_at: Date | null;
            category_id: number | null;
        };
    }>;
    updatePostBySlug(slug: string, updatePostDto: UpdatePostDto): Promise<{
        ok: boolean;
        status: number;
        data: {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            thumbnail: string | null;
            published: Date | null;
            hash_code: string;
            updated_at: Date | null;
            category_id: number | null;
        };
    }>;
    updatePost(id: number, updatePostDto: UpdatePostDto): Promise<{
        ok: boolean;
        status: number;
        data: {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            thumbnail: string | null;
            published: Date | null;
            hash_code: string;
            updated_at: Date | null;
            category_id: number | null;
        };
    }>;
    deletePostBySlug(slug: string): Promise<{
        ok: boolean;
        status: number;
        message: string;
    }>;
    deletePost(id: number): Promise<{
        ok: boolean;
        status: number;
        message: string;
    }>;
}
