import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/container";
import { Separator } from "@/components/ui/separator";

const skills = [
  { category: "Product", items: ["Product Strategy", "Roadmapping", "Agile/Scrum", "Stakeholder Management"] },
  { category: "Cloud & Infra", items: ["AWS", "Azure", "GCP", "FinOps", "Policy-as-Code"] },
  { category: "AI & Data", items: ["NLP", "ML", "GenAI", "SQL", "Tableau", "PowerBI"] },
  { category: "Engineering", items: ["Python", "Golang", "Jira", "Jenkins", "SharePoint"] },
];

const featuredProjects = [
  {
    title: "AI Prior Authorization Chatbot",
    description:
      "Led end-to-end product lifecycle of an AI-powered chatbot for Prior Authorization users, reducing manual job-aid searches and saving 30+ minutes per case.",
    tech: ["AI/ML", "NLP", "Healthcare", "Agile"],
    href: "#",
    repoHref: "#",
    status: "Production",
  },
  {
    title: "Cloud Policy & Governance Framework",
    description:
      "Built enterprise-wide cloud policy & governance framework across AWS, Azure and GCP with automated guardrails and FinOps cost model, cutting wasted cloud spend by ~25%.",
    tech: ["AWS SCPs", "Azure Policy", "GCP Org Policies", "FinOps"],
    href: "#",
    repoHref: "#",
    status: "Enterprise",
  },
  {
    title: "AI Abstraction Platform",
    description:
      "Contributed to an AI-enabled abstraction platform leveraging NLP for hybrid measure performance, enabling $50M+ client savings annually through predictive analytics.",
    tech: ["NLP", "GenAI", "HEDIS", "Analytics"],
    href: "#",
    repoHref: "#",
    status: "Live",
  },
];

const experience = [
  {
    role: "Senior Tech Product Manager",
    company: "Optum, UHG",
    period: "March 2025 — Present",
    description: "Leading enterprise cloud policy & governance framework across AWS, Azure and GCP.",
  },
  {
    role: "Product Manager",
    company: "Optum, UHG",
    period: "Nov 2023 — March 2025",
    description: "Led AI-powered chatbot for Prior Authorization, impacting 8M+ annual cases.",
  },
  {
    role: "Product Analyst",
    company: "Optum, UHG",
    period: "Apr 2022 — Nov 2023",
    description: "Enabled $50M+ client savings via predictive analytics and AI workflow optimizations.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-40 dark:opacity-20" />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <Container className="relative">
          <div className="max-w-3xl">
            {/* Status badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to new opportunities
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance leading-[1.1] mb-6">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Sarthak</span>
              <span className="text-muted-foreground">.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Product Manager with 7+ years of experience in{" "}
              <span className="text-foreground font-medium">AI-powered solutions</span> and{" "}
              <span className="text-foreground font-medium">cloud-native platforms</span>. I drive
              end-to-end product lifecycles, cost savings, and enterprise-scale impact.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="glow" size="lg" asChild>
                <Link href="/resume">
                  View Resume
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">See My Work</Link>
              </Button>
              <div className="flex gap-2">
                <a href="https://github.com/sarthakgshirsat62-afk" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-11 w-11">
                    <GithubLogo weight="fill" className="h-5 w-5" />
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/sarth1964"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="h-11 w-11">
                    <LinkedinLogo weight="fill" className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { value: "7+", label: "Years experience" },
                { value: "$50M+", label: "Client impact" },
                { value: "8M+", label: "Annual cases" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="py-20 border-t border-border">
        <Container>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">
              Skills
            </Badge>
            <h2 className="text-3xl font-bold">Technology Stack</h2>
            <p className="mt-2 text-muted-foreground">Tools and technologies I work with daily.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group) => (
              <div key={group.category} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-20 border-t border-border">
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <Badge variant="outline" className="mb-4">
                Projects
              </Badge>
              <h2 className="text-3xl font-bold">Featured Work</h2>
              <p className="mt-2 text-muted-foreground">
                A selection of projects I&apos;m proud of.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/portfolio">
                All projects <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                className="group hover-card flex flex-col overflow-hidden"
              >
                {/* Project color bar */}
                <div className="h-1 w-full bg-gradient-to-r from-primary/80 to-primary/20" />
                <CardContent className="flex flex-col flex-1 p-6 gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="emerald" className="mb-2 text-xs">
                        {project.status}
                      </Badge>
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                    </div>
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon-sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/portfolio">View all projects</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Experience Snapshot */}
      <section className="py-20 border-t border-border">
        <Container>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">
              Experience
            </Badge>
            <h2 className="text-3xl font-bold">Work History</h2>
          </div>

          <div className="space-y-6 max-w-2xl">
            {experience.map((exp, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background">
                    <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-primary text-sm font-medium">{exp.company}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{exp.period}</p>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-8" asChild>
            <Link href="/resume">
              Full Resume <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <Container>
          <div className="relative rounded-2xl border border-border bg-card p-8 md:p-12 overflow-hidden text-center">
            {/* BG glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-60" />
            <div className="relative">
              <Badge variant="emerald" className="mb-6">
                Let&apos;s Connect
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interested in working together?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                I&apos;m always open to discussing product design work or partnership opportunities.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="glow" size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:sarthakgshirsat62@gmail.com">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
