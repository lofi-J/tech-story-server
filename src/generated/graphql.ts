export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
};

export type Query = {
  __typename?: 'Query';
  getAllTags: Array<Tags>;
  popularTags: Array<Tags>;
  tagUsageStats: Array<Tags>;
};

export type QueryGetAllTagsArgs = {
  orderBy?: TagsOrderBy;
};

export type QueryPopularTagsArgs = {
  limit?: Scalars['Int']['input'];
};

export type Tags = {
  __typename?: 'Tags';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  tag_name: Scalars['String']['output'];
  usage_count?: Maybe<Scalars['Int']['output']>;
};

/** 정렬 기준 */
export enum TagsOrderBy {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Popular = 'POPULAR',
  TagName = 'TAG_NAME',
}

export type GetAllTagsQueryVariables = Exact<{
  orderBy?: InputMaybe<TagsOrderBy>;
}>;

export type GetAllTagsQuery = {
  __typename?: 'Query';
  getAllTags: Array<{
    __typename?: 'Tags';
    id: number;
    tag_name: string;
    created_at: string;
    usage_count?: number | null;
  }>;
};

export type GetPopularTagsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPopularTagsQuery = {
  __typename?: 'Query';
  popularTags: Array<{
    __typename?: 'Tags';
    id: number;
    tag_name: string;
    usage_count?: number | null;
  }>;
};

export type GetTagUsageStatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTagUsageStatsQuery = {
  __typename?: 'Query';
  tagUsageStats: Array<{
    __typename?: 'Tags';
    id: number;
    tag_name: string;
    usage_count?: number | null;
    created_at: string;
  }>;
};
