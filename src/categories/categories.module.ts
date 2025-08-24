import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  providers: [CategoriesResolver, PrismaService, CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
