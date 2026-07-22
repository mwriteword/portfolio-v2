import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { WritingNav } from "../components/WritingNav";
import { services } from "../content/services";

// ── Content ─────────────────────────────────────────────────────────────────

interface Engagement {
  title: string;
  blurb: string;
  bestFor: string;
}

const engagements: Engagement[] = [
  {
    title: "Project-based",
    blurb: "A defined scope with clear deliverables and a fixed timeline.",
    bestFor: "Audits, systems builds, or a specific launch.",
  },
  {
    title: "Fractional / Retainer",
    blurb: "Ongoing content partnership at a set number of hours each month.",
    bestFor: "Teams needing steady senior support without a full-time hire.",
  },
  {
    title: "Advisory & Workshops",
    blurb: "Focused sessions to upskill your team, pressure-test a system, or align on strategy.",
    bestFor: "One-off guidance and team enablement.",
  },
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function Services() {
  const [, setLocation] = useLocation();

  // Deep links from the home page arrive as /writing/services#<slug>. wouter does
  // client-side navigation and there's no server render, so scroll to the anchored
  // section ourselves. Use an instant jump (smooth gets interrupted by the browser's
  // scroll restoration on a hard load) and repeat once shortly after to beat any
  // layout shift / restoration reset.
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    let cancelled = false;
    const jump = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const raf = requestAnimationFrame(jump);
    const t = setTimeout(jump, 120);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  // Route to the Writing landing page and scroll to its contact section.
  const goToContact = () => {
    setLocation("/writing");
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 60) requestAnimationFrame(tryScroll);
    };
    requestAnimationFrame(tryScroll);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Services
          </p>
          <h1 className="mt-4 font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05]">
            Content that scales with your product.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            From a one-off audit to an ongoing partnership, here's how I help product teams ship
            clearer, more consistent content — and build the systems to keep it that way.
          </p>
        </section>

        {/* Core offerings — anchored detail sections (pricing/detail to come) */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Core offerings
          </h2>

          <div className="border-t border-border">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.slug}
                  id={s.slug}
                  className="flex gap-4 sm:gap-6 border-b border-border py-8 scroll-mt-24"
                >
                  <span className="pt-1 font-mono text-sm tabular-nums text-muted-foreground/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {s.eyebrow}
                    </p>
                    <div className="mt-1 flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-primary" />
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                    </div>
                    <p className="mt-2 max-w-2xl text-[15px] sm:text-base leading-relaxed text-muted-foreground">
                      {s.summary}
                    </p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
                      Detailed scope &amp; pricing — coming soon
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ways to work together */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Ways to work together
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {engagements.map(({ title, blurb, bestFor }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                  Best for
                </p>
                <p className="mt-1 text-sm text-foreground">{bestFor}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight">
                Not sure which fits?
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Tell me what you're working on and I'll point you in the right direction.
              </p>
            </div>
            <button
              type="button"
              onClick={goToContact}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1120px] w-[90%] mx-auto py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vernon Laquindanum
        </div>
      </footer>
    </main>
  );
}
