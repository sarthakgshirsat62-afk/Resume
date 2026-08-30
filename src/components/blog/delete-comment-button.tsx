"use client";

import { Button } from "@/components/ui/button";
import { deleteComment } from "@/features/blog/actions";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteCommentButton({ commentId }: { commentId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!window.confirm("Delete this comment and any replies to it?")) return;

    startTransition(async () => {
      try {
        await deleteComment({ commentId });
        toast.success("Comment deleted");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete comment");
      }
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      disabled={isPending}
      onClick={handleDelete}
      className="text-muted-foreground hover:text-destructive"
      aria-label="Delete comment"
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
