import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostUtils } from '../util/post.utils';
import { PostStatsResolver } from './post-stats.resolver';
import { PostStatsService } from './post-stats.service';

@Module({
  providers: [PostStatsResolver, PostStatsService, PrismaService, PostUtils],
  exports: [PostStatsService],
})
export class PostStatsModule {}
