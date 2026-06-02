import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects and work by Sarthak — from side projects to production systems.",
};

const projects: Array<{
  title: string;
  description: string;
  tech: string[];
  href: string;
  repoHref: string;
  stars?: number;
  status: string;
  featured: boolean;
  category: string;
}> = [
  {
    title: "Gyaan",
    description:
      "An AI-powered study app that lets students chat with their own study material and get guided exam preparation — powered by Anthropic Claude. Supports PDF, DOCX, and TXT uploads with prompt caching and IP-based rate limiting.",
    tech: ["Next.js", "TypeScript", "Claude API", "KaTeX", "Upstash Redis", "Vercel"],
    href: "https://github.com/sarthakgshirsat62-afk/Gyaan",
    repoHref: "https://github.com/sarthakgshirsat62-afk/Gyaan",
    status: "Open Source",
    featured: true,
    category: "AI/ML",
  },
  {
    title: "BundleGuard",
    description:
      "CLI tool and GitHub Action that monitors JavaScript bundle sizes, alerts on regressions, and tracks size history over time.",
    tech: ["Node.js", "TypeScript", "GitHub Actions", "CLI"],
    href: "#",
    repoHref: "#",
    stars: 128,
    status: "Open Source",
    featured: false,
    category: "DevTools",
  },
  {
    title: "SchemaSync",
    description:
      "Database schema synchronization tool that generates migration scripts by diffing two database schemas and handling edge cases automatically.",
    tech: ["Go", "PostgreSQL", "MySQL", "CLI"],
    href: "#",
    repoHref: "#",
    stars: 64,
    status: "Open Source",
    featured: false,
    category: "DevTools",
  },
  {
    title: "LogPilot",
    description:
      "Lightweight structured logging library for Node.js with automatic context propagation, correlation IDs, and pluggable transports.",
    tech: ["Node.js", "TypeScript", "npm"],
    href: "#",
    repoHref: "#",
    stars: 210,
    status: "Open Source",
    featured: false,
    category: "Library",
  },
];

const categories = ["All", "AI/ML", "DevTools", "Library"];

export default function PortfolioPage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="pt-24 pb-24">
      <Container>
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-16 max-w-2xl">
          <span className="section-label mb-6 inline-flex">Portfolio</span>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tighter mt-4 mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Things I&apos;ve{" "}
            <span className="gradient-text">built & shipped</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A collection of projects ranging from side experiments to production systems.
            Source code available for most.
          </p>
        </div>

        {/* ── Featured ─────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="data-label mb-6">Featured</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((project) => (
              <div
                key={project.title}
                className="framer-card flex flex-col overflow-hidden"
              >
                <div className="h-px w-full bg-gradient-to-r from-blue-400/60 via-violet-400/40 to-pink-400/20" />
                <div className="flex flex-col flex-1 p-6 gap-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="tech-tag text-[10px]">{project.status}</span>
                      <h3 className="font-semibold text-foreground text-base">{project.title}</h3>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <a href={project.repoHref} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon-sm" className="rounded-lg">
                          <GithubLogo className="h-4 w-4" />
                        </Button>
                      </a>
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon-sm" className="rounded-lg">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="tech-tag text-[11px]">{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="tech-tag text-[11px]">+{project.tech.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── All Projects ─────────────────────────────────────── */}
        <div>
          <p className="data-label mb-6">All Projects</p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--card-border)" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-card hover:bg-accent/50 transition-colors"
                style={{ borderTop: i > 0 ? "1px solid var(--card-border)" : "none" }}
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-sm text-foreground">{project.title}</h3>
                    <span className="tech-tag text-[10px]">{project.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden sm:flex flex-wrap gap-1">
                    {project.tech.slice(0, 2).map((t) => (
                      <span key={t} className="tech-tag text-[11px]">{t}</span>
                    ))}
                  </div>
                  {project.stars !== undefined && (
                    <span className="text-xs text-muted-foreground font-mono">★ {project.stars}</span>
                  )}
                  <div className="flex gap-1">
                    <a href={project.repoHref} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon-sm" className="rounded-lg">
                        <GithubLogo className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon-sm" className="rounded-lg">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
