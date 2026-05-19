import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Coffee, GraduationCap, Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/container";
import { Separator } from "@/components/ui/separator";

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
    org: "College of Engineering Pune (COEP)",
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
      "The best products are built with deep empathy for users. I gather real insights through demos and feedback sessions to build what people actually need, not what we imagine they want.",
  },
  {
    title: "Data drives decisions",
    description:
      "From $50M+ client savings to 25% cloud cost reductions, every major decision I make is grounded in data and measurable outcomes, not intuition alone.",
  },
  {
    title: "Bridge business and tech",
    description:
      "My background spans software engineering and product management. I thrive at the intersection — translating complex technical realities into clear product strategy.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <Container size="md">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <Badge variant="outline">About Me</Badge>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Building products that drive{" "}
                <span className="gradient-text">real-world impact</span>.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m Sarthak Shirsat — a Product Manager based in{" "}
                <span className="inline-flex items-center gap-1 text-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> Bengaluru, India
                </span>
                . I specialize in AI-powered solutions, cloud-native platforms, and enterprise SaaS
                products.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With 7+ years spanning software engineering and product management, I&apos;ve led
                end-to-end product lifecycles at Optum (UHG), driven $50M+ in client savings,
                and improved efficiency across 8M+ annual cases. My MBA from IIM Indore adds
                a strong foundation in business strategy and user-centric design.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Outside of work, I co-founded a retail startup at IIM Indore, built an AI chatbot,
                and am always exploring what&apos;s next in GenAI and cloud technology.
              </p>
            </div>

            {/* Profile photo placeholder */}
            <div className="flex-shrink-0">
              <div className="h-40 w-40 sm:h-48 sm:w-48 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">What I believe in</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="space-y-2">
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Career Timeline</h2>
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted border border-border text-lg">
                    {item.icon}
                  </div>
                  {i < timeline.length - 1 && <div className="mt-2 flex-1 w-px bg-border" />}
                </div>
                <div className="pb-6 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-primary">{item.year}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-xs text-muted-foreground">@ {item.org}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Interests */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Outside of work</h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <div
                key={interest.label}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                <span>{interest.emoji}</span>
                <span className="text-muted-foreground">{interest.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Button variant="glow" asChild>
            <Link href="/contact">
              Get in touch <ArrowRight className="ml-1 h-4 w-4" />
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
