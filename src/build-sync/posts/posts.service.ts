import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async upsertPost(postDto: CreatePostDto) {
    const { slug, published, tags, category, hash_code, title, description } =
      postDto;
    const inputTags = tags ?? [];

    // published가 string인 경우 Date로 변환
    const publishedDate = published ? new Date(published) : null;

    return await this.prisma.$transaction(async (tx) => {
      let categoryId: number | null = null;

      // 카테고리 처리 (있는 경우)
      if (category) {
        const categoryRecord = await tx.categories.upsert({
          where: { category_name: category },
          update: {},
          create: { category_name: category },
        });
        categoryId = categoryRecord.id;
      }

      // posts 테이블에 upsert
      const post = await tx.posts.upsert({
        where: { slug },
        update: {
          published: publishedDate,
          hash_code,
          title,
          description,
          category_id: categoryId,
        },
        create: {
          slug,
          published: publishedDate,
          hash_code,
          title,
          description,
          category_id: categoryId,
        },
      });

      // 태그 처리가 필요한 경우에만 실행
      if (inputTags.length > 0) {
        // 태그들을 한 번에 upsert (없으면 생성, 있으면 그대로)
        await tx.tags.createMany({
          data: inputTags.map((tagName) => ({ tag_name: tagName })),
          skipDuplicates: true, // 중복 무시
        });

        // 기존 포스트-태그 관계 삭제
        await tx.post_tags.deleteMany({
          where: { post_id: post.id },
        });

        // 새로운 포스트-태그 관계 생성
        const tagRecords = await tx.tags.findMany({
          where: { tag_name: { in: inputTags } },
          select: { id: true },
        });

        await tx.post_tags.createMany({
          data: tagRecords.map((tag) => ({
            post_id: post.id,
            tag_id: tag.id,
          })),
        });
      } else {
        // 태그가 없는 경우 기존 관계만 삭제
        await tx.post_tags.deleteMany({
          where: { post_id: post.id },
        });
      }

      return post;
    });
  }

  async getAllPosts() {
    return await this.prisma.posts.findMany({
      include: {
        categories: true,
        post_tags: {
          include: {
            tags: true,
          },
        },
      },
      orderBy: { updated_at: 'desc' },
    });
  }

  async getPost(id: number) {
    return await this.prisma.posts.findUnique({
      where: { id },
      include: {
        categories: true,
        post_tags: {
          include: {
            tags: true,
          },
        },
      },
    });
  }

  async getPostBySlug(slug: string) {
    return await this.prisma.posts.findUnique({
      where: { slug },
      include: {
        categories: true,
        post_tags: {
          include: {
            tags: true,
          },
        },
      },
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const published = updatePostDto.published;
    const tags = updatePostDto.tags;
    const category = updatePostDto.category;
    const hash_code = updatePostDto.hash_code;
    const title = updatePostDto.title;
    const description = updatePostDto.description;
    const inputTags = tags ?? [];

    return await this.prisma.$transaction(async (tx) => {
      // undefined 필드는 제외하고 업데이트
      const updateData: Record<string, unknown> = {};
      if (published !== undefined) updateData.published = published;
      if (hash_code !== undefined) updateData.hash_code = hash_code;
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;

      // 카테고리 처리 (category가 정의된 경우에만)
      if (category !== undefined) {
        if (category) {
          const categoryRecord = await tx.categories.upsert({
            where: { category_name: category },
            update: {},
            create: { category_name: category },
          });
          updateData.category_id = categoryRecord.id;
        } else {
          updateData.category_id = null;
        }
      }

      const post = await tx.posts.update({
        where: { id },
        data: updateData,
      });

      // 태그 업데이트는 tags가 정의된 경우에만
      if (tags !== undefined) {
        if (inputTags.length > 0) {
          await tx.tags.createMany({
            data: inputTags.map((tagName) => ({ tag_name: tagName })),
            skipDuplicates: true,
          });

          await tx.post_tags.deleteMany({
            where: { post_id: post.id },
          });

          const tagRecords = await tx.tags.findMany({
            where: { tag_name: { in: inputTags } },
            select: { id: true },
          });

          await tx.post_tags.createMany({
            data: tagRecords.map((tag) => ({
              post_id: post.id,
              tag_id: tag.id,
            })),
          });
        } else {
          await tx.post_tags.deleteMany({
            where: { post_id: post.id },
          });
        }
      }

      return post;
    });
  }

  async updatePostBySlug(slug: string, updatePostDto: UpdatePostDto) {
    const post = await this.getPostBySlug(slug);
    if (!post) {
      throw new Error('Post not found');
    }
    return await this.updatePost(post.id, updatePostDto);
  }

  async deletePost(id: number) {
    return await this.prisma.posts.delete({
      where: { id },
    });
  }

  async deletePostBySlug(slug: string) {
    return await this.prisma.posts.delete({
      where: { slug },
    });
  }
}
