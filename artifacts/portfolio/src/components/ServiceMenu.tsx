import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Service } from "../content/services";
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
    <div id={service.slug} className="pb-2">

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
      {/* Timeline · Pricing — two equal columns split down the middle (divider
          centered on the card), so each value is bounded to its half and long
          ones wrap to a second line instead of pushing the divider around. */}
      <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-border bg-muted/40 px-5 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch sm:gap-x-8 sm:gap-y-0">
        <div>
          <Label>Timeline</Label>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground">{d.timeline}</p>
        </div>
        <div className="hidden w-px self-stretch bg-border sm:block" aria-hidden="true" />
        <div>
          <Label>Pricing</Label>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground">{d.pricing}</p>
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

/** Resolve the service to open on load from the URL — `?service=slug` first,
 *  falling back to a legacy `#slug`, then the first service. */
function initialSlug(services: Service[]): string {
  if (typeof window === "undefined") return services[0].slug;
  const q = new URLSearchParams(window.location.search).get("service");
  const hash = window.location.hash.replace("#", "");
  const has = (v: string | null): v is string => !!v && services.some((s) => s.slug === v);
  if (has(q)) return q;
  if (has(hash)) return hash;
  return services[0].slug;
}

/**
 * Master–detail: a rail selects one offering and the panel shows only that
 * offering's full detail, swapping on selection so the rail and body always
 * match. Home-page "More about this service" links (/services?service=slug)
 * open on that offering and land the page on this section.
 */
export function ServiceMenu({
  services,
  onBookCall,
  heading = "Core services",
}: {
  services: Service[];
  onBookCall: () => void;
  /** Rendered inside the sticky left column so it pins with the rail. */
  heading?: string;
}) {
  const [selectedSlug, setSelectedSlug] = useState(() => initialSlug(services));
  const selected = services.find((s) => s.slug === selectedSlug) ?? services[0];

  const rootRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const isDesktop = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  // Arriving via a deep link: bring this section (with the picked offering
  // already selected) into view, just under the sticky nav.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    const hash = window.location.hash.replace("#", "");
    const deep = [q, hash].some((v) => v && services.some((s) => s.slug === v));
    if (!deep) return;
    const el = rootRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
  }, [services]);

  const select = (slug: string) => {
    setSelectedSlug(slug);
    // On mobile the detail sits below the rail, so pull the freshly-picked
    // offering into view. On desktop it's already beside the rail.
    if (!isDesktop()) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  return (
    <div ref={rootRef} className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
      {/* Left column — heading + selector rail, sticky as a unit (desktop only) */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="mb-6 text-[20px] font-semibold tracking-tight sm:text-[24px]">{heading}</h2>

        <nav className="flex flex-col gap-1">
          {services.map((s, i) => {
            const active = selectedSlug === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => select(s.slug)}
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

      {/* Detail column — only the selected offering; swaps (with a fade) on select. */}
      <div ref={detailRef} className="min-w-0 scroll-mt-24">
        <div key={selected.slug} className="animate-in fade-in duration-200">
          <ServiceBlock service={selected} />
        </div>
      </div>
    </div>
  );
}
