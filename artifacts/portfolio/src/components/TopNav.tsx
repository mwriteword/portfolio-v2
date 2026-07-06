import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowLeft } from "lucide-react";
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

// Home in-page sections surfaced in the main menu (Work is represented by the
// expandable "Case studies" item instead of a scroll link).
const homeSections: TocItem[] = [
  { id: "section-skills", label: "Skills" },
  { id: "section-tools", label: "Tools" },
  { id: "section-experience", label: "Experience" },
  { id: "section-about", label: "About" },
];

interface TopNavProps {
  /** In-page sections for the current page (case-study chapters live here). */
  sections?: TocItem[];
  activeSection?: string;
}

const divider = <span className="h-4 w-px shrink-0 bg-white/15" aria-hidden="true" />;

const itemBase =
  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors";
const itemIdle = "text-[#bbbbbb] hover:bg-[#333333] hover:text-white";
const itemActive = "bg-[#383838] text-white";

export function TopNav({ sections, activeSection }: TopNavProps) {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"main" | "chapters">("main");
  const [dir, setDir] = useState(1); // 1 = descend (→ chapters), -1 = back (→ main)
  const [csExpanded, setCsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isCaseStudyPage = caseStudies.some((cs) => cs.href === location);
  const chapters = sections ?? [];

  const closeMenu = () => setOpen(false);

  const toggleMenu = () => {
    if (!open) {
      // Opening: case-study pages default to their chapter list.
      setView(isCaseStudyPage ? "chapters" : "main");
      setCsExpanded(false);
      setDir(1);
    }
    setOpen((o) => !o);
  };

  // Close on click-away + Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll to a home section, navigating home first if we're elsewhere.
  const goToSection = (id: string) => {
    closeMenu();
    if (location === "/") {
      scrollToId(id);
      return;
    }
    setLocation("/");
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 60) requestAnimationFrame(tryScroll);
    };
    requestAnimationFrame(tryScroll);
  };

  const goHome = () => {
    closeMenu();
    if (location === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else setLocation("/");
  };

  const onCaseStudyClick = (href: string) => {
    if (href === location) {
      // Already here — reveal this study's chapters instead of navigating.
      setDir(1);
      setView("chapters");
    } else {
      setLocation(href); // navigates; the destination page mounts a fresh nav
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: `${d * 100}%`, opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: `${d * -100}%`, opacity: 0, position: "absolute" as const, top: 0, left: 0, right: 0 }),
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-[#2e2e2e]/80 backdrop-blur">
        <div className="max-w-[1120px] w-[90%] mx-auto flex h-12 items-center gap-3">
          <Link
            href="/"
            onClick={() => window.scrollTo(0, 0)}
            className="shrink-0 text-sm font-semibold text-white transition-colors hover:text-[#22c55e]"
          >
            <span className="sm:hidden">V.L.</span>
            <span className="hidden sm:inline">Vernon Laquindanum</span>
          </Link>

          {divider}

          <ModeToggle theme="dark" />

          {/* Hamburger — always farthest right, at the content edge. */}
          <div className="relative ml-auto" ref={menuRef}>
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={open}
              aria-haspopup="menu"
              aria-label="Menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#cccccc] transition-colors hover:bg-white/10 hover:text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#242424] shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <AnimatePresence initial={false} custom={dir}>
                      <motion.div
                        key={view}
                        custom={dir}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="w-full p-1.5"
                      >
                        {view === "main" ? (
                          <>
                            <button type="button" onClick={goHome} className={`${itemBase} ${itemIdle}`}>
                              Home
                            </button>

                            <button
                              type="button"
                              onClick={() => setCsExpanded((v) => !v)}
                              aria-expanded={csExpanded}
                              className={`${itemBase} ${itemIdle} justify-between`}
                            >
                              Case studies
                              <ChevronDown
                                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                                  csExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {csExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-3 border-l border-[#3a3a3a] pl-1.5">
                                    {caseStudies.map((cs) => (
                                      <button
                                        key={cs.href}
                                        type="button"
                                        onClick={() => onCaseStudyClick(cs.href)}
                                        className={`${itemBase} ${
                                          cs.href === location ? itemActive : itemIdle
                                        } text-[13px]`}
                                      >
                                        {cs.label}
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {homeSections.map((s) => (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => goToSection(s.id)}
                                className={`${itemBase} ${
                                  location === "/" && activeSection === s.id ? itemActive : itemIdle
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setDir(-1);
                                setView("main");
                              }}
                              className={`${itemBase} ${itemIdle} font-medium text-white`}
                            >
                              <ArrowLeft className="h-4 w-4 shrink-0" />
                              Back
                            </button>
                            <div className="my-1 h-px bg-[#3a3a3a]" />
                            {chapters.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  scrollToId(item.id);
                                  closeMenu();
                                }}
                                className={`${itemBase} ${
                                  activeSection === item.id ? itemActive : itemIdle
                                }`}
                              >
                                <span
                                  className={`block h-px w-3 shrink-0 transition-colors ${
                                    activeSection === item.id ? "bg-white" : "bg-[#555555]"
                                  }`}
                                />
                                {item.label}
                              </button>
                            ))}
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      {/* Spacer to offset the fixed header height (h-12). */}
      <div className="h-12" aria-hidden="true" />
    </>
  );
}
