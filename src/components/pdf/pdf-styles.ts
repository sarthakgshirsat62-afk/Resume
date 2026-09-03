import { StyleSheet } from "@react-pdf/renderer";

const emerald = "#059669";
const foreground = "#171717";
const muted = "#525252";
const subtle = "#737373";
const border = "#e0e0e0";

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: foreground,
    padding: "14mm 16mm",
    lineHeight: 1.45,
  },
  header: { marginBottom: 14 },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", marginBottom: 3 },
  headline: { fontSize: 11, fontFamily: "Helvetica-Bold", color: emerald, marginBottom: 6 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  contactItem: { fontSize: 8.5, color: subtle },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: emerald,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 4,
    paddingBottom: 3,
    borderBottom: `0.75pt solid ${border}`,
  },
  summaryText: { color: muted },
  entry: { marginBottom: 8 },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    gap: 8,
  },
  entryTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: foreground },
  entrySubtitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: emerald, marginTop: 1 },
  entryDate: { fontSize: 8, color: subtle },
  bulletRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 },
  bulletMark: { width: 10, color: emerald },
  bulletText: { flex: 1, color: muted },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillCategory: { width: 70, fontFamily: "Helvetica-Bold", fontSize: 8.5, color: foreground },
  skillItems: { flex: 1, fontSize: 8.5, color: muted },
  certRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3, gap: 8 },
});
