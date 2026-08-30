"use client";

import { castVote, getVoteSummary } from "@/features/blog/actions";
import { useVisitorId } from "@/features/blog/hooks/use-visitor-id";
import type { BlogVoteSummary } from "@/features/blog/types";
import { cn } from "@/utils/cn";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function VotePanel({
  postSlug,
  initialSummary,
}: {
  postSlug: string;
  initialSummary: BlogVoteSummary;
}) {
  const [summary, setSummary] = useState(initialSummary);
  const visitorId = useVisitorId();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!visitorId) return;
    getVoteSummary({ postSlug, visitorId })
      .then(setSummary)
      .catch((error) => console.error("Failed to load vote summary:", error));
  }, [postSlug, visitorId]);

  function handleVote(value: 1 | -1) {
    if (!visitorId || isPending) return;
    startTransition(async () => {
      try {
        const next = await castVote({ postSlug, visitorId, value });
        setSummary(next);
      } catch (error) {
        console.error("Failed to cast vote:", error);
        toast.error("Couldn't save your vote. Please try again.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={!visitorId || isPending}
        onClick={() => handleVote(1)}
        aria-pressed={summary.myVote === 1}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 disabled:opacity-50",
          summary.myVote === 1
            ? "bg-primary/10 border border-primary/30 text-primary"
            : "border border-border text-muted-foreground hover:text-foreground hover:bg-accent",
        )}
      >
        <ThumbsUp weight={summary.myVote === 1 ? "fill" : "regular"} className="h-4 w-4" />
        {summary.upvotes}
      </button>
      <button
        type="button"
        disabled={!visitorId || isPending}
        onClick={() => handleVote(-1)}
        aria-pressed={summary.myVote === -1}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 disabled:opacity-50",
          summary.myVote === -1
            ? "bg-destructive/10 border border-destructive/30 text-destructive"
            : "border border-border text-muted-foreground hover:text-foreground hover:bg-accent",
        )}
      >
        <ThumbsDown weight={summary.myVote === -1 ? "fill" : "regular"} className="h-4 w-4" />
        {summary.downvotes}
      </button>
    </div>
  );
}
