import { Prisma } from '@prisma/client';
export declare const isPrismaError: (error: unknown) => error is Prisma.PrismaClientKnownRequestError;
export declare const handlePrismaError: (error: Prisma.PrismaClientKnownRequestError) => never;
