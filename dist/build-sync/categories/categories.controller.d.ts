import { CategoriesService } from './categories.service';
import type { CreateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<{
        ok: boolean;
        status: number;
        data: ({
            _count: {
                posts: number;
            };
        } & {
            category_name: string;
            id: number;
            created_at: Date | null;
        })[];
    }>;
    getCategory(id: number): Promise<{
        ok: boolean;
        status: number;
        data: {
            _count: {
                posts: number;
            };
        } & {
            category_name: string;
            id: number;
            created_at: Date | null;
        };
    }>;
    getCategoryByName(categoryName: string): Promise<{
        ok: boolean;
        status: number;
        data: {
            _count: {
                posts: number;
            };
        } & {
            category_name: string;
            id: number;
            created_at: Date | null;
        };
    }>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        ok: boolean;
        status: number;
        data: {
            category_name: string;
            id: number;
            created_at: Date | null;
        };
        message: string;
    }>;
    deleteCategory(id: number): Promise<{
        ok: boolean;
        status: number;
        message: string;
    }>;
}
