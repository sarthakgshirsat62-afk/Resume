"use server";

import type { BlogComment, BlogVoteSummary } from "@/features/blog/types";

import { headers } from "next/headers";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { blogComments, blogVotes } from "@/db/schema";
import { toBlogComment } from "@/features/blog/utils/comments";
import { getPostSlugs } from "@/features/blog/utils/posts";
import { auth } from "@/lib/auth";
import {
  castVoteInputSchema,
  createCommentInputSchema,
  deleteCommentInputSchema,
  voteSummaryInputSchema,
} from "@/schemas/blog";

export async function addComment(input: unknown): Promise<BlogComment | null> {
  const parsed = createCommentInputSchema.parse(input);

  if (parsed.honeypot) return null;
  if (!getPostSlugs().includes(parsed.postSlug)) throw new Error("Post not found");

  if (parsed.parentId) {
    const [parent] = await db
      .select()
      .from(blogComments)
      .where(eq(blogComments.id, parsed.parentId));
    if (!parent || parent.postSlug !== parsed.postSlug) throw new Error("Comment not found");
    if (parent.parentId !== null) throw new Error("Cannot reply to a reply");
  }

  const [created] = await db
    .insert(blogComments)
    .values({
      postSlug: parsed.postSlug,
      parentId: parsed.parentId ?? null,
      authorName: parsed.authorName,
      authorEmail: parsed.authorEmail || null,
      body: parsed.body,
    })
    .returning();

  if (!created) throw new Error("Failed to create comment");
  return toBlogComment(created);
}

export async function deleteComment(input: unknown): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const { commentId } = deleteCommentInputSchema.parse(input);

  await db.transaction(async (tx) => {
    await tx.delete(blogComments).where(eq(blogComments.parentId, commentId));
    await tx.delete(blogComments).where(eq(blogComments.id, commentId));
  });
}

async function computeVoteSummary(postSlug: string, visitorId?: string): Promise<BlogVoteSummary> {
  const votes = await db.select().from(blogVotes).where(eq(blogVotes.postSlug, postSlug));

  let upvotes = 0;
  let downvotes = 0;
  let myVote: BlogVoteSummary["myVote"] = 0;

  for (const vote of votes) {
    if (vote.value === 1) upvotes += 1;
    else if (vote.value === -1) downvotes += 1;
    if (visitorId && vote.visitorId === visitorId) myVote = vote.value === 1 ? 1 : -1;
  }

  return { upvotes, downvotes, myVote };
}

export async function getVoteSummary(input: unknown): Promise<BlogVoteSummary> {
  const { postSlug, visitorId } = voteSummaryInputSchema.parse(input);
  return computeVoteSummary(postSlug, visitorId);
}

export async function castVote(input: unknown): Promise<BlogVoteSummary> {
  const { postSlug, visitorId, value } = castVoteInputSchema.parse(input);
  if (!getPostSlugs().includes(postSlug)) throw new Error("Post not found");

  const [existing] = await db
    .select()
    .from(blogVotes)
    .where(and(eq(blogVotes.postSlug, postSlug), eq(blogVotes.visitorId, visitorId)));

  if (existing && existing.value === value) {
    await db.delete(blogVotes).where(eq(blogVotes.id, existing.id));
  } else if (existing) {
    await db
      .update(blogVotes)
      .set({ value, updatedAt: new Date() })
      .where(eq(blogVotes.id, existing.id));
  } else {
    await db.insert(blogVotes).values({ postSlug, visitorId, value });
  }

  return computeVoteSummary(postSlug, visitorId);
}
