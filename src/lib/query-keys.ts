export const queryKeys = {
  resumes: ["resumes"] as const,
  resume: (id: string) => ["resumes", id] as const,
  resumePublic: (slug: string) => ["resumes", "public", slug] as const,
  user: ["user"] as const,
} as const;
