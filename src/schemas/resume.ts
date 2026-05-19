import { z } from "zod";

export const resumeMetaSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string().min(1).default("My Resume"),
  slug: z.string().min(1),
  isPublic: z.boolean().default(false),
  templateId: z.string().default("default"),
  themeColor: z.string().default("emerald"),
  fontFamily: z.string().default("inter"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResumeMeta = z.infer<typeof resumeMetaSchema>;

const sectionBaseSchema = z.object({
  id: z.string().uuid(),
  resumeId: z.string().uuid(),
  type: z.string(),
  title: z.string(),
  order: z.number().int().nonnegative(),
  isVisible: z.boolean().default(true),
});

export const personalInfoDataSchema = z.object({
  fullName: z.string().min(1).default(""),
  headline: z.string().default(""),
  email: z.string().email().or(z.literal("")).default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  website: z.string().default(""),
  linkedin: z.string().default(""),
  github: z.string().default(""),
  twitter: z.string().default(""),
  photoUrl: z.string().nullable().default(null),
  summary: z.string().default(""),
});

export const personalInfoSectionSchema = sectionBaseSchema.extend({
  type: z.literal("personalInfo"),
  data: personalInfoDataSchema,
});

export const experienceEntrySchema = z.object({
  id: z.string().uuid(),
  company: z.string().default(""),
  role: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  isCurrent: z.boolean().default(false),
  description: z.string().default(""),
});

export const experienceSectionSchema = sectionBaseSchema.extend({
  type: z.literal("experience"),
  entries: z.array(experienceEntrySchema).default([]),
});

export const educationEntrySchema = z.object({
  id: z.string().uuid(),
  institution: z.string().default(""),
  degree: z.string().default(""),
  fieldOfStudy: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  isCurrent: z.boolean().default(false),
  gpa: z.string().default(""),
  description: z.string().default(""),
});

export const educationSectionSchema = sectionBaseSchema.extend({
  type: z.literal("education"),
  entries: z.array(educationEntrySchema).default([]),
});

export const skillGroupSchema = z.object({
  id: z.string().uuid(),
  category: z.string().default(""),
  skills: z.array(z.string()).default([]),
});

export const skillsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("skills"),
  groups: z.array(skillGroupSchema).default([]),
});

export const projectEntrySchema = z.object({
  id: z.string().uuid(),
  name: z.string().default(""),
  description: z.string().default(""),
  url: z.string().default(""),
  repoUrl: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  isCurrent: z.boolean().default(false),
  techStack: z.array(z.string()).default([]),
});

export const projectsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("projects"),
  entries: z.array(projectEntrySchema).default([]),
});

export const certificationEntrySchema = z.object({
  id: z.string().uuid(),
  name: z.string().default(""),
  issuer: z.string().default(""),
  date: z.string().default(""),
  expiryDate: z.string().default(""),
  credentialId: z.string().default(""),
  url: z.string().default(""),
});

export const certificationsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("certifications"),
  entries: z.array(certificationEntrySchema).default([]),
});

export const customSectionSchema = sectionBaseSchema.extend({
  type: z.literal("custom"),
  content: z.string().default(""),
});

export const resumeSectionSchema = z.discriminatedUnion("type", [
  personalInfoSectionSchema,
  experienceSectionSchema,
  educationSectionSchema,
  skillsSectionSchema,
  projectsSectionSchema,
  certificationsSectionSchema,
  customSectionSchema,
]);

export type ResumeSection = z.infer<typeof resumeSectionSchema>;
export type PersonalInfoSection = z.infer<typeof personalInfoSectionSchema>;
export type ExperienceSection = z.infer<typeof experienceSectionSchema>;
export type EducationSection = z.infer<typeof educationSectionSchema>;
export type SkillsSection = z.infer<typeof skillsSectionSchema>;
export type ProjectsSection = z.infer<typeof projectsSectionSchema>;
export type CertificationsSection = z.infer<typeof certificationsSectionSchema>;
export type CustomSection = z.infer<typeof customSectionSchema>;
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;
export type EducationEntry = z.infer<typeof educationEntrySchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ProjectEntry = z.infer<typeof projectEntrySchema>;
export type CertificationEntry = z.infer<typeof certificationEntrySchema>;
export type PersonalInfoData = z.infer<typeof personalInfoDataSchema>;

export const fullResumeSchema = resumeMetaSchema.extend({
  sections: z.array(resumeSectionSchema),
});

export type FullResume = z.infer<typeof fullResumeSchema>;

export const createResumeSchema = z.object({
  title: z.string().min(1, "Title is required").max(256),
});

export const updateResumeMetaSchema = z.object({
  resumeId: z.string().uuid(),
  title: z.string().min(1).max(256).optional(),
  isPublic: z.boolean().optional(),
  templateId: z.string().optional(),
  themeColor: z.string().optional(),
  fontFamily: z.string().optional(),
});
