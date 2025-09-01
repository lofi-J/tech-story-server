import { TagsOrderBy } from './enums/order-by.enum';
import { TagsService } from './tag.service';
export declare class TagsResolver {
    private readonly tagsService;
    constructor(tagsService: TagsService);
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
    getPopularTags(limit: number): Promise<{
        usage_count: number;
        _count: {
            post_tags: number;
        };
        id: number;
        created_at: Date | null;
        tag_name: string;
    }[]>;
    getTagUsageStats(): Promise<{
        id: number;
        tag_name: string;
        created_at: Date | null;
        usage_count: number;
    }[]>;
}
