"use client";

import { resumeData } from "@/components/resume/resume-data";
import { Button } from "@/components/ui/button";
import { usePdfExport } from "@/features/pdf-export/hooks/use-pdf-export";
import { CircleNotch, DownloadSimple } from "@phosphor-icons/react";

export function DownloadResumeButton() {
  const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`;
  const { exportPdf, isGenerating } = usePdfExport(fileName);

  return (
    <Button
      id="download-pdf-btn"
      variant="glow"
      size="sm"
      className="gap-2"
      onClick={exportPdf}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
      ) : (
        <DownloadSimple weight="bold" className="h-4 w-4" />
      )}
      {isGenerating ? "Generating..." : "Download PDF"}
    </Button>
  );
}
