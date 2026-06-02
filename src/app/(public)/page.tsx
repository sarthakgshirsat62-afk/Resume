import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";

const skills = [
  { category: "Product", items: ["Product Strategy", "Roadmapping", "Agile / Scrum", "Stakeholder Mgmt"] },
  { category: "Cloud & Infra", items: ["AWS", "Azure", "GCP", "FinOps", "Policy-as-Code"] },
  { category: "AI & Data", items: ["NLP", "ML", "GenAI", "SQL", "Tableau", "PowerBI"] },
  { category: "Engineering", items: ["Python", "Golang", "Jira", "Jenkins", "SharePoint"] },
];

const featuredProjects = [
  {
    title: "AI Prior Authorization Chatbot",
    description:
      "Led end-to-end product lifecycle of an AI-powered chatbot for Prior Authorization users, reducing manual job-aid searches and saving 30+ minutes per case.",
    tech: ["AI/ML", "NLP", "Healthcare"],
    status: "Production",
  },
  {
    title: "Cloud Policy & Governance",
    description:
      "Built enterprise-wide cloud policy & governance framework across AWS, Azure and GCP with automated guardrails and FinOps cost model, cutting wasted spend by ~25%.",
    tech: ["AWS SCPs", "Azure Policy", "FinOps"],
    status: "Enterprise",
  },
  {
    title: "AI Abstraction Platform",
    description:
      "Contributed to an AI-enabled abstraction platform leveraging NLP for hybrid measure performance, enabling $50M+ client savings annually.",
    tech: ["NLP", "GenAI", "HEDIS"],
    status: "Live",
  },
];

const experience = [
  {
    role: "Senior Tech Product Manager",
    company: "Optum, UHG",
    period: "Mar 2025 — Present",
    description: "Leading enterprise cloud policy & governance framework across AWS, Azure and GCP.",
  },
  {
    role: "Product Manager",
    company: "Optum, UHG",
    period: "Nov 2023 — Mar 2025",
    description: "Led AI-powered chatbot for Prior Authorization, impacting 8M+ annual cases.",
  },
  {
    role: "Product Analyst",
    company: "Optum, UHG",
    period: "Apr 2022 — Nov 2023",
    description: "Enabled $50M+ client savings via predictive analytics and AI workflow optimizations.",
  },
];

const stats = [
  { value: "7+", label: "Years experience" },
  { value: "$50M+", label: "Client impact" },
  { value: "8M+", label: "Annual cases" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="bg-orb w-[800px] h-[800px] animate-orb-1"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)", top: "-20%", right: "-20%" }}
        />
        <div
          className="bg-orb w-[600px] h-[600px] animate-orb-2"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)", bottom: "-15%", left: "-15%" }}
        />
        <div
          className="bg-orb w-[400px] h-[400px] animate-orb-3"
          style={{ background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)", top: "30%", left: "40%" }}
        />

        {/* Grid */}
        <div className="absolute inset-0 grid-bg" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Status badge */}
            <div className="status-pill mb-10 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to new opportunities
            </div>

            {/* Identity */}
            <p className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-6">
              Senior Product Manager · AI · Cloud
            </p>

            {/* Giant name */}
            <h1 className="font-black tracking-tighter leading-none mb-8 select-none"
                style={{ letterSpacing: "-0.05em" }}>
              <span
                className="block gradient-text"
                style={{ fontSize: "clamp(60px, 10.5vw, 128px)", lineHeight: 1 }}
              >
                Sarthak
              </span>
              <span
                className="block text-foreground/10"
                style={{ fontSize: "clamp(60px, 10.5vw, 128px)", lineHeight: 1 }}
              >
                Shirsat
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Building{" "}
              <span className="text-foreground font-medium">AI-powered solutions</span> and{" "}
              <span className="text-foreground font-medium">cloud-native platforms</span>{" "}
              that drive measurable, enterprise-scale impact.
            </p>

            {/* CTAs — Framer style: white primary, outline secondary */}
            <div className="flex flex-wrap items-center gap-3 mb-16">
              <Button variant="white" size="lg" asChild>
                <Link href="/resume">
                  View Resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">See My Work</Link>
              </Button>
              <div className="flex items-center gap-1 ml-1">
                <a href="https://github.com/sarthakgshirsat62-afk" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
                    <GithubLogo weight="fill" className="h-5 w-5" />
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/sarth1964" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
                    <LinkedinLogo weight="fill" className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} className="stat-block min-w-[120px]">
                  <p className="data-label mb-1.5">{s.label}</p>
                  <p className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="py-32 border-t border-border">
        <Container>
          <div className="mb-14">
            <span className="section-label mb-5 inline-flex">Skills</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4">
              Technology Stack
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-lg">
              Tools and frameworks I use to build, ship, and scale products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((group) => (
              <div key={group.category} className="framer-card p-6">
                <p className="data-label mb-5">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured Work ─────────────────────────────────────── */}
      <section className="py-32 border-t border-border">
        <Container>
          <div className="mb-14 flex items-end justify-between">
            <div>
              <span className="section-label mb-5 inline-flex">Projects</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4">
                Selected Impact
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-lg">
                High-impact initiatives I've led from zero to production.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground" asChild>
              <Link href="/portfolio">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProjects.map((project) => (
              <div key={project.title} className="framer-card flex flex-col overflow-hidden group">
                {/* Color stripe */}
                <div className="h-px w-full bg-gradient-to-r from-blue-400/60 via-violet-400/40 to-pink-400/20" />
                <div className="flex flex-col flex-1 p-6 gap-5">
                  <div>
                    <span className="data-label">{project.status}</span>
                    <h3 className="font-semibold text-foreground mt-2 leading-snug text-base">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/portfolio">View all projects</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Experience ───────────────────────────────────────── */}
      <section className="py-32 border-t border-border">
        <Container>
          <div className="mb-14">
            <span className="section-label mb-5 inline-flex">Career</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-4">Work History</h2>
          </div>

          <div className="relative max-w-2xl">
            {/* Glowing vertical line */}
            <div
              className="timeline-line absolute left-[18px] top-4 bottom-8"
            />

            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i} className="flex gap-6">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 flex h-9 w-9 items-center justify-center">
                    <span className="absolute h-4 w-4 rounded-full bg-primary/20 animate-ping" />
                    <span
                      className="relative h-3 w-3 rounded-full bg-primary"
                      style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.8)" }}
                    />
                  </div>
                  {/* Card */}
                  <div className="framer-card flex-1 p-5 mb-2">
                    <p className="data-label mb-2">{exp.period}</p>
                    <div className="flex flex-wrap items-center gap-x-2 mb-2">
                      <h3 className="font-semibold text-foreground">{exp.role}</h3>
                      <span className="text-xs text-primary font-mono">@ {exp.company}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="mt-10" asChild>
            <Link href="/resume">
              Full Resume <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-32 border-t border-border">
        <Container>
          <div
            className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid var(--card-border)",
            }}
          >
            {/* Ambient glow */}
            <div
              className="bg-orb w-[600px] h-[600px] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

            <div className="relative">
              <span className="section-label mb-6 inline-flex">Let's talk</span>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tighter mb-5 mt-4"
                style={{ letterSpacing: "-0.04em" }}
              >
                Let&apos;s build something{" "}
                <span className="gradient-text">remarkable</span>
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto mb-10 text-lg leading-relaxed">
                Open to PM roles, AI collaborations, and conversations about products that scale.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="white" size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:sarthakgshirsat62@gmail.com">Email Directly</a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
