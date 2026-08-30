import type { BlogFrontmatter } from "@/schemas/blog";

export interface BlogPostSummary extends BlogFrontmatter {
  slug: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  html: string;
}

export interface BlogComment {
  id: string;
  postSlug: string;
  parentId: string | null;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface BlogCommentThread extends BlogComment {
  replies: BlogComment[];
}

export interface BlogCommentForModeration extends BlogComment {
  postTitle: string;
}

export type VoteValue = 1 | -1 | 0;

export interface BlogVoteSummary {
  upvotes: number;
  downvotes: number;
  myVote: VoteValue;
}
