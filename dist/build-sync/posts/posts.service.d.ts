import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto, type PostResponse } from './dto/post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    private transformToPostResponse;
    upsertPost(postDto: CreatePostDto): Promise<PostResponse | null>;
    getAllPosts(): Promise<({
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
    })[]>;
    getPost(id: number): Promise<({
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
    }) | null>;
    getPostBySlug(slug: string): Promise<({
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
    }) | null>;
    updatePost(id: number, updatePostDto: UpdatePostDto): Promise<{
        id: number;
        slug: string;
        title: string;
        description: string | null;
        thumbnail: string | null;
        published: Date | null;
        hash_code: string;
        updated_at: Date | null;
        category_id: number | null;
    }>;
    updatePostBySlug(slug: string, updatePostDto: UpdatePostDto): Promise<{
        id: number;
        slug: string;
        title: string;
        description: string | null;
        thumbnail: string | null;
        published: Date | null;
        hash_code: string;
        updated_at: Date | null;
        category_id: number | null;
    }>;
    deletePost(id: number): Promise<{
        id: number;
        slug: string;
        title: string;
        description: string | null;
        thumbnail: string | null;
        published: Date | null;
        hash_code: string;
        updated_at: Date | null;
        category_id: number | null;
    }>;
    deletePostBySlug(slug: string): Promise<{
        id: number;
        slug: string;
        title: string;
        description: string | null;
        thumbnail: string | null;
        published: Date | null;
        hash_code: string;
        updated_at: Date | null;
        category_id: number | null;
    }>;
}
