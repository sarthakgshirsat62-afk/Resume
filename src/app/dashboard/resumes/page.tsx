import { headers } from "next/headers";
import Link from "next/link";
import { Plus } from "lucide-react";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { formatRelativeTime } from "@/utils/date";

export default async function ResumesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const userResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, session.user.id))
    .orderBy(resumes.updatedAt);

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Resumes</h1>
          <p className="text-muted-foreground mt-1">{userResumes.length} resume(s)</p>
        </div>
        <Button variant="glow" asChild>
          <Link href="/dashboard/resumes/new">
            <Plus className="mr-2 h-4 w-4" />
            New Resume
          </Link>
        </Button>
      </div>

      {userResumes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-16 text-center">
          <div className="mb-4 text-4xl">📄</div>
          <h2 className="font-semibold mb-2">No resumes yet</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Create your first resume to get started.
          </p>
          <Button variant="glow" asChild>
            <Link href="/dashboard/resumes/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Resume
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userResumes.map((resume) => (
            <div
              key={resume.id}
              className="group rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
            >
              {/* Preview placeholder */}
              <div className="h-32 rounded-t-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-b border-border">
                <span className="text-3xl font-bold text-primary/30">
                  {resume.title[0]?.toUpperCase()}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm truncate">{resume.title}</h3>
                  <Badge variant={resume.isPublic ? "emerald" : "outline"} className="text-[11px] flex-shrink-0">
                    {resume.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Updated {formatRelativeTime(resume.updatedAt)}
                </p>

                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <Link href={`/dashboard/resumes/${resume.id}/edit`}>Edit</Link>
                  </Button>
                  {resume.isPublic && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/resume/${resume.slug}`} target="_blank">
                        View
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
