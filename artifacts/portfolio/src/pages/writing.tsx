import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  BookOpen,
} from "lucide-react";
import { WritingNav } from "../components/WritingNav";
import { ContactPanel } from "../components/ContactPanel";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { SiteFooter } from "../components/SiteFooter";
import { TableOfContents, useTocActiveSection, type TocItem } from "../components/TableOfContents";
import { services } from "../content/services";
import { AVATAR_SRC, LINKEDIN_URL, MEDIUM_URL } from "../content/about";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const tocItems: TocItem[] = [
  { id: "problem", label: "Problems" },
  { id: "offerings", label: "Solutions" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

const testimonials = [
  {
    quote:
      "Vern is exactly the kind of content designer that every switched-on tech leader needs in their team. He can flex in every direction without losing a beat in delivering high quality or velocity.",
    name: "Libby V.",
    role: "Head of Content Design",
  },
  {
    quote:
      "Vern is the kind of collaborator who becomes the steel thread across projects — generous with his time, genuine in his partnerships, and an absolute pleasure to work alongside. Any team that gets to work with Vern will feel the difference from day one.",
    name: "Anthony C.",
    role: "Design Leader",
  },
  {
    quote:
      "Vernon is super approachable and easy to jam with. He's a genuinely people-focused person who makes work enjoyable, and he's also comfortable jumping into the design tools, which made collaboration feel so much more seamless. He's such a vital teammate, thoughtful and generous with his thinking, and an absolute expert at what he does.",
    name: "Tim H.",
    role: "Product Designer",
  },
  {
    quote:
      "Vern brought an exceptional level of craft and care to his work, keeping the customer at the centre of everything he did and thoughtfully shaping every piece of messaging to ensure it's clear, purposeful, and high quality. He's also very good at taking the lead on strategic initiatives, collaborating with an insane amount of stakeholders — he really is a team on his own.",
    name: "Ge G.",
    role: "Product Designer",
  },
];

const processSteps = [
  {
    title: "Intro call",
    body: "20–30 minutes to go over your product and the problems you're experiencing. I'll give an initial assessment of the content experience and tell you honestly if content is the problem.",
  },
  {
    title: "Proposal",
    body: "I send a proposal with the fixed scope, timeline, and price within 48 hours so you'll know exactly what to expect from me and when. If the proposal doesn't work for you, we'll work on one that does.",
  },
  {
    title: "Work",
    body: "I'll work with your teams and ship in your tools, and show progress at regular checkpoints so you have full visibility into what I'm working on.",
  },
  {
    title: "Handoff",
    body: "Documentation and rationale for the work handed off in a live session with your team. And for any systems work, an AI governance agent so the standards outlive the engagement.",
  },
];

// ── Quote carousel ────────────────────────────────────────────────────────────

// Static testimonial card with manual controls only — no auto-advance. One quote
// shows at a time inside a card; prev/next and dots step between them.
function QuoteCarousel() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const n = testimonials.length;

  const go = (d: number) => setI((v) => (v + d + n) % n);
  const q = testimonials[i];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex min-h-[220px] items-center sm:min-h-[180px]">
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
          className="w-full rounded-2xl border border-border bg-card p-8 sm:p-10"
        >
          <blockquote className="text-[16px] sm:text-[18px] font-medium leading-relaxed text-foreground">
            “{q.quote}”
          </blockquote>
          <figcaption className="mt-5 text-sm text-muted-foreground">
            — {q.name}, {q.role}
          </figcaption>
        </motion.figure>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous quote"
          className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Go to quote ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-4 bg-foreground" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next quote"
          className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ── Offerings preview ──────────────────────────────────────────────────────────

// A preview of the Services page's rail layout: a left rail of offerings and a
// right panel that shows just the eyebrow, title, and summary for the offering
// you're hovering (first is shown by default). "More about this service" deep-
// links to the full Services page, landing at the top with that offering
// highlighted (see ServiceMenu's ?service= handling).
function OfferingsPreview() {
  const reduceMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const active = services.find((s) => s.slug === activeSlug) ?? services[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
      {/* Left rail — hover (or tap) to preview an offering */}
      <div>
        <nav className="flex flex-col gap-1">
          {services.map((s, i) => {
            const isActive = s.slug === activeSlug;
            return (
              <button
                key={s.slug}
                type="button"
                onMouseEnter={() => setActiveSlug(s.slug)}
                onFocus={() => setActiveSlug(s.slug)}
                onClick={() => setActiveSlug(s.slug)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-baseline gap-3 rounded-r-lg border-l-[3px] px-4 py-3 text-left transition-colors ${
                  isActive ? "" : "border-transparent hover:bg-muted/60"
                }`}
                style={
                  isActive
                    ? { borderLeftColor: s.accent, backgroundColor: `${s.accent}14` }
                    : undefined
                }
              >
                <span
                  className={`font-mono text-xs tabular-nums ${
                    isActive ? "" : "text-muted-foreground/50"
                  }`}
                  style={isActive ? { color: s.accent } : undefined}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[17px] leading-snug transition-colors ${
                    isActive
                      ? "font-semibold"
                      : "font-medium text-muted-foreground group-hover:text-foreground"
                  }`}
                  style={isActive ? { color: s.accent } : undefined}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </nav>

        <Link
          href="/services"
          onClick={() => window.scrollTo(0, 0)}
          className="mt-5 ml-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          View all services
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Right panel — eyebrow / title / summary preview + deep link */}
      <motion.div
        key={active.slug}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
        className="lg:pt-2"
      >
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: active.accent }}
        >
          {active.eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{active.title}</h3>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
          {active.summary}
        </p>
        <Link
          href={`/services?service=${active.slug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          style={{ color: active.accent }}
        >
          More about this service
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Writing() {
  const activeSection = useTocActiveSection(tocItems);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />
      <TableOfContents items={tocItems} activeId={activeSection} theme="light" />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        {/* 1 — Hero */}
        <section className="mb-14 sm:mb-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Content Design & Systems for SaaS
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[60px] lg:text-[72px] leading-[1.05]">
            Words that scale
            <br />
            with your product
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[16px] sm:text-[20px] text-muted-foreground">
            Your product is growing, but the content isn't keeping up. I fix the words that are
            confusing your users—then I build systems so they stay fixed.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Get in touch
            </button>
            <Link
              href="/services"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View my services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 2 — The problem */}
        <section id="problem" className="mb-14 sm:mb-20 scroll-mt-24 text-center">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Don't let bad content get in your users' way
          </h2>
          <div className="mx-auto max-w-3xl space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
            <p>
              When SaaS products grow quickly, it's easy for the words to get left behind when there
              isn't one person owning content across the product. Users can't figure out how to
              actually use your product when a feature has three different names and the instructions
              are more confusing than helpful. Users are sending in support requests or just stop
              using your product entirely.
            </p>
            <p>
              I've seen this happen a lot, so I built specific services based on my experiences to
              help solve your content problems.
            </p>
          </div>
        </section>

        {/* 3 — How I fix your product's content (independent offerings → Services) */}
        <section id="offerings" className="mb-14 sm:mb-20 scroll-mt-24">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            How I fix your product's content
          </h2>
          <OfferingsPreview />
        </section>

        {/* Client quotes — static card carousel, manual controls only */}
        <section className="mb-14 sm:mb-20">
          <QuoteCarousel />
        </section>

        {/* 4 — Impact + who I am (→ About page) */}
        <section id="about" className="mb-14 sm:mb-20 scroll-mt-24">
          <h2 className="mb-6 text-[20px] sm:text-[24px] font-semibold tracking-tight">
            I'm a UX content expert with experience in complex, regulated&nbsp;industries
          </h2>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="min-w-0 flex-1">
              <div className="space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
                <p>
                  I've been a professional writer for over 12 years, with the large majority of that
                  focused on UX writing. I worked on energy efficiency products in the utility
                  industry, navigating complex industry jargon and strict compliance requirements.
                  I've worked on large-scale B2B SaaS products, building these content systems and
                  standards from 0 and extending them across 4 separate apps. My work has driven real
                  impact, with one email program driving clarity and behavior change at a utility
                  with over 1 million households.
                </p>
                <p>
                  I've solved the content problems you're experiencing at companies like Atlassian
                  and Oracle. I'm ready (and excited) to solve yours next.
                </p>
              </div>

              <Link
                href="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                More about me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-6 lg:w-64 lg:items-center">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-muted sm:h-28 sm:w-28">
                <img
                  src={AVATAR_SRC}
                  alt="Vernon Laquindanum"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <CopyEmailButton variant="footer" theme="light" />
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3"
                >
                  <Linkedin className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="text-sm text-foreground underline-offset-2 group-hover:underline">
                    linkedin.com/in/vjtlaq
                  </span>
                </a>
                <a
                  href={MEDIUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3"
                >
                  <BookOpen className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="text-sm text-foreground underline-offset-2 group-hover:underline">
                    medium.com/@vjtlaq
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5 — How it works (sequential → stepped timeline) */}
        <section id="process" className="mb-14 sm:mb-20 scroll-mt-24">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            How it works
          </h2>
          <ol className="relative grid gap-8 sm:grid-cols-4">
            {/* Connecting line behind the numbered nodes (desktop only) */}
            <div
              className="absolute inset-x-0 top-5 hidden h-px bg-border sm:block"
              aria-hidden="true"
            />
            {processSteps.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6 — Closing CTA + contact */}
        <section id="contact" className="scroll-mt-24">
          <h2 className="mb-2 max-w-2xl text-[20px] sm:text-[24px] font-semibold tracking-tight">
            Let's find out where your content is breaking
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Tell me about the problems you're experiencing and I'll give an initial assessment of the
            content experience. No fees or commitment required.
          </p>
          <ContactPanel />
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
