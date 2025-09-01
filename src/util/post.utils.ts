import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostUtils {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * slug를 통해 post의 id를 조회.
   * @param slug - 포스트의 slug
   * @returns post id 또는 null (포스트가 존재하지 않는 경우)
   */
  async getPostIdBySlug(slug: string): Promise<number | null> {
    try {
      const post = await this.prisma.posts.findUnique({
        where: { slug },
        select: { id: true },
      });

      return post?.id || null;
    } catch (error) {
      console.error('Error finding post by slug:', error);
      return null;
    }
  }

  /**
   * slug를 통해 post가 존재하는지 확인.
   * @param slug - 포스트의 slug
   * @returns 포스트 존재 여부
   */
  async isPostExists(slug: string): Promise<boolean> {
    const postId = await this.getPostIdBySlug(slug);
    return postId !== null;
  }
}
