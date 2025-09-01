import { PostsOrderBy, SortOrder } from '../enums/posts-order-by.enum';
export declare class GetPostsInput {
    limit: number;
    offset: number;
    orderBy: PostsOrderBy;
    order: SortOrder;
    search?: string;
}
export declare class GetPostsByTagInput {
    tagName: string;
    limit: number;
    offset: number;
    orderBy: PostsOrderBy;
    order: SortOrder;
}
export declare class GetPostsByCategoryInput {
    categoryName: string;
    limit: number;
    offset: number;
    orderBy: PostsOrderBy;
    order: SortOrder;
}
