"use client";

import { CommentForm } from "@/components/blog/comment-form";
import type { BlogComment } from "@/features/blog/types";
import { formatRelativeTime } from "@/utils/date";
import { useState } from "react";

interface CommentItemProps {
  postSlug: string;
  comment: BlogComment;
  replies?: BlogComment[];
  onReplyPosted: (comment: BlogComment) => void;
}

export function CommentItem({ postSlug, comment, replies = [], onReplyPosted }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="space-y-4">
      <CommentBody comment={comment} />

      <button
        type="button"
        onClick={() => setIsReplying((value) => !value)}
        className="ml-11 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {isReplying ? "Cancel" : "Reply"}
      </button>

      {isReplying && (
        <div className="ml-11">
          <CommentForm
            postSlug={postSlug}
            parentId={comment.id}
            placeholder={`Reply to ${comment.authorName}...`}
            onSuccess={(reply) => {
              onReplyPosted(reply);
              setIsReplying(false);
            }}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-11 space-y-4 border-l border-border pl-4">
          {replies.map((reply) => (
            <CommentBody key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentBody({ comment }: { comment: BlogComment }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {comment.authorName.slice(0, 1).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{comment.authorName}</span>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(new Date(comment.createdAt))}
          </span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
          {comment.body}
        </p>
      </div>
    </div>
  );
}
