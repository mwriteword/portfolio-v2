import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ImageIcon, X } from "lucide-react";
import { openLightbox } from "./Lightbox";

export interface WorkSample {
  id: string;
  title: string;
  /** Short kicker, e.g. "LIFECYCLE EMAIL • UTILITIES". */
  category: string;
  /** One-line preview shown on the collapsed tile. */
  preview: string;
  /** Rich "here's the work" content shown only in the expanded panel. */
  body: ReactNode;
  /** Thumbnail path shown on the tile + as the panel's media (gradient fallback). */
  image?: string;
  /** Optional full-size image opened in the lightbox when the panel media is clicked. */
  full?: string;
  /** Anchor the tile/panel crop to the top of the image (e.g. tall email screenshots). */
  imageTop?: boolean;
  /** Optional video for the expanded panel; `image` is used as its poster frame. */
  video?: string;
}

// Shared link style for the expanded-panel bodies.
function BodyLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

// Body "link" that opens an image in the lightbox instead of navigating.
function ZoomLink({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => openLightbox(src, alt)}
      className="font-medium text-primary hover:underline"
    >
      {children}
    </button>
  );
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

// ── Email samples ─────────────────────────────────────────────────────────────
export const emailSamples: WorkSample[] = [
  {
    id: "rate-coach",
    title: "Rate Coach email program",
    category: "LIFECYCLE EMAIL • UTILITIES",
    preview: "3x opens and 9x CTR vs industry benchmarks for 800K households.",
    image: "/images/work/rate-coach-thumb.png",
    full: "/images/opower/intro-email.png",
    body: (
      <>
        <p>
          In my full-time stint at Opower, we developed a brand new behavior change product to
          support many utilities changing to time-of-use rate models, where energy is more
          expensive at specific times of day. This email series was meant to guide users through
          this transition by explaining how time-of-use rates work and encouraging them to shift
          their energy use outside of peak-pricing hours.
        </p>
        <p>
          In terms of stakes, customers spend about 8 minutes per <em>year</em> thinking about their
          utility company and that's what we were up against. When we launched the program, we saw
          the following results:
        </p>
        <ul>
          <li>14 MW peak demand reduction across nearly 1 million homes in a mid-west utility.</li>
          <li>35,000 customers in the initial pilot with Exelon Maryland (BGE, Pepco, and Delmarva).</li>
          <li>+60% digital engagement at one utility.</li>
          <li>3x the opens and 9x the clickthrough rates for one utility with over 800,000 households.</li>
          <li>Customers were 17% more likely to recall the program against control.</li>
          <li>Customers were 16% more likely to identify peak-pricing hours against control.</li>
          <li>+8% customer satisfaction versus control, +5% overall.</li>
        </ul>
        <p>
          <BodyLink href="/portfolio/case-study/bls-emails">
            Read the full email content and case study →
          </BodyLink>
        </p>
      </>
    ),
  },
  {
    id: "twc-email",
    title: "Teamwork Collection Onboarding email",
    category: "ENGAGEMENT EMAIL • B2B SAAS",
    preview: "Email driving app activations to support a bundle launch.",
    image: "/images/work/twc-email-body.png",
    full: "/images/work/twc-full-email.png",
    imageTop: true,
    body: (
      <>
        <p>
          One of my bigger projects at Atlassian was the full onboarding experience for the Teamwork
          Collection launch, a new bundle of Atlassian's most popular apps. Our goal with the email
          wasn't to upsell users on the bundle — these were sent to users whose leadership already{" "}
          <em>bought</em> the bundle. Our goal with the onboarding was to actually get users to
          activate their seat in the app and drive growth through monthly-active users across each app.
        </p>
        <p>
          I focused the content to read as straightforwardly as possible, almost like a notification
          email rather than a growth lever. The subject line and body content are intentionally short
          and direct; if this email got dismissed as marketing spam, we'd be dead in the water. Rather
          than load up the email with content, I wanted to give them the information straight to get
          them to click and learn more in the rest of the onboarding.
        </p>
        <p>
          <BodyLink href="/portfolio/case-study/twc">
            See the full onboarding experience and case study here.
          </BodyLink>
        </p>
      </>
    ),
  },
  {
    id: "fintech-email",
    title: "Performance marketing emails for a fintech site",
    category: "MARKETING EMAIL • AGENCY",
    preview: "Email samples driving users to a landing page for lead generation.",
    image: "/images/quinstreet/email-3.jpeg",
    full: "/images/quinstreet/email-3.jpeg",
    imageTop: true,
    body: (
      <p>
        At QuinStreet, I wrote email content for both our internal lead-gen sites and external
        clients, including The Home Depot, Chase, and HP. This is one of many email samples I wrote
        in the fintech space, largely to drive users to a landing page.{" "}
        <BodyLink href="/portfolio/case-study/copywriting-samples">
          See more copywriting samples here.
        </BodyLink>
      </p>
    ),
  },
];

// ── Long-form writing samples ─────────────────────────────────────────────────
export const longformSamples: WorkSample[] = [
  {
    id: "solitaire",
    title: "An analytical essay on Solitaire",
    category: "EDITORIAL CONTENT • UX",
    preview: "Written and self-edited for UX Collective's Bootcamp publication.",
    image: "/images/work/solitaire.jpg",
    body: (
      <>
        <p>
          In the mid-to-late 2010s, I drove 30 minutes in traffic to a train station that's
          normally 10 minutes away, then rode a train for an hour just to get to my office. And at
          the end of the day, I did the same thing in reverse. I played a lot of{" "}
          <em>Microsoft Solitaire Collection</em> on my phone during those long train rides, so I
          (finally) wrote about my observations of two games in that collection, and the piece was
          published in UX Collective's Bootcamp publication.
        </p>
        <p>
          <BodyLink href="https://medium.com/design-bootcamp/the-solitaire-you-remember-is-not-a-good-game-00cf1392e639?sharedUserId=vjtlaq">
            Read the piece on Medium →
          </BodyLink>
        </p>
      </>
    ),
  },
  {
    id: "energy-tips",
    title: "Source-verified energy efficiency tips",
    category: "RESEARCH & CONTENT • REGULATED ENERGY",
    preview: "300+ tips with all claims sourced to DOE standards.",
    image: "/images/work/tip-library-thumb.png",
    full: "/images/work/tip-sample-full.png",
    body: (
      <>
        <p>
          In 2024, a former colleague at Opower asked if I could help review and refresh tip
          content used by more than 175 utility partners worldwide. This refresh is done every few
          years to ensure that tips are still accurate and adequately sourced, since government
          energy guidance and standards can change year-to-year. I verified sources for every
          claim, updating them to match new guidance or rewriting claims entirely if they no longer
          had a live source. If your utility has energy-saving tips on their website and they look
          like the one in the thumbnail, then you can see my handiwork for yourself. Here's a sample
          of one, in the event your utility is not an Opower partner.
        </p>
        <p>
          <ZoomLink src="/images/work/tip-sample-full.png" alt="Full-page energy efficiency tip sample">
            View the full-page sample →
          </ZoomLink>
        </p>
      </>
    ),
  },
  {
    id: "textbook",
    title: "Textbook description pages",
    category: "SEO CONTENT • EDTECH",
    preview: "30+ textbook descriptions to drive organic traffic.",
    image: "/images/work/textbook-thumb.png",
    body: (
      <p>
        I joined Course Hero as a contractor in late 2019 to help launch their new{" "}
        <BodyLink href="https://www.coursehero.com/textbook-solutions/#/math">
          Textbook Solutions
        </BodyLink>{" "}
        product. They needed search-engine optimized descriptions for several of the textbooks they
        were launching with, all to drive organic traffic to the product pages.
      </p>
    ),
  },
];

// ── Other writing samples ─────────────────────────────────────────────────────
export const otherSamples: WorkSample[] = [
  {
    id: "onboarding-video",
    title: "Teamwork Collection video",
    category: "VIDEO SCRIPT • B2B SaaS",
    preview: "Scripted video supporting the launch of a new Atlassian bundle.",
    image: "/images/work/twc-video-thumb.jpg",
    video: "/videos/twc-onboarding-video.mp4",
    body: (
      <p>
        This was just one piece of a full onboarding experience for the new Teamwork Collection
        bundle at Atlassian. I was the Content Designer on this project, but I worked with the brand
        and creative team on this hero video. I wrote the original script to align with the rest of
        the onboarding experience (while making it flexible enough to work in other contexts).{" "}
        <BodyLink href="/portfolio/case-study/twc">
          You can read the full case study here
        </BodyLink>
        .
      </p>
    ),
  },
  {
    id: "directbuy",
    title: "DirectBuy landing page",
    category: "LANDING PAGE • AGENCY CLIENT",
    preview: "Lead-gen copy for an external client.",
    image: "/images/work/lp-thumb.png",
    full: "/images/work/landing-page.png",
    body: (
      <p>
        QuinStreet had an agency model, where we created email, landing pages, banners, and social
        media ads for our internal sites as well as external clients to drive lead-gen and
        conversion. This is one example of marketing-focused writing I did for one of our clients.{" "}
        <BodyLink href="/portfolio/case-study/copywriting-samples">
          You can see more copywriting samples here.
        </BodyLink>
      </p>
    ),
  },
];

function Thumb({ sample, index, className }: { sample: WorkSample; index: number; className?: string }) {
  const [errored, setErrored] = useState(false);
  if (sample.image && !errored) {
    return (
      <img
        src={sample.image}
        alt={sample.title}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover ${sample.imageTop ? "object-top" : ""} ${className ?? ""}`}
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

export function WorkSamples({ samples }: { samples: WorkSample[] }) {
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
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
                        {open.video ? (
                          <video
                            src={open.video}
                            poster={open.image}
                            controls
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />
                        ) : open.image ? (
                          <button
                            type="button"
                            onClick={() => openLightbox(open.full ?? open.image!, open.title)}
                            aria-label={`Expand image: ${open.title}`}
                            className="group block h-full w-full cursor-zoom-in"
                          >
                            <img
                              src={open.image}
                              alt={open.title}
                              onError={(e) => {
                                (e.currentTarget.style.display = "none");
                              }}
                              className={`h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${open.imageTop ? "object-top" : ""}`}
                            />
                          </button>
                        ) : (
                          <Thumb sample={open} index={openIndex} />
                        )}
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
                        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline [&_em]:italic [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                          {open.body}
                        </div>
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
