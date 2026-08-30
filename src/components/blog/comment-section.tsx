"use client";

import { CommentForm } from "@/components/blog/comment-form";
import { CommentItem } from "@/components/blog/comment-item";
import type { BlogComment, BlogCommentThread } from "@/features/blog/types";
import { useState } from "react";

interface CommentSectionProps {
  postSlug: string;
  initialThreads: BlogCommentThread[];
}

export function CommentSection({ postSlug, initialThreads }: CommentSectionProps) {
  const [threads, setThreads] = useState(initialThreads);

  function handleNewComment(comment: BlogComment) {
    setThreads((prev) => [...prev, { ...comment, replies: [] }]);
  }

  function handleNewReply(reply: BlogComment) {
    if (!reply.parentId) return;
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === reply.parentId ? { ...thread, replies: [...thread.replies, reply] } : thread,
      ),
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-foreground">
        Comments{" "}
        {threads.length > 0 && (
          <span className="font-normal text-muted-foreground">({threads.length})</span>
        )}
      </h2>

      <CommentForm postSlug={postSlug} onSuccess={handleNewComment} />

      {threads.length === 0 ? (
        <p className="text-sm text-muted-foreground">Be the first to comment.</p>
      ) : (
        <div className="space-y-8">
          {threads.map((thread) => (
            <CommentItem
              key={thread.id}
              postSlug={postSlug}
              comment={thread}
              replies={thread.replies}
              onReplyPosted={handleNewReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
