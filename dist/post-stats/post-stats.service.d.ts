import type { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostUtils } from '../util/post.utils';
export declare class PostStatsService {
    private readonly prisma;
    private readonly postUtils;
    constructor(prisma: PrismaService, postUtils: PostUtils);
    increasePostViews(slug: string, req: Request): Promise<{
        id: number;
        updated_at: Date | null;
        post_id: number | null;
        views: number | null;
        likes: number | null;
    }>;
    increasePostLikes(slug: string, req: Request): Promise<{
        id: number;
        updated_at: Date | null;
        post_id: number | null;
        views: number | null;
        likes: number | null;
    }>;
}
