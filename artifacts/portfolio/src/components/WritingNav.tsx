import { Link, useLocation } from "wouter";
import { Mail } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Persistent top nav for the Writing (light) side of the site. Replaces the
 * UX side's hamburger with always-visible links + a "Get in touch" CTA, shared
 * across the Writing landing page and its sub-pages (Services, About).
 *
 * Layout: a single row on sm+ (identity · mode toggle … links · CTA). On mobile
 * it splits into two rows — identity + mode toggle up top, the page nav below —
 * so the links stay fully visible instead of a hamburger.
 */
export function WritingNav() {
  const [location, setLocation] = useLocation();

  // "Get in touch" lives in the contact section on the Writing landing page.
  // From a sub-page, navigate home first, then scroll once the section mounts.
  const goToContact = () => {
    if (location === "/") {
      scrollToId("contact");
      return;
    }
    setLocation("/");
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 60) requestAnimationFrame(tryScroll);
    };
    requestAnimationFrame(tryScroll);
  };

  const links = navLinks.map((link) => {
    const active = location === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => window.scrollTo(0, 0)}
        className={`${linkBase} ${active ? linkActive : linkIdle}`}
      >
        {link.label}
      </Link>
    );
  });

  const cta = (
    <button
      type="button"
      onClick={goToContact}
      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
    >
      <Mail className="h-4 w-4 shrink-0" />
      Get in touch
    </button>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-[1120px] w-[90%] mx-auto">
        {/* Row 1 — identity + mode toggle (+ page nav on sm and up) */}
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

          <nav className="ml-auto hidden items-center gap-1 sm:flex">
            {links}
            <span className="ml-1">{cta}</span>
          </nav>
        </div>

        {/* Row 2 — page nav on mobile only */}
        <nav className="flex items-center justify-between gap-1 border-t border-border py-2 sm:hidden">
          <div className="flex items-center gap-1">{links}</div>
          {cta}
        </nav>
      </div>
    </header>
  );
}
