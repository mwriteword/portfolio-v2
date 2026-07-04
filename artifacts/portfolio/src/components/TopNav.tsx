import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu } from "lucide-react";
import type { TocItem } from "./TableOfContents";
import { ModeToggle } from "./ModeToggle";

interface NavItem {
  href: string;
  label: string;
}

const caseStudies: NavItem[] = [
  { href: "/case-study-1", label: "Goal Types & OKR Modeling" },
  { href: "/case-study-onboarding", label: "Teamwork Collection Onboarding" },
  { href: "/case-study-agentic", label: "Risk Agent Workflow" },
  { href: "/case-study-2", label: "Behavioral Load-Shaping Emails" },
  { href: "/case-study-coursehero", label: "Textbook Solutions" },
  { href: "/case-study-quinstreet", label: "Copywriting Samples" },
];

interface TopNavProps {
  /** In-page sections. When provided, a section menu appears on the right below xl. */
  sections?: TocItem[];
  activeSection?: string;
}

const divider = <span className="h-4 w-px shrink-0 bg-white/15" aria-hidden="true" />;

export function TopNav({ sections, activeSection }: TopNavProps) {
  const [csOpen, setCsOpen] = useState(false);
  const [secOpen, setSecOpen] = useState(false);
  const [location] = useLocation();
  const csRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);

  // Close menus on click-away.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (csRef.current && !csRef.current.contains(t)) setCsOpen(false);
      if (secRef.current && !secRef.current.contains(t)) setSecOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Close on route change.
  useEffect(() => {
    setCsOpen(false);
    setSecOpen(false);
  }, [location]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasSections = !!sections && sections.length > 0;
  const activeLabel =
    sections?.find((s) => s.id === activeSection)?.label ?? sections?.[0]?.label ?? "";

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-[#2e2e2e]/80 backdrop-blur">
      <div className="max-w-[1120px] w-[90%] mx-auto flex h-12 items-center gap-4">
        {/* Left: brand + case studies */}
        <Link
          href="/"
          onClick={() => window.scrollTo(0, 0)}
          className="shrink-0 text-sm font-semibold text-white transition-colors hover:text-[#22c55e]"
        >
          <span className="sm:hidden">Vern</span>
          <span className="hidden sm:inline">Vernon Laquindanum</span>
        </Link>

        {divider}

        <div className="relative shrink-0" ref={csRef}>
          <button
            type="button"
            onClick={() => setCsOpen((o) => !o)}
            aria-expanded={csOpen}
            aria-haspopup="menu"
            className="flex items-center gap-1.5 text-sm font-medium text-[#cccccc] transition-colors hover:text-white"
          >
            Case studies
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${csOpen ? "rotate-180" : ""}`}
            />
          </button>

          {csOpen && (
            <div
              role="menu"
              className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#242424] p-1.5 shadow-xl"
            >
              {caseStudies.map((cs) => {
                const isActive = location === cs.href;
                return (
                  <Link
                    key={cs.href}
                    href={cs.href}
                    role="menuitem"
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[#383838] text-white"
                        : "text-[#999999] hover:bg-[#333333] hover:text-white"
                    }`}
                  >
                    {cs.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: in-page section menu (below xl; the side rail handles xl+) */}
        {hasSections && (
          <div className="flex min-w-0 flex-1 items-center justify-end gap-3 xl:hidden">
            {divider}
            <div className="relative flex min-w-0 items-center" ref={secRef}>
              <button
                type="button"
                onClick={() => setSecOpen((o) => !o)}
                aria-expanded={secOpen}
                aria-haspopup="menu"
                aria-label="Section navigation"
                className="flex min-w-0 items-center gap-2 text-sm font-medium text-[#cccccc] transition-colors hover:text-white"
              >
                <Menu className="h-4 w-4 shrink-0" />
                <span className="truncate">{activeLabel}</span>
              </button>

              {secOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#242424] p-1.5 shadow-xl"
                >
                  {sections!.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          scrollTo(item.id);
                          setSecOpen(false);
                        }}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-[#383838] text-white"
                            : "text-[#999999] hover:bg-[#333333] hover:text-white"
                        }`}
                      >
                        <span
                          className={`block h-px w-3 shrink-0 transition-colors ${
                            isActive ? "bg-white" : "bg-[#555555]"
                          }`}
                        />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="ml-auto pl-2">
          <ModeToggle theme="dark" />
        </div>
      </div>
    </header>
    {/* Spacer to offset the fixed header height (h-12). */}
    <div className="h-12" aria-hidden="true" />
    </>
  );
}
