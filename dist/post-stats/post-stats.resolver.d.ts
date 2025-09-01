import type { Request } from 'express';
import { PostStatsService } from './post-stats.service';
export declare class PostStatsResolver {
    private readonly postStatsService;
    constructor(postStatsService: PostStatsService);
    increasePostViews(slug: string, context: {
        req: Request;
    }): Promise<{
        id: number;
        updated_at: Date | null;
        post_id: number | null;
        views: number | null;
        likes: number | null;
    }>;
    increasePostLikes(slug: string, context: {
        req: Request;
    }): Promise<{
        id: number;
        updated_at: Date | null;
        post_id: number | null;
        views: number | null;
        likes: number | null;
    }>;
}
