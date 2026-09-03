import { PdfDocument } from "@/components/pdf/pdf-document";
import { pdf } from "@react-pdf/renderer";

export async function generateResumePdf(): Promise<Blob> {
  return pdf(<PdfDocument />).toBlob();
}
