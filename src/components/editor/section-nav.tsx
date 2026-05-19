"use client";

import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Plus,
  Star,
  Tag,
  Text,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/utils/cn";

interface SectionNavProps {
  sections: Array<{
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
  resumeId: string;
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  personalInfo: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Tag,
  projects: Star,
  certifications: Award,
  custom: Text,
};

export function SectionNav({ sections, resumeId }: SectionNavProps) {
  const { activeSectionId, setActiveSection } = useEditorStore();

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sections
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {sections.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">No sections yet</p>
          ) : (
            sections.map((section) => {
              const Icon = SECTION_ICONS[section.type] ?? Text;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors text-left",
                    activeSectionId === section.id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    !section.isVisible && "opacity-40",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{section.title}</span>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-2">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </div>
    </div>
  );
}
