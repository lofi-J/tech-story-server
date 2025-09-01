import { CategoriesService } from './categories.service';
import { CategoriesOrderBy } from './enums/categories-order-by.enum';
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
    getPopularCategories(limit: number): Promise<{
        usage_count: number;
        _count: {
            posts: number;
        };
        category_name: string;
        id: number;
        created_at: Date | null;
    }[]>;
    getCategoryUsageStats(): Promise<{
        id: number;
        category_name: string;
        created_at: Date | null;
        usage_count: number;
    }[]>;
}
