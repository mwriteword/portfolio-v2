import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { CalendarPlus, Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const CALENDLY_URL = "https://calendly.com/vjtlaq/30min";

interface WritingNavLink {
  href: string;
  label: string;
}

const navLinks: WritingNavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

const linkBase = "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors";
const linkIdle = "text-muted-foreground hover:bg-muted hover:text-foreground";
const linkActive = "bg-muted text-foreground";

/**
 * Persistent top nav for the Writing (light) side of the site. Shared across the
 * Writing landing page and its sub-pages (Services, About).
 *
 * Layout: a single row on sm+ (identity · mode toggle … links · CTA). On mobile
 * the links collapse behind a hamburger that drops down below the header.
 */
export function WritingNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => setOpen(false);

  // Close the mobile menu on route change, Escape, or outside click.
  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const renderLinks = (onNavigate?: () => void) =>
    navLinks.map((link) => {
      const active = location === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => {
            window.scrollTo(0, 0);
            onNavigate?.();
          }}
          className={`${linkBase} ${active ? linkActive : linkIdle}`}
        >
          {link.label}
        </Link>
      );
    });

  const cta = (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={closeMenu}
      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
    >
      <CalendarPlus className="h-4 w-4 shrink-0" />
      Book a call
    </a>
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur"
    >
      <div className="max-w-[1120px] w-[90%] mx-auto">
        <div className="flex h-12 items-center gap-3">
          <Link
            href="/"
            onClick={() => window.scrollTo(0, 0)}
            className="shrink-0 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <span className="sm:hidden">V.L.</span>
            <span className="hidden sm:inline">Vernon Laquindanum</span>
          </Link>

          <span className="h-4 w-px shrink-0 bg-black/15" aria-hidden="true" />

          <ModeToggle theme="light" />

          {/* Desktop — inline links + CTA */}
          <nav className="ml-auto hidden items-center gap-1 sm:flex">
            {renderLinks()}
            <span className="ml-1">{cta}</span>
          </nav>

          {/* Mobile — hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="writing-mobile-menu"
            aria-label="Menu"
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted sm:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu — drops down below the header */}
        {open && (
          <nav
            id="writing-mobile-menu"
            className="flex flex-col gap-1 border-t border-border py-3 sm:hidden"
          >
            {renderLinks(closeMenu)}
            <div className="pt-1">{cta}</div>
          </nav>
        )}
      </div>
    </header>
  );
}
