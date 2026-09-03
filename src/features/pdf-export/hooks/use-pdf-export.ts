"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

export function usePdfExport(fileName: string) {
  const [isGenerating, setIsGenerating] = useState(false);

  const exportPdf = useCallback(async () => {
    setIsGenerating(true);
    try {
      const { generateResumePdf } = await import("@/features/pdf-export/utils/generate-pdf");
      const blob = await generateResumePdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate resume PDF:", error);
      toast.error("Couldn't generate the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [fileName]);

  return { exportPdf, isGenerating };
}
