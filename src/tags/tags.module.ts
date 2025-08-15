import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TagsResolver } from './tag.resolver';
import { TagsService } from './tag.service';

@Module({
  providers: [TagsResolver, PrismaService, TagsService],
})
export class TagsModule {}
