"use client";

import { pdfStyles as s } from "@/components/pdf/pdf-styles";
import { resumeData } from "@/components/resume/resume-data";
import { formatDateRange } from "@/utils/date";
import { Document, Link, Page, Text, View } from "@react-pdf/renderer";

export function PdfDocument() {
  const { personalInfo, experience, education, skills, certifications } = resumeData;

  return (
    <Document title={`${personalInfo.fullName} — Resume`} author={personalInfo.fullName}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{personalInfo.fullName}</Text>
          <Text style={s.headline}>{personalInfo.headline}</Text>
          <View style={s.contactRow}>
            <Text style={s.contactItem}>{personalInfo.email}</Text>
            <Text style={s.contactItem}>{personalInfo.phone}</Text>
            <Text style={s.contactItem}>{personalInfo.location}</Text>
            {personalInfo.website && (
              <Link style={s.contactItem} src={`https://${personalInfo.website}`}>
                {personalInfo.website}
              </Link>
            )}
            {personalInfo.linkedin && (
              <Link style={s.contactItem} src={`https://${personalInfo.linkedin}`}>
                {personalInfo.linkedin}
              </Link>
            )}
            {personalInfo.github && (
              <Link style={s.contactItem} src={`https://${personalInfo.github}`}>
                {personalInfo.github}
              </Link>
            )}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Summary</Text>
          <Text style={s.summaryText}>{personalInfo.summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Experience</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={s.entry} wrap={false}>
              <View style={s.entryHeaderRow}>
                <View>
                  <Text style={s.entryTitle}>{exp.role}</Text>
                  <Text style={s.entrySubtitle}>
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </Text>
                </View>
                <Text style={s.entryDate}>
                  {formatDateRange(
                    exp.startDate,
                    exp.isCurrent ? undefined : exp.endDate,
                    exp.isCurrent,
                  )}
                </Text>
              </View>
              {exp.highlights.map((highlight) => (
                <View key={highlight} style={s.bulletRow}>
                  <Text style={s.bulletMark}>-</Text>
                  <Text style={s.bulletText}>{highlight}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={s.entryHeaderRow} wrap={false}>
              <View>
                <Text style={s.entryTitle}>{edu.degree}</Text>
                <Text style={s.entrySubtitle}>
                  {edu.institution}
                  {edu.location ? ` · ${edu.location}` : ""}
                </Text>
                {edu.gpa ? <Text style={s.entryDate}>GPA: {edu.gpa}</Text> : null}
              </View>
              {edu.startDate ? (
                <Text style={s.entryDate}>{formatDateRange(edu.startDate, edu.endDate)}</Text>
              ) : null}
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Skills</Text>
          {skills.map((group) => (
            <View key={group.category} style={s.skillRow}>
              <Text style={s.skillCategory}>{group.category}</Text>
              <Text style={s.skillItems}>{group.items.join(" · ")}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Certifications</Text>
          {certifications.map((cert) => (
            <View key={cert.name} style={s.certRow} wrap={false}>
              <Text style={s.entryTitle}>
                {cert.name} <Text style={s.entrySubtitle}>· {cert.issuer}</Text>
              </Text>
              <Text style={s.entryDate}>{cert.date}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
