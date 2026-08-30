import { DeleteCommentButton } from "@/components/blog/delete-comment-button";
import { Badge } from "@/components/ui/badge";
import { getAllCommentsForModeration } from "@/features/blog/utils/comments";
import { formatRelativeTime } from "@/utils/date";
import Link from "next/link";

export default async function DashboardCommentsPage() {
  const comments = await getAllCommentsForModeration();

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Comments</h1>
        <p className="text-muted-foreground mt-1">{comments.length} comment(s) across all posts</p>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-16 text-center">
          <h2 className="font-semibold mb-2">No comments yet</h2>
          <p className="text-muted-foreground text-sm">
            Comments left on blog posts will show up here.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          {comments.map((comment, i) => (
            <div
              key={comment.id}
              className="flex items-start justify-between gap-4 p-4 bg-card"
              style={{ borderTop: i > 0 ? "1px solid var(--card-border)" : "none" }}
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{comment.authorName}</span>
                  {comment.parentId && (
                    <Badge variant="outline" className="text-[10px]">
                      Reply
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.body}</p>
                <Link
                  href={`/blog/${comment.postSlug}`}
                  target="_blank"
                  className="text-xs text-primary hover:underline"
                >
                  {comment.postTitle}
                </Link>
              </div>
              <DeleteCommentButton commentId={comment.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
