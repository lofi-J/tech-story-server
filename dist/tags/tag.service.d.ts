import { PrismaService } from 'src/prisma/prisma.service';
import { TagsOrderBy } from './enums/order-by.enum';
export declare class TagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllTags(orderBy: TagsOrderBy): Promise<{
        id: number;
        tag_name: string;
        created_at: Date | null;
        usage_count: number;
    }[] | {
        id: number;
        tag_name: string;
        created_at: Date | null;
        usage_count: undefined;
    }[]>;
    getPopularTags(limit?: number): Promise<({
        _count: {
            post_tags: number;
        };
    } & {
        id: number;
        created_at: Date | null;
        tag_name: string;
    })[]>;
    getTagUsageStats(): Promise<{
        id: number;
        created_at: Date | null;
        _count: {
            post_tags: number;
        };
        tag_name: string;
    }[]>;
}
