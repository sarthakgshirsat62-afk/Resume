import { Globe, MapPin, Phone } from "lucide-react";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";
import { formatDateRange } from "@/utils/date";

const resumeData = {
  personalInfo: {
    fullName: "Sarthak Shirsat",
    headline: "Senior Tech Product Manager",
    email: "sarthakgshirsat62@gmail.com",
    phone: "+91 72765 71768",
    location: "Bengaluru, Karnataka, India",
    website: "",
    linkedin: "www.linkedin.com/in/sarth1964",
    github: "",
    summary:
      "Product Manager with 7+ years of experience in AI-powered solutions, cloud-native platforms, workflow optimization and cloud Policy & Governance. Proven ability to lead end-to-end product lifecycles, drive cost savings ($50M+ client impact), and improve efficiency across analytics and enterprise SaaS. MBA from IIM Indore with expertise in B2B/B2C product strategy, agile delivery, and user-centric design.",
  },
  experience: [
    {
      id: "1",
      role: "Senior Tech Product Manager",
      company: "Optum, UHG",
      location: "Bengaluru",
      startDate: "2025-03",
      endDate: "",
      isCurrent: true,
      highlights: [
        "Led enterprise-wide cloud policy & governance framework across AWS, Azure and GCP.",
        "Built automated guardrails (IAM, network, encryption, data residency, logging) using Azure Policy, AWS SCPs and GCP Org Policies.",
        "Designed cost & usage governance model (FinOps) with budgets, anomaly detection and chargeback across clouds, helping engineering teams cut wasted cloud spend by ~25% while maintaining performance SLAs.",
        "Partnered with Security, Compliance, Legal and Platform Engineering to enable self-service cloud onboarding with policy-as-code, shrinking environment provisioning time from weeks to hours without increasing risk.",
      ],
    },
    {
      id: "2",
      role: "Product Manager",
      company: "Optum, UHG",
      location: "Bengaluru",
      startDate: "2023-11",
      endDate: "2025-03",
      isCurrent: false,
      highlights: [
        "Led the end-to-end product lifecycle of an AI-powered chatbot for Prior Authorization (PA) users, reducing manual job-aid searches and saving 30+ minutes per case.",
        "Redesigned and restructured 150K+ clinical guidelines, collaborating with clinicians, architects, and stakeholders, enabling AI data models and boosting system usability and response times.",
        "Migrated a high-volume fax system (10K+/hr) to a cloud-native solution, improving security, scalability, and operational resilience.",
        "Directed UI/UX redesign initiatives for PA workflows, streamlining user journeys and improving efficiency across 8M+ annual cases.",
        "Integrated Case Status & Eligibility Services with external vendors, reducing inbound call inquiries and achieving $100K annual cost savings.",
      ],
    },
    {
      id: "3",
      role: "Product Analyst",
      company: "Optum, UHG",
      location: "Bengaluru",
      startDate: "2022-04",
      endDate: "2023-11",
      isCurrent: false,
      highlights: [
        "Contributed to the development of an AI-enabled abstraction platform, leveraging NLP to improve hybrid measure performance through medical record review.",
        "Managed a portfolio of 300+ HEDIS, AMP, and PQA quality measures, ensuring NCQA compliance and achieving $100K+ operational savings.",
        "Enabled $50M+ client savings annually by embedding predictive, preventive analytics into quality measurement workflows.",
        "Conceptualized and piloted GenAI-driven workflow optimizations for OQM users, reducing cognitive load and improving case resolution efficiency.",
      ],
    },
    {
      id: "4",
      role: "Product Management Intern",
      company: "Manomay Consultancy Services",
      location: "Hyderabad",
      startDate: "2021-04",
      endDate: "2021-06",
      isCurrent: false,
      highlights: [
        "Conducted market research across 20+ Caribbean insurers, identifying digital transformation opportunities and use cases for document digitization in insurance.",
        "Recommended vendor solutions for invoice automation, shortening the cash conversion cycle by 30%.",
      ],
    },
    {
      id: "5",
      role: "Software Engineer",
      company: "Druva Data Solutions",
      location: "Pune",
      startDate: "2019-05",
      endDate: "2019-10",
      isCurrent: false,
      highlights: [
        "Developed AWS-based SaaS applications for enterprise clients, collaborating with manufacturing and aerospace stakeholders.",
        "Built a centralized dashboard across Druva products, improving visibility for 10K+ users and reducing reporting effort by 30%.",
        "Designed and deployed REST APIs on AWS Lambda & API Gateway, achieving 20% cost savings through optimized execution.",
      ],
    },
    {
      id: "6",
      role: "Associate Software Engineer",
      company: "Veritas Technologies LLC",
      location: "Pune",
      startDate: "2017-07",
      endDate: "2019-05",
      isCurrent: false,
      highlights: [
        "Delivered 6 license authentication features, strengthening security and reducing errors by 25%.",
        "Led cross-team initiatives, delivering customer-facing features in collaboration with 10+ product teams.",
        "Migrated key components to Golang, improving scalability by 20% and boosting performance.",
        "Implemented telemetry services to detect/prevent revenue leakage, recovering $400K+ in perpetual licenses.",
      ],
    },
  ],
  education: [
    {
      id: "1",
      degree: "MBA",
      institution: "Indian Institute of Management Indore (IIM-Indore)",
      location: "Indore",
      startDate: "2020-06",
      endDate: "2022-05",
      gpa: "",
    },
    {
      id: "2",
      degree: "Advance Diploma in AI Product Management",
      institution: "IIT Madras",
      location: "Chennai",
      startDate: "",
      endDate: "",
      gpa: "",
    },
    {
      id: "3",
      degree: "B.Tech in Information Technology",
      institution: "College of Engineering Pune (COEP)",
      location: "Pune",
      startDate: "2013-08",
      endDate: "2017-05",
      gpa: "",
    },
  ],
  skills: [
    { category: "Product", items: ["Product Management", "Agile & Scrum", "Problem Solving", "Stakeholder Management", "Product Roadmap", "Product Strategy", "Business Strategy", "Team Management"] },
    { category: "Technical", items: ["Data Analysis", "AWS", "Jenkins", "AI Tools", "NLP", "ML", "SQL", "Python", "Golang"] },
    { category: "Tools", items: ["Jira", "Rally", "Aha!", "SharePoint", "Tableau", "PowerBI"] },
  ],
  certifications: [
    { name: "Prompt Engineering with ChatGPT", issuer: "LinkedIn Learning", date: "2025" },
    { name: "Product Management: Building a Product Roadmap", issuer: "LinkedIn Learning", date: "2025" },
  ],
};

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
          <a href={`mailto:${personalInfo.email}`} className="hover:text-foreground transition-colors">
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
                  {formatDateRange(exp.startDate, exp.isCurrent ? undefined : exp.endDate, exp.isCurrent)}
                </p>
              </div>
              <ul className="space-y-1 ml-3">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
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
                {edu.gpa && (
                  <p className="text-xs text-muted-foreground mt-0.5">GPA: {edu.gpa}</p>
                )}
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
              <p className="text-xs text-muted-foreground font-mono">
                {cert.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
