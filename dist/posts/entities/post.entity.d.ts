import { PostStats } from '../../post-stats/entities/post-stats.entity';
import { Tags } from '../../tags/entities/tags.entity';
export declare class Post {
    id: number;
    slug: string;
    title: string;
    description: string;
    thumbnail: string | null;
    published?: Date;
    updated_at?: Date;
    hash_code: string;
    tags?: Tags[];
    category?: string;
    stats?: PostStats;
}
export declare class PostsResponse {
    posts: Post[];
    totalCount: number;
    hasMore: boolean;
}
