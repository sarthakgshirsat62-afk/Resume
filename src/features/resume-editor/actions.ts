"use server";

import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { resumes, resumeSections } from "@/db/schema";
import { slugify, generateId } from "@/utils/string";
import { createResumeSchema, updateResumeMetaSchema } from "@/schemas/resume";

async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function createResume(input: z.infer<typeof createResumeSchema>) {
  const session = await requireAuth();
  const { title } = createResumeSchema.parse(input);

  const slug = `${slugify(session.user.name)}-${slugify(title)}-${Date.now()}`;

  const [resume] = await db
    .insert(resumes)
    .values({
      userId: session.user.id,
      title,
      slug,
    })
    .returning();

  if (!resume) throw new Error("Failed to create resume");

  // Seed default sections
  await db.insert(resumeSections).values([
    {
      resumeId: resume.id,
      type: "personalInfo",
      title: "Personal Info",
      order: 0,
      data: {
        fullName: session.user.name,
        headline: "",
        email: session.user.email,
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        summary: "",
        photoUrl: null,
      },
    },
    {
      resumeId: resume.id,
      type: "experience",
      title: "Experience",
      order: 1,
      data: { entries: [] },
    },
    {
      resumeId: resume.id,
      type: "education",
      title: "Education",
      order: 2,
      data: { entries: [] },
    },
    {
      resumeId: resume.id,
      type: "skills",
      title: "Skills",
      order: 3,
      data: { groups: [] },
    },
    {
      resumeId: resume.id,
      type: "projects",
      title: "Projects",
      order: 4,
      data: { entries: [] },
    },
  ]);

  revalidatePath("/dashboard/resumes");
  return resume;
}

export async function deleteResume(resumeId: string) {
  const session = await requireAuth();

  await db
    .delete(resumes)
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, session.user.id)));

  revalidatePath("/dashboard/resumes");
}

export async function updateResumeMeta(input: z.infer<typeof updateResumeMetaSchema>) {
  const session = await requireAuth();
  const { resumeId, ...updates } = updateResumeMetaSchema.parse(input);

  await db
    .update(resumes)
    .set({ ...updates, updatedAt: new Date() })
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, session.user.id)));

  revalidatePath(`/dashboard/resumes/${resumeId}/edit`);
}

export async function updateSectionData(sectionId: string, data: unknown) {
  const session = await requireAuth();

  const [section] = await db
    .select({ resumeId: resumeSections.resumeId })
    .from(resumeSections)
    .where(eq(resumeSections.id, sectionId))
    .limit(1);

  if (!section) throw new Error("Section not found");

  const [resume] = await db
    .select({ userId: resumes.userId })
    .from(resumes)
    .where(eq(resumes.id, section.resumeId))
    .limit(1);

  if (!resume || resume.userId !== session.user.id) throw new Error("Unauthorized");

  await db
    .update(resumeSections)
    .set({ data: data as Record<string, unknown>, updatedAt: new Date() })
    .where(eq(resumeSections.id, sectionId));
}

export async function reorderSections(resumeId: string, orderedIds: string[]) {
  const session = await requireAuth();

  const [resume] = await db
    .select({ userId: resumes.userId })
    .from(resumes)
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, session.user.id)))
    .limit(1);

  if (!resume) throw new Error("Not found");

  await Promise.all(
    orderedIds.map((id, index) =>
      db
        .update(resumeSections)
        .set({ order: index })
        .where(eq(resumeSections.id, id)),
    ),
  );
}

export async function addSection(resumeId: string, type: string, title: string) {
  const session = await requireAuth();

  const [resume] = await db
    .select({ userId: resumes.userId })
    .from(resumes)
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, session.user.id)))
    .limit(1);

  if (!resume) throw new Error("Not found");

  const existing = await db
    .select({ order: resumeSections.order })
    .from(resumeSections)
    .where(eq(resumeSections.resumeId, resumeId))
    .orderBy(resumeSections.order);

  const nextOrder = (existing[existing.length - 1]?.order ?? -1) + 1;

  const defaultData: Record<string, unknown> = {
    experience: { entries: [] },
    education: { entries: [] },
    skills: { groups: [] },
    projects: { entries: [] },
    certifications: { entries: [] },
    custom: { content: "" },
    personalInfo: {
      fullName: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      photoUrl: null,
    },
  };

  const [section] = await db
    .insert(resumeSections)
    .values({
      resumeId,
      type,
      title,
      order: nextOrder,
      data: defaultData[type] ?? {},
    })
    .returning();

  revalidatePath(`/dashboard/resumes/${resumeId}/edit`);
  return section;
}

export async function deleteSection(sectionId: string) {
  const session = await requireAuth();

  const [section] = await db
    .select({ resumeId: resumeSections.resumeId })
    .from(resumeSections)
    .where(eq(resumeSections.id, sectionId))
    .limit(1);

  if (!section) throw new Error("Not found");

  const [resume] = await db
    .select({ userId: resumes.userId })
    .from(resumes)
    .where(eq(resumes.id, section.resumeId))
    .limit(1);

  if (!resume || resume.userId !== session.user.id) throw new Error("Unauthorized");

  await db.delete(resumeSections).where(eq(resumeSections.id, sectionId));

  revalidatePath(`/dashboard/resumes/${section.resumeId}/edit`);
}
