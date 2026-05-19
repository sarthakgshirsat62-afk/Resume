"use client";

import {
  ArrowLeft,
  DownloadSimple,
  Eye,
  EyeSlash,
  FloppyDisk,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/utils/cn";
import { ResumeView } from "@/components/resume/resume-view";
import { SectionNav } from "./section-nav";

interface EditorShellProps {
  resume: {
    id: string;
    title: string;
    isPublic: boolean;
    templateId: string;
    themeColor: string;
    userId: string;
    slug: string;
    fontFamily: string;
    createdAt: Date;
    updatedAt: Date;
  };
  initialSections: Array<{
    id: string;
    resumeId: string;
    type: string;
    title: string;
    order: number;
    isVisible: boolean;
    data: unknown;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export function EditorShell({ resume, initialSections }: EditorShellProps) {
  const { isSaving, lastSaved, isFocusMode, toggleFocusMode, setActiveResumeId } = useEditorStore();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    setActiveResumeId(resume.id);
  }, [resume.id, setActiveResumeId]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Editor header */}
      <header className="flex h-14 items-center gap-3 border-b border-border px-4 flex-shrink-0 bg-background">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" asChild>
              <Link href="/dashboard/resumes">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back to resumes</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-5" />

        <h1 className="text-sm font-semibold truncate max-w-[160px]">{resume.title}</h1>

        <Badge variant={resume.isPublic ? "emerald" : "outline"} className="text-[11px]">
          {resume.isPublic ? "Public" : "Private"}
        </Badge>

        <div className="flex-1" />

        {/* Save status */}
        <div className="text-xs text-muted-foreground hidden sm:flex items-center gap-1.5">
          {isSaving ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Saving...
            </>
          ) : lastSaved ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Saved
            </>
          ) : null}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? (
                <EyeSlash className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isPreviewMode ? "Show editor" : "Preview mode"}</TooltipContent>
        </Tooltip>

        <Button variant="glow" size="sm" className="gap-1.5">
          <DownloadSimple className="h-4 w-4" />
          <span className="hidden sm:inline">Export PDF</span>
        </Button>
      </header>

      {/* Three-panel editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — section list */}
        {!isPreviewMode && (
          <aside className="w-60 flex-shrink-0 border-r border-border bg-card">
            <SectionNav sections={initialSections} resumeId={resume.id} />
          </aside>
        )}

        {/* Canvas — live preview */}
        <div
          className={cn(
            "flex-1 overflow-y-auto bg-muted/30 flex items-start justify-center p-8",
            isPreviewMode && "flex-1",
          )}
        >
          <div className="w-full max-w-[794px] bg-white dark:bg-[hsl(240,10%,6%)] shadow-2xl rounded-lg overflow-hidden min-h-[1122px]">
            <ResumeView />
          </div>
        </div>

        {/* Properties panel */}
        {!isPreviewMode && (
          <aside className="w-80 flex-shrink-0 border-l border-border bg-card overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold">Section Properties</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click a section to edit its content
              </p>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="text-sm text-muted-foreground text-center mt-8">
                Select a section from the left panel to start editing.
              </div>
            </ScrollArea>
          </aside>
        )}
      </div>
    </div>
  );
}
