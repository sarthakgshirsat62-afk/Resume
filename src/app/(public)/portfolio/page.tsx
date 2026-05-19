import type { Metadata } from "next";
import { ArrowUpRight, Star } from "lucide-react";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects and work by Sarthak — from side projects to production systems.",
};

const projects = [
  {
    title: "FinanceOS",
    description:
      "Comprehensive personal finance dashboard with AI-powered insights, budget tracking, investment portfolio analysis, and automated financial reports.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "Recharts"],
    href: "#",
    repoHref: "#",
    stars: 342,
    status: "Production",
    featured: true,
    category: "Full-Stack",
  },
  {
    title: "DevFlow",
    description:
      "Real-time code collaboration platform with syntax highlighting, live cursors, and GitHub integration for distributed engineering teams.",
    tech: ["React", "WebSockets", "Redis", "Docker", "Monaco"],
    href: "#",
    repoHref: "#",
    stars: 891,
    status: "Open Source",
    featured: true,
    category: "Full-Stack",
  },
  {
    title: "QueryLens",
    description:
      "Natural language to SQL converter that understands your database schema and generates optimized queries through a conversational interface.",
    tech: ["Python", "FastAPI", "LangChain", "PostgreSQL", "React"],
    href: "#",
    repoHref: "#",
    stars: 256,
    status: "Beta",
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

const categories = ["All", "Full-Stack", "AI/ML", "DevTools", "Library"];

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-20">
      <Container>
        {/* Header */}
        <div className="mb-16 space-y-4 max-w-2xl">
          <Badge variant="outline">Portfolio</Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            Things I&apos;ve{" "}
            <span className="gradient-text">built & shipped</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            A collection of projects ranging from side experiments to production systems.
            Source code available for most.
          </p>
        </div>

        {/* Featured projects */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            Featured
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <Card
                  key={project.title}
                  className="group hover-card flex flex-col overflow-hidden"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/20" />
                  <CardContent className="flex flex-col flex-1 p-6 gap-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Badge variant="emerald" className="text-xs">
                          {project.status}
                        </Badge>
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                      </div>
                      <div className="flex gap-1">
                        <a href={project.repoHref} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon-sm">
                            <GithubLogo className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={project.href} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon-sm">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="tech-tag text-[11px]">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="tech-tag text-[11px]">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {project.stars}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All projects list */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            All Projects
          </p>
          <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
            {projects.map((project) => (
              <div
                key={project.title}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-sm">{project.title}</h3>
                    <Badge variant="outline" className="text-[11px] h-5">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:flex flex-wrap gap-1">
                    {project.tech.slice(0, 2).map((t) => (
                      <span key={t} className="tech-tag text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3" />
                    {project.stars}
                  </div>
                  <div className="flex gap-1">
                    <a href={project.repoHref} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon-sm">
                        <GithubLogo className="h-4 w-4" />
                      </Button>
                    </a>
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon-sm">
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
