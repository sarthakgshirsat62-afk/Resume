"use client";

import { GithubLogo, LinkedinLogo, List, X } from "@phosphor-icons/react";
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
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-transform group-hover:scale-110">
              S
            </span>
            <span className="hidden sm:block">
              Sarthak<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
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
              <Button variant="ghost" size="icon">
                <GithubLogo weight="fill" className="h-4 w-4" />
              </Button>
            </a>

            <a
              href="https://www.linkedin.com/in/sarth1964"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex"
              aria-label="LinkedIn"
            >
              <Button variant="ghost" size="icon">
                <LinkedinLogo weight="fill" className="h-4 w-4" />
              </Button>
            </a>

            <Button variant="glow" size="sm" className="hidden md:flex" asChild>
              <Link href="/resume">View Resume</Link>
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <Container>
            <nav className="flex flex-col py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-2 flex gap-2">
                <a href="https://github.com/sarthakgshirsat62-afk" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <GithubLogo weight="fill" className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/sarth1964"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm">
                    <LinkedinLogo weight="fill" className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
