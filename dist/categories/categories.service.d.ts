import { PrismaService } from '../prisma/prisma.service';
import { CategoriesOrderBy } from './enums/categories-order-by.enum';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllCategories(orderBy: CategoriesOrderBy): Promise<{
        id: number;
        category_name: string;
        created_at: Date | null;
        usage_count: number;
    }[] | {
        id: number;
        category_name: string;
        created_at: Date | null;
        usage_count: undefined;
    }[]>;
    getPopularCategories(limit?: number): Promise<({
        _count: {
            posts: number;
        };
    } & {
        category_name: string;
        id: number;
        created_at: Date | null;
    })[]>;
    getCategoryUsageStats(): Promise<{
        category_name: string;
        id: number;
        created_at: Date | null;
        _count: {
            posts: number;
        };
    }[]>;
}
