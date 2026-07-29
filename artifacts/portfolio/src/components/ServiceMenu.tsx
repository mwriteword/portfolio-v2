import { useState, useEffect, useRef, type ReactNode } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import type { Service, CaseStudy } from "../content/services";

// ── Detail-panel helpers ─────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{children}</p>
  );
}

function Narrative({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

/** Top-right case-study affordance. A live link once `href` is set; "Soon" until then. */
function CaseStudyTag({ caseStudy }: { caseStudy: CaseStudy }) {
  if (caseStudy.comingSoon || !caseStudy.href) {
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
  return (
    <a
      href={caseStudy.href}
      className="group/cs inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
    >
      Case study
      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/cs:text-foreground" />
    </a>
  );
}

/**
 * The 2/3 detail pane. Reworked to stand on its own (no sidebar): Timeline + Pricing
 * sit in a facts strip up top, the narrative stacks below, and "Best for / Not for"
 * form a two-up row before the case study + CTA.
 */
function ServiceDetail({ service, onBookCall }: { service: Service; onBookCall: () => void }) {
  const d = service.detail;

  return (
    <div
      key={service.slug}
      className="rounded-xl border border-border bg-card p-6 duration-200 animate-in fade-in sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {service.eyebrow}
        </p>
        {d.caseStudy && <CaseStudyTag caseStudy={d.caseStudy} />}
      </div>
      <h3 className="mt-1 text-xl font-semibold">{service.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{service.summary}</p>

      {/* Facts strip */}
      <div className="mt-6 grid gap-4 rounded-lg border border-border bg-muted/40 p-4 sm:grid-cols-2">
        <div>
          <Label>Timeline</Label>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{d.timeline}</p>
        </div>
        <div>
          <Label>Pricing</Label>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{d.pricing}</p>
        </div>
      </div>

      {/* Narrative */}
      <div className="mt-6 space-y-6">
        <Narrative label="What this solves">{d.solves}</Narrative>
        <Narrative label="What the process is like">{d.process}</Narrative>
        <div>
          <Label>What you get</Label>
          <ul className="mt-2 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
            {d.youGet.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fit */}
      <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <div>
          <Label>Best for</Label>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.forWho}</p>
        </div>
        <div>
          <Label>Not for</Label>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.notForWho}</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onBookCall}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Book a call
        </button>
      </div>
    </div>
  );
}

// ── Menu ─────────────────────────────────────────────────────────────────────

const slugFromHash = () =>
  typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";

/**
 * Skills/Tools-style master–detail menu. Left third is a list of service titles;
 * hovering (or focusing / tapping) a title selects it — expanding that line to
 * reveal its short description and swapping the right two-thirds to that service's
 * full detail. On mobile the two stack (list, then detail).
 */
export function ServiceMenu({ services, onBookCall }: { services: Service[]; onBookCall: () => void }) {
  const initial = services.find((s) => s.slug === slugFromHash())?.slug ?? services[0].slug;
  const [activeSlug, setActiveSlug] = useState(initial);
  const active = services.find((s) => s.slug === activeSlug) ?? services[0];
  const rootRef = useRef<HTMLDivElement>(null);

  // Deep links from the home page arrive as /services#<slug>: select that
  // service (handled above) and scroll the menu into view from its top, so the
  // detail reads from its title down rather than landing mid-panel.
  useEffect(() => {
    const hash = slugFromHash();
    if (!hash || !services.some((s) => s.slug === hash)) return;
    let tries = 0;
    const jump = () => {
      const el = rootRef.current;
      if (el) el.scrollIntoView({ block: "start" });
      else if (tries++ < 60) requestAnimationFrame(jump);
    };
    const t = setTimeout(jump, 60);
    return () => clearTimeout(t);
  }, [services]);

  return (
    <div ref={rootRef} className="grid scroll-mt-20 gap-6 lg:grid-cols-[1fr_3fr] lg:gap-8">
      {/* Left — service list */}
      <div className="flex flex-col gap-1 lg:sticky lg:top-24 lg:self-start">
        {services.map((s) => {
          const isActive = s.slug === activeSlug;
          return (
            <button
              key={s.slug}
              id={s.slug}
              type="button"
              onMouseEnter={() => setActiveSlug(s.slug)}
              onFocus={() => setActiveSlug(s.slug)}
              onClick={() => setActiveSlug(s.slug)}
              aria-pressed={isActive}
              className={`group scroll-mt-24 rounded-lg px-3 py-3 text-left transition-colors ${
                isActive ? "bg-muted" : "hover:bg-muted/60"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-4 w-0.5 shrink-0 rounded-full transition-colors ${
                    isActive ? "bg-primary" : "bg-transparent"
                  }`}
                />
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {s.title}
                </span>
              </div>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isActive ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pl-[14px] text-[13px] leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right — active service detail */}
      <div>
        <ServiceDetail service={active} onBookCall={onBookCall} />
      </div>
    </div>
  );
}
