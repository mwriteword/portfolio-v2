import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ImageIcon, X } from "lucide-react";

export interface WorkSample {
  id: string;
  title: string;
  /** Short kicker, e.g. "LIFECYCLE EMAIL • UTILITIES". */
  category: string;
  /** One-line preview shown on the collapsed tile. */
  preview: string;
  /** Longer "here's the work" copy shown in the expanded panel. */
  description: string;
  /** Optional thumbnail/large image path (falls back to a gradient placeholder). */
  image?: string;
  /** Optional link to the live piece. */
  href?: string;
}

// Placeholder gradients until real thumbnails are added (drop an `image` on any item).
const gradients = [
  "from-blue-500/25 to-indigo-500/10",
  "from-emerald-500/25 to-teal-500/10",
  "from-amber-500/25 to-orange-500/10",
  "from-fuchsia-500/25 to-purple-500/10",
  "from-rose-500/25 to-pink-500/10",
  "from-cyan-500/25 to-sky-500/10",
];

// `description` (expanded panel) is a placeholder until the full write-ups + images land.
const samples: WorkSample[] = [
  {
    id: "solitaire",
    title: "“The Solitaire You Remember Is Not a Good Game”",
    category: "EDITORIAL CONTENT • UX",
    preview: "Written and self-edited for UX Collective's Bootcamp publication.",
    description: "Written and self-edited for UX Collective's Bootcamp publication.",
  },
  {
    id: "energy-tips",
    title: "Source-verified Energy Efficiency Tips",
    category: "EDITORIAL/GOVERNANCE • REGULATED ENERGY",
    preview: "300+ tips, with all claims sourced to DOE standards.",
    description: "300+ tips, with all claims sourced to DOE standards.",
  },
  {
    id: "rate-coach",
    title: "Rate Coach Email Program",
    category: "LIFECYCLE EMAIL • UTILITIES",
    preview: "3x opens and 9x CTR vs industry benchmarks for 800K households.",
    description: "3x opens and 9x CTR vs industry benchmarks for 800K households.",
  },
  {
    id: "textbook",
    title: "Textbook descriptions for a new product",
    category: "SEO CONTENT • EDTECH",
    preview: "30+ textbook descriptions to drive organic traffic.",
    description: "30+ textbook descriptions to drive organic traffic.",
  },
  {
    id: "onboarding-video",
    title: "Onboarding Hero Video for Bundle Launch",
    category: "VIDEO SCRIPT • B2B SaaS",
    preview: "Scripted video supporting the launch of a new Atlassian bundle.",
    description: "Scripted video supporting the launch of a new Atlassian bundle.",
  },
  {
    id: "directbuy",
    title: "DirectBuy Landing Page",
    category: "LANDING PAGE • AGENCY CLIENT",
    preview: "Conversion copy driving sign-ups for an external client.",
    description: "Conversion copy driving sign-ups for an external client.",
  },
];

function Thumb({ sample, index, className }: { sample: WorkSample; index: number; className?: string }) {
  if (sample.image) {
    return (
      <img
        src={sample.image}
        alt={sample.title}
        className={`h-full w-full object-cover ${className ?? ""}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]} ${className ?? ""}`}
    >
      <ImageIcon className="h-6 w-6 text-foreground/25" />
    </div>
  );
}

/**
 * Reads the grid's *actual* column count from its computed `grid-template-columns`,
 * kept in sync via ResizeObserver. More robust than matching Tailwind breakpoints
 * by hand — the CSS is always the source of truth.
 */
function useGridColumns(ref: React.RefObject<HTMLElement | null>) {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const tpl = getComputedStyle(el).gridTemplateColumns;
      setCols(Math.max(1, tpl.split(" ").filter(Boolean).length));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return cols;
}

export function WorkSamples() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cols = useGridColumns(gridRef);

  const openIndex = openId ? samples.findIndex((s) => s.id === openId) : -1;
  // Insert the expanded panel after the last tile in the open tile's row so it
  // spans the full width and pushes subsequent rows down (Google Images style).
  const insertAfter =
    openIndex >= 0 ? Math.min(Math.floor(openIndex / cols) * cols + cols - 1, samples.length - 1) : -1;

  const open = openIndex >= 0 ? samples[openIndex] : null;

  // Bring the panel into view when it opens.
  useEffect(() => {
    if (openId && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    }
  }, [openId, insertAfter, reduceMotion]);

  return (
    <motion.div ref={gridRef} layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {samples.map((s, i) => {
        const isActive = s.id === openId;
        return (
          <Fragment key={s.id}>
            <motion.button
              layout
              type="button"
              onClick={() => setOpenId(isActive ? null : s.id)}
              aria-expanded={isActive}
              className={`group flex flex-col overflow-hidden rounded-xl border bg-card text-left transition-colors hover:bg-muted ${
                isActive ? "border-foreground/40 ring-1 ring-foreground/20" : "border-border"
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <Thumb sample={s} index={i} />
              </div>
              <div className="flex items-start justify-between gap-2 p-4">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {s.category}
                  </span>
                  <h3 className="mt-1 font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.preview}</p>
                </div>
                <ArrowUpRight
                  className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:text-foreground ${
                    isActive ? "rotate-90" : ""
                  }`}
                />
              </div>
            </motion.button>

            {i === insertAfter && (
              <AnimatePresence mode="wait">
                {open && (
                  <motion.div
                    layout
                    ref={panelRef}
                    key={open.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                    className="col-span-full overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg">
                        <Thumb sample={open} index={openIndex} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {open.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => setOpenId(null)}
                            aria-label="Close"
                            className="-m-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <h3 className="mt-2 text-xl font-semibold">{open.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {open.description}
                        </p>
                        {open.href && (
                          <a
                            href={open.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                          >
                            View the piece
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </Fragment>
        );
      })}
    </motion.div>
  );
}
