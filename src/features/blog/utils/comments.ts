import type {
  BlogComment,
  BlogCommentForModeration,
  BlogCommentThread,
} from "@/features/blog/types";

import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { blogComments } from "@/db/schema";
import { getAllPosts } from "@/features/blog/utils/posts";

export function toBlogComment(row: typeof blogComments.$inferSelect): BlogComment {
  return {
    id: row.id,
    postSlug: row.postSlug,
    parentId: row.parentId,
    authorName: row.authorName,
    body: row.body,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getCommentThreads(postSlug: string): Promise<BlogCommentThread[]> {
  const rows = await db
    .select()
    .from(blogComments)
    .where(eq(blogComments.postSlug, postSlug))
    .orderBy(asc(blogComments.createdAt));

  const comments = rows.map(toBlogComment);
  const topLevel = comments.filter((comment) => comment.parentId === null);
  const repliesByParentId = new Map<string, BlogComment[]>();

  for (const comment of comments) {
    if (!comment.parentId) continue;
    const replies = repliesByParentId.get(comment.parentId) ?? [];
    replies.push(comment);
    repliesByParentId.set(comment.parentId, replies);
  }

  return topLevel.map((comment) => ({
    ...comment,
    replies: repliesByParentId.get(comment.id) ?? [],
  }));
}

export async function getAllCommentsForModeration(): Promise<BlogCommentForModeration[]> {
  const rows = await db.select().from(blogComments).orderBy(desc(blogComments.createdAt));
  const postTitleBySlug = new Map(getAllPosts().map((post) => [post.slug, post.title]));

  return rows.map((row) => ({
    ...toBlogComment(row),
    postTitle: postTitleBySlug.get(row.postSlug) ?? row.postSlug,
  }));
}
