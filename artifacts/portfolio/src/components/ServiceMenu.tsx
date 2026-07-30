import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { Check, ArrowUpRight } from "lucide-react";
import type { Service, CaseStudy } from "../content/services";
import { useTocActiveSection, type TocItem } from "./TableOfContents";

// ── Detail helpers ────────────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{children}</p>
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
    <Link
      href={caseStudy.href}
      onClick={() => window.scrollTo(0, 0)}
      className="group/cs inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
    >
      Case study
      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/cs:text-foreground" />
    </Link>
  );
}

/** One fully-rendered service. All blocks stack top-to-bottom — nothing hidden. */
function ServiceBlock({ service }: { service: Service }) {
  const d = service.detail;
  return (
    <div
      id={service.slug}
      className="scroll-mt-24 border-t border-border pt-8 pb-10 first:border-t-0 first:pt-0"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{service.eyebrow}</p>
        {d.caseStudy && <CaseStudyTag caseStudy={d.caseStudy} />}
      </div>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">{service.title}</h3>
      <p className="mt-2 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        {service.summary}
      </p>

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
        <ul className="mt-2 grid gap-x-8 gap-y-2 text-[15px] leading-relaxed text-muted-foreground sm:grid-cols-2">
          {d.youGet.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
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
}: {
  services: Service[];
  onBookCall: () => void;
}) {
  const tocItems: TocItem[] = services.map((s) => ({ id: s.slug, label: s.title }));
  const activeId = useTocActiveSection(tocItems);

  const jumpTo = (slug: string) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Deep links from the home page (/services#slug) scroll to that service on mount.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !services.some((s) => s.slug === hash)) return;
    let tries = 0;
    const jump = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ block: "start" });
      else if (tries++ < 60) requestAnimationFrame(jump);
    };
    const t = setTimeout(jump, 60);
    return () => clearTimeout(t);
  }, [services]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-14">
      {/* Rail — sticky scroll-spy (desktop only) */}
      <nav className="hidden self-start flex-col gap-1 lg:sticky lg:top-24 lg:flex">
        {services.map((s, i) => {
          const active = activeId === s.slug;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => jumpTo(s.slug)}
              aria-current={active ? "true" : undefined}
              className={`flex items-baseline gap-3 rounded-r-lg border-l-2 px-3 py-2.5 text-left transition-colors ${
                active ? "border-primary bg-muted" : "border-border hover:bg-muted/50"
              }`}
            >
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  active ? "text-primary" : "text-muted-foreground/60"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-sm leading-snug ${
                  active ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}

        <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
          <p className="text-sm leading-relaxed text-foreground">Not sure which one fits?</p>
          <button
            type="button"
            onClick={onBookCall}
            className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Book an intro call
          </button>
        </div>
      </nav>

      {/* All services, stacked */}
      <div>
        {services.map((s) => (
          <ServiceBlock key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
}
