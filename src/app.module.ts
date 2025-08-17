import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './build-sync/posts/posts.module';
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
    }),
    PostsModule,
    GraphQLPostsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService, PrismaService],
})
export class AppModule {}
