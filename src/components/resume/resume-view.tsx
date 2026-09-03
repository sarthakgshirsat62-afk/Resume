import { resumeData } from "@/components/resume/resume-data";
import { Separator } from "@/components/ui/separator";
import { formatDateRange } from "@/utils/date";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react/dist/ssr";
import { Globe, MapPin, Phone } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
        {children}
      </h2>
      <Separator className="mt-1.5" />
    </div>
  );
}

export function ResumeView() {
  const { personalInfo, experience, education, skills, certifications } = resumeData;

  return (
    <div className="p-8 md:p-12 space-y-8 text-sm font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {personalInfo.fullName}
        </h1>
        <p className="text-base text-emerald-600 dark:text-emerald-400 font-medium">
          {personalInfo.headline}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <a
            href={`mailto:${personalInfo.email}`}
            className="hover:text-foreground transition-colors"
          >
            {personalInfo.email}
          </a>
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {personalInfo.phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {personalInfo.location}
          </span>
          {personalInfo.website && (
            <a
              href={`https://${personalInfo.website}`}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </a>
          )}
          {personalInfo.linkedin && (
            <a
              href={`https://${personalInfo.linkedin}`}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinLogo className="h-3 w-3" />
              {personalInfo.linkedin}
            </a>
          )}
          {personalInfo.github && (
            <a
              href={`https://${personalInfo.github}`}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogo className="h-3 w-3" />
              {personalInfo.github}
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      <div>
        <SectionTitle>Summary</SectionTitle>
        <p className="text-muted-foreground leading-relaxed">{personalInfo.summary}</p>
      </div>

      {/* Experience */}
      <div>
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium text-xs">
                    {exp.company}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground font-mono flex-shrink-0">
                  {formatDateRange(
                    exp.startDate,
                    exp.isCurrent ? undefined : exp.endDate,
                    exp.isCurrent,
                  )}
                </p>
              </div>
              <ul className="space-y-1 ml-3">
                {exp.highlights.map((highlight) => (
                  <li key={highlight} className="text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium text-xs">
                  {edu.institution}
                  {edu.location && ` · ${edu.location}`}
                </p>
                {edu.gpa && <p className="text-xs text-muted-foreground mt-0.5">GPA: {edu.gpa}</p>}
              </div>
              {edu.startDate && (
                <p className="text-xs text-muted-foreground font-mono">
                  {formatDateRange(edu.startDate, edu.endDate)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <SectionTitle>Skills</SectionTitle>
        <div className="space-y-2">
          {skills.map((group) => (
            <div key={group.category} className="flex gap-2">
              <p className="text-xs font-semibold text-foreground w-24 flex-shrink-0 mt-0.5">
                {group.category}
              </p>
              <p className="text-xs text-muted-foreground">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <SectionTitle>Certifications</SectionTitle>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-medium text-foreground">{cert.name}</span>
                <span className="text-muted-foreground"> · {cert.issuer}</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
