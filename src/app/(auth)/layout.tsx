import Link from "next/link";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-card border-r border-border relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

        <div className="relative">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              S
            </span>
            <span>
              Sarthak<span className="text-primary">.</span>
            </span>
          </Link>
        </div>

        <div className="relative space-y-4 max-w-sm">
          <blockquote className="text-2xl font-semibold leading-snug">
            &ldquo;First, solve the problem. Then, write the code.&rdquo;
          </blockquote>
          <p className="text-muted-foreground">— John Johnson</p>
        </div>

        <div className="relative flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          Premium portfolio & resume builder
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg lg:hidden"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              S
            </span>
            Sarthak
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
