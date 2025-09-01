import { GetPostsByCategoryInput, GetPostsByTagInput, GetPostsInput } from './dto/posts.dto';
import { Post, PostsResponse } from './entities/post.entity';
import { PostsService } from './posts.service';
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(input: GetPostsInput): Promise<PostsResponse>;
    getPostBySlug(slug: string): Promise<Post | null>;
    getPostsByTag(input: GetPostsByTagInput): Promise<PostsResponse>;
    getPostsByCategory(input: GetPostsByCategoryInput): Promise<PostsResponse>;
}
