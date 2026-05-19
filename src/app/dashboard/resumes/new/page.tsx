"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createResumeSchema } from "@/schemas/resume";
import { createResume } from "@/features/resume-editor/actions";
import type { z } from "zod";

type CreateResumeForm = z.infer<typeof createResumeSchema>;

export default function NewResumePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateResumeForm>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: { title: "My Resume" },
  });

  async function onSubmit(data: CreateResumeForm) {
    setIsLoading(true);
    try {
      const resume = await createResume(data);
      toast.success("Resume created!");
      router.push(`/dashboard/resumes/${resume.id}/edit`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create resume");
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <div className="mb-8">
        <Badge variant="outline" className="mb-3">New Resume</Badge>
        <h1 className="text-2xl font-bold">Create a new resume</h1>
        <p className="text-muted-foreground mt-1">Give your resume a name to get started.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Resume Title</Label>
              <Input
                id="title"
                placeholder="e.g., Software Engineer Resume"
                {...form.register("title")}
                autoFocus
              />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                This is for your reference only — not shown on the resume.
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="glow" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Resume"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
