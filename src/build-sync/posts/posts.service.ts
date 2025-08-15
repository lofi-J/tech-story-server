import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TagsService } from '../tags/tags.service';
import { CreatePostDto, PostResponse, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private tagsService: TagsService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostResponse> {
    const { tags, ...postData } = createPostDto;

    const post = await this.prisma.posts.create({
      data: {
        ...postData,
        updated_at: new Date(),
      },
    });

    if (tags && tags.length > 0) {
      await this.attachTags(post.id, tags);
    }

    return this.getPostWithTags(post.id);
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    const { tags, ...postData } = updatePostDto;

    await this.prisma.posts.update({
      where: { id },
      data: {
        ...postData,
        updated_at: new Date(),
      },
    });

    if (tags) {
      await this.prisma.post_tags.deleteMany({
        where: { post_id: id },
      });

      if (tags.length > 0) {
        await this.attachTags(id, tags);
      }
    }

    return this.getPostWithTags(id);
  }

  async updatePostBySlug(
    slug: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    const post = await this.prisma.posts.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return this.updatePost(post.id, updatePostDto);
  }

  async upsertPost(createPostDto: CreatePostDto): Promise<PostResponse> {
    const existingPost = await this.prisma.posts.findUnique({
      where: { slug: createPostDto.slug },
    });

    if (existingPost) {
      return this.updatePost(existingPost.id, createPostDto);
    }

    return this.createPost(createPostDto);
  }

  async getPost(id: number): Promise<PostResponse | null> {
    return this.getPostWithTags(id);
  }

  async getPostBySlug(slug: string): Promise<PostResponse | null> {
    const post = await this.prisma.posts.findUnique({
      where: { slug },
    });

    if (!post) {
      return null;
    }

    return this.getPostWithTags(post.id);
  }

  async getAllPosts(): Promise<PostResponse[]> {
    const posts = await this.prisma.posts.findMany({
      include: {
        post_tags: {
          include: {
            tags: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      hash_code: post.hash_code,
      published: post.published,
      updated_at: post.updated_at,
      tags: post.post_tags.map((pt) => pt.tags.tag_name),
    }));
  }

  async deletePost(id: number): Promise<void> {
    await this.prisma.posts.delete({
      where: { id },
    });
  }

  async deletePostBySlug(slug: string): Promise<void> {
    const post = await this.prisma.posts.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    await this.deletePost(post.id);
  }

  private async attachTags(postId: number, tagNames: string[]): Promise<void> {
    for (const tagName of tagNames) {
      let tag = await this.prisma.tags.findUnique({
        where: { tag_name: tagName },
      });

      if (!tag) {
        const createTagResponse = await this.tagsService.createTag({
          tag_name: tagName,
        });
        tag = createTagResponse.data as {
          id: number;
          tag_name: string;
          created_at: Date | null;
        };
      }

      if (tag) {
        await this.prisma.post_tags.create({
          data: {
            post_id: postId,
            tag_id: tag.id,
          },
        });
      }
    }
  }

  private async getPostWithTags(id: number): Promise<PostResponse> {
    const post = await this.prisma.posts.findUnique({
      where: { id },
      include: {
        post_tags: {
          include: {
            tags: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      published: post.published,
      updated_at: post.updated_at,
      tags: post.post_tags.map((pt) => pt.tags.tag_name),
      hash_code: post.hash_code,
    };
  }
}
