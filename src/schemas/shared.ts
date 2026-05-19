import { z } from "zod";

export const dateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
});

export const richTextSchema = z.string();

export const urlSchema = z.string().url().optional().or(z.literal(""));
