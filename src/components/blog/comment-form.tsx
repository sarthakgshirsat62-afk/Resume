"use client";

import { Button } from "@/components/ui/button";
import { addComment } from "@/features/blog/actions";
import type { BlogComment } from "@/features/blog/types";
import { createCommentInputSchema } from "@/schemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

const commentFormSchema = createCommentInputSchema.pick({
  authorName: true,
  authorEmail: true,
  body: true,
  honeypot: true,
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

const NAME_STORAGE_KEY = "blog-commenter-name";

interface CommentFormProps {
  postSlug: string;
  parentId?: string;
  placeholder?: string;
  onSuccess: (comment: BlogComment) => void;
  onCancel?: () => void;
}

export function CommentForm({
  postSlug,
  parentId,
  placeholder,
  onSuccess,
  onCancel,
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { authorName: "", authorEmail: "", body: "", honeypot: "" },
  });

  useEffect(() => {
    const storedName = localStorage.getItem(NAME_STORAGE_KEY);
    if (storedName) setValue("authorName", storedName);
  }, [setValue]);

  async function onSubmit(values: CommentFormValues) {
    setIsSubmitting(true);
    try {
      const created = await addComment({ ...values, postSlug, parentId });
      localStorage.setItem(NAME_STORAGE_KEY, values.authorName);
      if (created) {
        onSuccess(created);
        reset({
          authorName: values.authorName,
          authorEmail: values.authorEmail,
          body: "",
          honeypot: "",
        });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input
            {...register("authorName")}
            placeholder="Name"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {errors.authorName && (
            <p className="mt-1 text-xs text-destructive">{errors.authorName.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("authorEmail")}
            placeholder="Email (optional, not shown)"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {errors.authorEmail && (
            <p className="mt-1 text-xs text-destructive">{errors.authorEmail.message}</p>
          )}
        </div>
      </div>
      <div>
        <textarea
          {...register("body")}
          rows={3}
          placeholder={placeholder ?? "Write a comment..."}
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        {errors.body && <p className="mt-1 text-xs text-destructive">{errors.body.message}</p>}
      </div>
      <input
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : parentId ? "Post reply" : "Post comment"}
        </Button>
        {onCancel && (
          <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
