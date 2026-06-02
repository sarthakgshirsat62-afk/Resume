import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Container } from "./container";

const footerLinks = [
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/sarthakgshirsat62-afk", icon: GithubLogo, label: "GitHub" },
  { href: "https://www.linkedin.com/in/sarth1964", icon: LinkedinLogo, label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-14 flex flex-col md:flex-row gap-10 md:justify-between">
          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2.5 font-bold text-base">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black text-white"
                style={{ background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)" }}
              >
                S
              </span>
              <span>Sarthak<span className="text-muted-foreground font-normal">.</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Product Manager building AI-powered solutions and cloud-native platforms.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                >
                  <Icon weight="fill" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Navigation</p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:sarthakgshirsat62@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  sarthakgshirsat62@gmail.com
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sarthak Shirsat. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built with Next.js & Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
