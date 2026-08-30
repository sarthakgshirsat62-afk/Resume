import type { BlogPostSummary } from "@/features/blog/types";
import { formatFullDate, parseDateOnly } from "@/utils/date";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="framer-card group flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="data-label">{formatFullDate(parseDateOnly(post.date))}</span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{post.title}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
    </Link>
  );
}
