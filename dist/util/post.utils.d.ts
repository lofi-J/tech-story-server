import { PrismaService } from '../prisma/prisma.service';
export declare class PostUtils {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPostIdBySlug(slug: string): Promise<number | null>;
    isPostExists(slug: string): Promise<boolean>;
}
