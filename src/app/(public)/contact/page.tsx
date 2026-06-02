import type { Metadata } from "next";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sarthak.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sarthakgshirsat62@gmail.com",
    href: "mailto:sarthakgshirsat62@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    href: null,
  },
];

const socialLinks = [
  {
    icon: GithubLogo,
    label: "GitHub",
    value: "@sarthakgshirsat62-afk",
    href: "https://github.com/sarthakgshirsat62-afk",
  },
  {
    icon: LinkedinLogo,
    label: "LinkedIn",
    value: "linkedin.com/in/sarth1964",
    href: "https://linkedin.com/in/sarth1964",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-24">
      <Container size="sm">
        {/* Header */}
        <div className="mb-14">
          <span className="section-label mb-6 inline-flex">Contact</span>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tighter mt-4 mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Let&apos;s build something{" "}
            <span className="gradient-text">together</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            Whether you have a project in mind, a question, or just want to say hi — reach out
            through any of the channels below.
          </p>
        </div>

        <div className="space-y-10">
          {/* Direct contact */}
          <div>
            <p className="data-label mb-5">Direct Contact</p>
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="framer-card flex items-center gap-4 p-4"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
                    style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.2)" }}
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="data-label mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="data-label mb-5">Social</p>
            <div className="space-y-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="framer-card flex items-center gap-4 p-4 group"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200"
                    style={{ background: "hsl(var(--card))", border: "1px solid var(--card-border)" }}
                  >
                    <item.icon weight="fill" className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="data-label mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRightIcon className="ml-auto h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Response note */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "hsl(var(--primary) / 0.05)",
              border: "1px solid hsl(var(--primary) / 0.15)",
            }}
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              ⚡ I typically respond within{" "}
              <strong className="text-foreground">24 hours</strong>. For urgent matters, reach
              out on LinkedIn.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}
