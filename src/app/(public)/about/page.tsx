import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Sarthak Shirsat — Product Manager with 7+ years in AI, cloud, and enterprise SaaS.",
};

const timeline = [
  {
    year: "2025",
    title: "Senior Tech Product Manager",
    org: "Optum, UHG",
    description: "Leading enterprise cloud policy & governance across AWS, Azure and GCP. Built FinOps cost model cutting wasted cloud spend by ~25%.",
    icon: "☁️",
  },
  {
    year: "2023",
    title: "Product Manager",
    org: "Optum, UHG",
    description: "Led AI-powered Prior Authorization chatbot reducing search time by 30+ min/case. Improved efficiency across 8M+ annual cases.",
    icon: "🤖",
  },
  {
    year: "2022",
    title: "Product Analyst",
    org: "Optum, UHG",
    description: "Enabled $50M+ client savings via predictive analytics. Managed 300+ HEDIS quality measures and piloted GenAI workflow optimizations.",
    icon: "📊",
  },
  {
    year: "2022",
    title: "MBA",
    org: "IIM Indore",
    description: "MBA from Indian Institute of Management Indore. Also co-founded FyreFl-i (retail startup) and Planet-I App during this period.",
    icon: "🎓",
  },
  {
    year: "2021",
    title: "Product Management Intern",
    org: "Manomay Consultancy Services",
    description: "Market research across 20+ Caribbean insurers; recommended invoice automation solutions shortening cash conversion cycle by 30%.",
    icon: "🌏",
  },
  {
    year: "2019",
    title: "Software Engineer",
    org: "Druva Data Solutions",
    description: "Developed AWS-based SaaS apps. Built centralized dashboard improving visibility for 10K+ users, reducing reporting effort by 30%.",
    icon: "💻",
  },
  {
    year: "2017",
    title: "Associate Software Engineer",
    org: "Veritas Technologies LLC",
    description: "Delivered license authentication features, migrated components to Golang, and implemented telemetry recovering $400K+ in perpetual licenses.",
    icon: "🔐",
  },
  {
    year: "2017",
    title: "B.Tech in Information Technology",
    org: "COEP, Pune",
    description: "Graduated with B.Tech IT. Also completed Advance Diploma in AI Product Management from IIT Madras.",
    icon: "🏛️",
  },
];

const interests = [
  { emoji: "📚", label: "Technical Reading" },
  { emoji: "🤖", label: "AI & GenAI" },
  { emoji: "☁️", label: "Cloud Technology" },
  { emoji: "🎵", label: "Music" },
  { emoji: "🌍", label: "Traveling" },
  { emoji: "♟️", label: "Chess" },
];

const values = [
  {
    title: "User-centric design",
    description:
      "The best products are built with deep empathy for users. I gather real insights through demos and feedback sessions to build what people actually need.",
  },
  {
    title: "Data drives decisions",
    description:
      "From $50M+ client savings to 25% cloud cost reductions, every major decision I make is grounded in data and measurable outcomes.",
  },
  {
    title: "Bridge business and tech",
    description:
      "My background spans software engineering and product management. I thrive at the intersection — translating complex technical realities into clear strategy.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      <Container size="md">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-20">
          <span className="section-label mb-6 inline-flex">About Me</span>

          <div className="flex flex-col sm:flex-row gap-10 items-start mt-6">
            <div className="flex-1 space-y-5">
              <h1
                className="text-4xl sm:text-5xl font-black tracking-tighter leading-tight"
                style={{ letterSpacing: "-0.04em" }}
              >
                Building products that drive{" "}
                <span className="gradient-text">real-world impact</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m Sarthak Shirsat — a Product Manager based in{" "}
                <span className="inline-flex items-center gap-1 text-foreground font-medium">
                  <MapPin className="h-4 w-4 text-primary" /> Bengaluru, India
                </span>
                . I specialise in AI-powered solutions, cloud-native platforms, and enterprise SaaS.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With 7+ years spanning software engineering and product management, I&apos;ve led
                end-to-end product lifecycles at Optum (UHG), driven $50M+ in client savings, and
                improved efficiency across 8M+ annual cases. My MBA from IIM Indore adds a strong
                foundation in business strategy and user-centric design.
              </p>
            </div>

            {/* Avatar placeholder */}
            <div className="flex-shrink-0">
              <div
                className="h-44 w-44 rounded-3xl flex items-center justify-center text-6xl"
                style={{
                  background: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(192,132,252,0.1))",
                  border: "1px solid var(--card-border)",
                }}
              >
                👨‍💻
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div className="neon-line my-16" />

        {/* ── Values ──────────────────────────────────────────── */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold tracking-tight mb-8">What I believe in</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {values.map((value) => (
              <div key={value.title} className="framer-card p-6 space-y-2">
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="neon-line my-16" />

        {/* ── Timeline ─────────────────────────────────────────── */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold tracking-tight mb-10">Career Timeline</h2>

          <div className="relative">
            {/* Glowing vertical spine */}
            <div
              className="timeline-line absolute left-[19px] top-2 bottom-8"
            />

            <div className="space-y-5">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6">
                  {/* Icon node */}
                  <div className="relative flex-shrink-0 flex h-10 w-10 items-center justify-center">
                    <span
                      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-lg z-10"
                      style={{
                        background: "hsl(var(--card))",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      {item.icon}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="framer-card flex-1 p-5 mb-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                      <span className="data-label">{item.year}</span>
                      <span className="text-muted-foreground/40 text-xs">·</span>
                      <span className="text-sm font-semibold text-foreground">{item.title}</span>
                      <span className="text-xs text-primary font-mono">@ {item.org}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="neon-line my-16" />

        {/* ── Interests ─────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Outside of work</h2>
          <div className="flex flex-wrap gap-2.5">
            {interests.map((interest) => (
              <div
                key={interest.label}
                className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid var(--card-border)",
                }}
              >
                <span>{interest.emoji}</span>
                <span className="text-muted-foreground font-medium">{interest.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <Button variant="white" asChild>
            <Link href="/contact">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/resume">View my resume</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
