import { useEffect, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Service } from "../content/services";
import { useTocActiveSection, type TocItem } from "./TableOfContents";
import { CaseStudyModal } from "./CaseStudyModal";

// ── Detail helpers ────────────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{children}</p>
  );
}

/** Top-right case-study affordance. Opens the case-study modal when a `study`
 *  exists; falls back to a "Soon" pill for a case study still being written. */
function CaseStudyTag({ service }: { service: Service }) {
  const caseStudy = service.detail.caseStudy!;
  if (caseStudy.study) {
    return (
      <CaseStudyModal
        caseStudy={caseStudy}
        accent={service.accent}
        eyebrow={service.eyebrow}
      />
    );
  }
  return (
    <span
      title={`${caseStudy.label} — coming soon`}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
    >
      Case study
      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70">
        Soon
      </span>
    </span>
  );
}

/** One fully-rendered service. On mobile everything below the summary collapses
 *  behind a "Show more" toggle so the page stays skimmable; on desktop (lg) the
 *  full detail is always shown and the toggle is hidden. */
function ServiceBlock({ service }: { service: Service }) {
  const d = service.detail;
  const [expanded, setExpanded] = useState(false);
  const detailId = `${service.slug}-detail`;
  return (
    <div
      id={service.slug}
      className="scroll-mt-24 border-t border-border pt-8 pb-10 first:border-t-0 first:pt-0 lg:scroll-mt-6"
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: service.accent }}
        >
          {service.eyebrow}
        </p>
        {d.caseStudy && <CaseStudyTag service={service} />}
      </div>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">{service.title}</h3>
      <p className="mt-2 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        {service.summary}
      </p>

      {/* Show more / less — mobile only; desktop always shows the full detail. */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={detailId}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold lg:hidden"
        style={{ color: service.accent }}
      >
        {expanded ? "Show less" : "Show more"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Collapsible detail: hidden on mobile until expanded, always open on desktop. */}
      <div id={detailId} className={`${expanded ? "block" : "hidden"} lg:block`}>
      {/* Timeline · Pricing */}
      <div className="mt-5 flex flex-wrap gap-x-10 gap-y-4 rounded-xl border border-border bg-muted/40 px-5 py-4">
        <div>
          <Label>Timeline</Label>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{d.timeline}</p>
        </div>
        <div className="hidden self-stretch w-px bg-border sm:block" aria-hidden="true" />
        <div>
          <Label>Pricing</Label>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{d.pricing}</p>
        </div>
      </div>

      {/* Solves · Process */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
        <div>
          <Label>What this solves</Label>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{d.solves}</p>
        </div>
        <div>
          <Label>What the process is like</Label>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{d.process}</p>
        </div>
      </div>

      {/* What you get */}
      <div className="mt-6">
        <Label>What you get</Label>
        {/* CSS columns (not grid) so each item packs against the one above it —
            a grid couples row heights across columns, leaving odd gaps when a
            neighbouring item wraps to several lines. */}
        <ul className="mt-2 text-[15px] leading-relaxed text-muted-foreground sm:columns-2 sm:gap-x-8">
          {d.youGet.map((item) => (
            <li key={item} className="mb-2 flex gap-2.5 break-inside-avoid">
              <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: service.accent }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best for · Not for */}
      <div className="mt-6 grid gap-x-8 gap-y-4 border-t border-border pt-5 sm:grid-cols-2">
        <div>
          <Label>Best for</Label>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.forWho}</p>
        </div>
        <div>
          <Label>Not for</Label>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.notForWho}</p>
        </div>
      </div>

      {/* Bottom collapse — mobile only; scrolls back to the offering's top so you
          don't get stranded mid-page after the content above you disappears. */}
      <button
        type="button"
        onClick={() => {
          setExpanded(false);
          document.getElementById(service.slug)?.scrollIntoView({ block: "start" });
        }}
        aria-expanded={expanded}
        aria-controls={detailId}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold lg:hidden"
        style={{ color: service.accent }}
      >
        Show less
        <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
      </button>
      </div>
    </div>
  );
}

// ── Menu ────────────────────────────────────────────────────────────────────

/**
 * "Sticky rail, nothing hidden" — all services render top-to-bottom (crawlable,
 * skimmable, no interaction required). A sticky left rail scroll-spies the section
 * currently in view and jumps to it on click.
 */
export function ServiceMenu({
  services,
  onBookCall,
  heading = "Core offerings",
}: {
  services: Service[];
  onBookCall: () => void;
  /** Rendered inside the sticky left column so it pins with the rail. */
  heading?: string;
}) {
  const tocItems: TocItem[] = services.map((s) => ({ id: s.slug, label: s.title }));

  // The content column is its own scroll region on desktop, so scroll-spying
  // tracks that container rather than the page viewport.
  const [panelEl, setPanelEl] = useState<HTMLDivElement | null>(null);
  const activeId = useTocActiveSection(tocItems, true, panelEl);

  // Scroll a service into view. On desktop the content column is its own scroll
  // container, so scroll it directly (scrollIntoView doesn't reliably drive an
  // overflow ancestor); on mobile fall back to the page-level scroll.
  const scrollToSlug = (slug: string, behavior: ScrollBehavior) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const panel = panelEl;
    const scrollable = panel && panel.scrollHeight > panel.clientHeight + 1;
    if (scrollable) {
      const top =
        el.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop - 24;
      panel.scrollTo({ top: Math.max(0, top), behavior });
    } else {
      el.scrollIntoView({ behavior, block: "start" });
    }
  };

  const jumpTo = (slug: string) => scrollToSlug(slug, "smooth");

  // Deep links from the home page (/services#slug) scroll to that service on mount.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !services.some((s) => s.slug === hash)) return;
    let tries = 0;
    const jump = () => {
      const el = document.getElementById(hash);
      if (el) scrollToSlug(hash, "auto");
      else if (tries++ < 60) requestAnimationFrame(jump);
    };
    const t = setTimeout(jump, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, panelEl]);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
      {/* Left column — heading + scroll-spy rail, sticky as a unit (desktop only) */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="mb-6 text-[20px] font-semibold tracking-tight sm:text-[24px]">{heading}</h2>

        <nav className="hidden flex-col gap-1 lg:flex">
          {services.map((s, i) => {
            const active = activeId === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => jumpTo(s.slug)}
                aria-current={active ? "true" : undefined}
                className={`group flex items-baseline gap-3 rounded-r-lg border-l-[3px] px-4 py-3 text-left transition-colors ${
                  active ? "" : "border-transparent hover:bg-muted/60"
                }`}
                style={
                  active
                    ? { borderLeftColor: s.accent, backgroundColor: `${s.accent}14` }
                    : undefined
                }
              >
                <span
                  className={`font-mono text-xs tabular-nums ${
                    active ? "" : "text-muted-foreground/50"
                  }`}
                  style={active ? { color: s.accent } : undefined}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[17px] leading-snug transition-colors ${
                    active
                      ? "font-semibold"
                      : "font-medium text-muted-foreground group-hover:text-foreground"
                  }`}
                  style={active ? { color: s.accent } : undefined}
                >
                  {s.title}
                </span>
              </button>
            );
          })}

          <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm leading-relaxed text-foreground">Not sure what's right for you?</p>
            <button
              type="button"
              onClick={onBookCall}
              className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Book an intro call
            </button>
          </div>
        </nav>
      </div>

      {/* Content column — its own scroll region on desktop: scrolls when the
          cursor is inside, and `overscroll-contain` keeps the page still until
          you move out of it. On mobile it's normal page flow. */}
      <div
        ref={setPanelEl}
        className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-5"
      >
        {services.map((s) => (
          <ServiceBlock key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
}
