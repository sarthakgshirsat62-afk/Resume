import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react/dist/ssr";
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
  { href: "https://twitter.com/sarthakshirsat", icon: TwitterLogo, label: "Twitter" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                S
              </span>
              <span>
                Sarthak<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Product Manager building AI-powered solutions and cloud-native platforms.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Icon weight="fill" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sarthak Shirsat. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS, and love.
          </p>
        </div>
      </Container>
    </footer>
  );
}
