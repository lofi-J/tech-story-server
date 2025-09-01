import { PrismaService } from '../prisma/prisma.service';
import { GetPostsByCategoryInput, GetPostsByTagInput, GetPostsInput } from './dto/posts.dto';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllPosts(input: GetPostsInput): Promise<{
        posts: {
            id: number;
            slug: string;
            title: string;
            description: string;
            thumbnail: string | null;
            published: Date | undefined;
            updated_at: Date | undefined;
            hash_code: string;
            tags: {
                id: number;
                tag_name: string;
                created_at: Date;
                usage_count: undefined;
            }[];
            category: string;
            stats: {
                id: number;
                post_id: number | undefined;
                views: number;
                likes: number;
                updated_at: Date | undefined;
            } | {
                views: number;
                likes: number;
                id?: undefined;
                post_id?: undefined;
                updated_at?: undefined;
            };
        }[];
        totalCount: number;
        hasMore: boolean;
    }>;
    private getOrderByCondition;
    private getPostsWithPopularitySort;
    getPostBySlug(slug: string): Promise<{
        id: number;
        slug: string;
        title: string;
        description: string;
        thumbnail: string | null;
        published: Date | undefined;
        updated_at: Date | undefined;
        hash_code: string;
        category: string;
        tags: {
            id: number;
            tag_name: string;
            created_at: Date;
            usage_count: undefined;
        }[];
        stats: {
            id: number;
            post_id: number | undefined;
            views: number;
            likes: number;
            updated_at: Date | undefined;
        } | {
            views: number;
            likes: number;
            id?: undefined;
            post_id?: undefined;
            updated_at?: undefined;
        };
    } | null>;
    getPostsByTag(input: GetPostsByTagInput): Promise<{
        posts: {
            id: number;
            slug: string;
            title: string;
            description: string;
            thumbnail: string | null;
            published: Date | undefined;
            updated_at: Date | undefined;
            hash_code: string;
            tags: {
                id: number;
                tag_name: string;
                created_at: Date;
                usage_count: undefined;
            }[];
            category: string;
            stats: {
                id: number;
                post_id: number | undefined;
                views: number;
                likes: number;
                updated_at: Date | undefined;
            } | {
                views: number;
                likes: number;
                id?: undefined;
                post_id?: undefined;
                updated_at?: undefined;
            };
        }[];
        totalCount: number;
        hasMore: boolean;
    }>;
    getPostsByCategory(input: GetPostsByCategoryInput): Promise<{
        posts: {
            id: number;
            slug: string;
            title: string;
            description: string;
            thumbnail: string | null;
            published: Date | undefined;
            updated_at: Date | undefined;
            hash_code: string;
            category: string;
            tags: {
                id: number;
                tag_name: string;
                created_at: Date;
                usage_count: undefined;
            }[];
            stats: {
                id: number;
                post_id: number | undefined;
                views: number;
                likes: number;
                updated_at: Date | undefined;
            } | {
                views: number;
                likes: number;
                id?: undefined;
                post_id?: undefined;
                updated_at?: undefined;
            };
        }[];
        totalCount: number;
        hasMore: boolean;
    }>;
}
