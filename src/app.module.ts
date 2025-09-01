import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import type { Request, Response } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule as BuildSyncCategoriesModule } from './build-sync/categories/categories.module';
import { PostsModule } from './build-sync/posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PostStatsModule } from './post-stats/post-stats.module';
import { PostsModule as GraphQLPostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { SupabaseService } from './supabase/supabase.service';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
        session: req.session,
      }),
    }),
    BuildSyncCategoriesModule,
    CategoriesModule,
    PostsModule,
    GraphQLPostsModule,
    PostStatsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService, PrismaService],
})
export class AppModule {}
