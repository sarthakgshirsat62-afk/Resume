import { headers } from "next/headers";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatRelativeTime } from "@/utils/date";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const userResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, session.user.id))
    .orderBy(resumes.updatedAt)
    .limit(5);

  const stats = [
    { label: "Resumes", value: userResumes.length },
    { label: "Public", value: userResumes.filter((r) => r.isPublic).length },
  ];

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome back, {session.user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Manage your resumes and portfolio.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent resumes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Your Resumes</h2>
          <Button size="sm" asChild>
            <Link href="/dashboard/resumes/new">
              <Plus className="mr-1 h-4 w-4" />
              New Resume
            </Link>
          </Button>
        </div>

        {userResumes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No resumes yet.</p>
            <Button variant="glow" asChild>
              <Link href="/dashboard/resumes/new">
                <Plus className="mr-2 h-4 w-4" />
                Create your first resume
              </Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
            {userResumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center gap-4 p-4 bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                  {resume.title[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{resume.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Updated {formatRelativeTime(resume.updatedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={resume.isPublic ? "emerald" : "outline"} className="text-xs">
                    {resume.isPublic ? "Public" : "Private"}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/resumes/${resume.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
