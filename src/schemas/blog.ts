import { z } from "zod";

export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be in YYYY-MM-DD format"),
  description: z.string().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;

export const createCommentInputSchema = z.object({
  postSlug: z.string().min(1),
  parentId: z.string().uuid().optional(),
  authorName: z.string().trim().min(1).max(80),
  authorEmail: z.string().trim().email().optional().or(z.literal("")),
  body: z.string().trim().min(1).max(2000),
  honeypot: z.string().optional().or(z.literal("")),
});

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;

export const deleteCommentInputSchema = z.object({
  commentId: z.string().uuid(),
});

export const castVoteInputSchema = z.object({
  postSlug: z.string().min(1),
  visitorId: z.string().uuid(),
  value: z.union([z.literal(1), z.literal(-1)]),
});

export type CastVoteInput = z.infer<typeof castVoteInputSchema>;

export const voteSummaryInputSchema = z.object({
  postSlug: z.string().min(1),
  visitorId: z.string().uuid().optional(),
});
