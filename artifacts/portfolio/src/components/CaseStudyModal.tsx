import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { CaseStudy } from "../content/services";

// The short case study behind each service's "Case study" tag. Structurally it
// mirrors the intro block on the full portfolio case studies (a meta rail beside
// a four-beat narrative), retuned for the light Writing theme and the service's
// own accent hue. Where a full craft case study exists, the footer links out.

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}

function Beat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

/**
 * "Case study" affordance for a service. Renders the top-right tag; clicking it
 * opens the modal. `accent` and `eyebrow` come from the parent service so the
 * modal reads as part of the same offering.
 */
export function CaseStudyModal({
  caseStudy,
  accent,
  eyebrow,
}: {
  caseStudy: CaseStudy;
  accent: string;
  eyebrow: string;
}) {
  const [open, setOpen] = useState(false);
  const study = caseStudy.study;
  if (!study) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group/cs inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          Case study
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/cs:text-foreground" />
        </button>
      </DialogTrigger>

      {/* Flex column so only the body scrolls: the pinned header keeps the title
          and the (absolutely-positioned) close button visible at any scroll depth. */}
      <DialogContent className="flex max-h-[90vh] w-[92vw] max-w-3xl flex-col gap-0 overflow-hidden p-0 sm:w-full">
        {/* Header — pinned. `pr-12` reserves room for the close button. */}
        <DialogHeader className="shrink-0 space-y-2 border-b border-border px-6 pb-4 pr-12 pt-6 text-left sm:px-8 sm:pb-5 sm:pr-14 sm:pt-8">
          <p
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
          <DialogTitle className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
            {study.title}
          </DialogTitle>
        </DialogHeader>

        {/* Body — the only scroll region: meta rail + narrative */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-6 py-6 sm:flex-row sm:gap-12 sm:px-8">
            {/* Meta rail */}
            <div className="flex shrink-0 flex-row flex-wrap gap-x-8 gap-y-4 sm:w-44 sm:flex-col sm:gap-4">
              <MetaItem label="Company" value={study.company} />
              <MetaItem label="Role" value={study.role} />
              <MetaItem label="Timeline" value={study.timeline} />
              <MetaItem label="Scope" value={study.scope} />
            </div>

            {/* Narrative */}
            <div className="flex-1 space-y-5">
              <Beat label="Situation">{study.situation}</Beat>
              <Beat label="Problem">{study.problem}</Beat>
              <Beat label="What I did">{study.whatIDid}</Beat>
              <Beat label="Result">{study.result}</Beat>
            </div>
          </div>
        </div>

        {/* Footer — pinned; links to the full craft case study when one exists. */}
        {caseStudy.href && (
          <div className="shrink-0 border-t border-border px-6 py-4 sm:px-8">
            <Link
              href={caseStudy.href}
              onClick={() => {
                setOpen(false);
                window.scrollTo(0, 0);
              }}
              className="group/full inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: accent }}
            >
              Read the full craft case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/full:translate-x-0.5 group-hover/full:-translate-y-0.5" />
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
