import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { DashboardSidebar } from "@/components/editor/dashboard-sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar user={session.user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard topbar */}
        <header className="flex h-14 items-center gap-4 border-b border-border px-6 flex-shrink-0">
          <div className="flex-1" />
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
