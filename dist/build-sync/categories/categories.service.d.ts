import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCategories(): Promise<({
        _count: {
            posts: number;
        };
    } & {
        category_name: string;
        id: number;
        created_at: Date | null;
    })[]>;
    getCategory(id: number): Promise<({
        _count: {
            posts: number;
        };
    } & {
        category_name: string;
        id: number;
        created_at: Date | null;
    }) | null>;
    getCategoryByName(categoryName: string): Promise<({
        _count: {
            posts: number;
        };
    } & {
        category_name: string;
        id: number;
        created_at: Date | null;
    }) | null>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        category_name: string;
        id: number;
        created_at: Date | null;
    }>;
    deleteCategory(id: number): Promise<{
        category_name: string;
        id: number;
        created_at: Date | null;
    }>;
}
