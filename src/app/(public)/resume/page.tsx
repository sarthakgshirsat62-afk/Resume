import { Container } from "@/components/common/container";
import { DownloadResumeButton } from "@/components/resume/download-resume-button";
import { ResumeView } from "@/components/resume/resume-view";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional resume of Sarthak — Product Manager.",
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-20">
      <Container size="md">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2">
              Resume
            </Badge>
            <h1 className="text-2xl font-bold">Sarthak</h1>
            <p className="text-muted-foreground text-sm">Product Manager</p>
          </div>
          <div className="flex gap-2">
            <DownloadResumeButton />
          </div>
        </div>

        {/* Resume card */}
        <div className="rounded-xl border border-border shadow-xl overflow-hidden bg-white dark:bg-[hsl(240,10%,6%)]">
          <ResumeView />
        </div>
      </Container>
    </div>
  );
}
