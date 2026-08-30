"use client";

import { GithubLogo, List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/utils/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight group">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black text-white transition-all duration-200 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)" }}
            >
              S
            </span>
            <span className="hidden sm:block tracking-tight">
              Sarthak<span className="text-muted-foreground font-normal">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className={cn(
              "hidden md:flex items-center gap-0.5 rounded-2xl p-1 transition-all duration-300",
              isScrolled ? "bg-transparent" : "bg-foreground/[0.04] dark:bg-white/[0.04]",
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-foreground/8 dark:bg-white/[0.08] text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 dark:hover:bg-white/[0.05]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://github.com/sarthakgshirsat62-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex"
              aria-label="GitHub"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                <GithubLogo weight="fill" className="h-4 w-4" />
              </Button>
            </a>
            <Button variant="white" size="sm" className="hidden md:flex rounded-xl" asChild>
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-xl"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-2xl">
          <Container>
            <nav className="flex flex-col py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-foreground bg-foreground/[0.06] dark:bg-white/[0.06]"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04]",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                <Button variant="white" size="sm" className="w-full rounded-xl" asChild>
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
