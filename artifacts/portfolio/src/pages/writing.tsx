import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
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
  { id: "problem", label: "The problem" },
  { id: "offerings", label: "How I help" },
  { id: "about", label: "About" },
  { id: "process", label: "How it works" },
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

const stats = [
  { value: "9x", label: "Email CTR" },
  { value: "+60%", label: "Digital engagement" },
  { value: "+18%", label: "Helpfulness ratings" },
];

const processSteps = [
  {
    title: "Intro call",
    body: "20–30 minutes to go over your product and the problems you're experiencing. I'll give an initial assessment of the content experience and tell you honestly if content is the problem.",
  },
  {
    title: "Proposal",
    body: "I send a proposal with fixed scope, timeline, and price within 48 hours, so you know exactly what to expect and when. If it doesn't work for you, we'll shape one that does.",
  },
  {
    title: "Work",
    body: "I work with your team and ship in your tools, showing progress at regular checkpoints. No black box, no big reveal.",
  },
  {
    title: "Handoff",
    body: "Documentation and rationale handed off in a live session with your team — plus, for systems work, an AI governance agent so the standards outlive the engagement.",
  },
];

// ── Quote carousel ────────────────────────────────────────────────────────────

function QuoteCarousel() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 4500);
    return () => clearInterval(t);
  }, [paused, n]);

  const go = (d: number) => setI((v) => (v + d + n) % n);
  const q = testimonials[i];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex h-[260px] items-center justify-center sm:h-[180px] lg:h-[150px]">
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="text-center"
        >
          <blockquote className="text-[14px] sm:text-[15px] font-medium leading-relaxed text-foreground">
            “{q.quote}”
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            — {q.name}, {q.role}
          </figcaption>
        </motion.figure>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous quote"
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
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
            Content Design & Systems for SaaS • UX Writing Consultant
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[60px] lg:text-[72px] leading-[1.05]">
            Words that scale
            <br />
            with your product
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            Your product is growing fast, but the words aren't keeping up. Now it's costing you in
            support tickets and activations. I fix the words that are confusing your users—then I
            build systems so they stay fixed.
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

        {/* Woven-in client quotes — auto-advancing carousel */}
        <section className="mb-14 sm:mb-20">
          <QuoteCarousel />
        </section>

        {/* 2 — The problem */}
        <section id="problem" className="mb-14 sm:mb-20 scroll-mt-24 text-center">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Don't let bad content get in your users' way
          </h2>
          <div className="mx-auto max-w-3xl space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
            <p>
              When SaaS products grow quickly, it's easy for the words to get left behind when there
              isn't one person owning content across the product. Navigation menus aren't clear and
              the instructions are more confusing than helpful. Before you know it, support tickets
              are piling up and more users are dropping off week to week.
            </p>
            <p>
              I've seen this happen a lot, and it's cheap to solve when the product is starting up
              and expensive to fix after the product has already grown. Fortunately, I've done this
              both ways.
            </p>
          </div>
        </section>

        {/* 3 — How I fix your product's content (independent offerings → Services) */}
        <section id="offerings" className="mb-14 sm:mb-20 scroll-mt-24">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            How I fix your product's content
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                // Accent-tint the card on hover, mirroring the services page rail's
                // active state. The accent + its 8%-alpha tint ride in on CSS vars.
                style={
                  {
                    "--svc-accent": s.accent,
                    "--svc-accent-tint": `${s.accent}14`,
                  } as React.CSSProperties
                }
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-[var(--svc-accent)] hover:bg-[var(--svc-accent-tint)]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm font-medium tabular-nums text-muted-foreground/50 transition-colors group-hover:text-[var(--svc-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--svc-accent)]" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.eyebrow}
                </p>
                <h3 className="mt-1 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              </Link>
            ))}

            {/* Catch-all → full Services page (also keeps the grid balanced at 6 cells) */}
            <Link
              href="/services"
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col justify-center rounded-xl border border-dashed border-border p-6 transition-colors hover:bg-muted"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Not sure where to start?
              </p>
              <h3 className="mt-1 flex items-center gap-1.5 font-semibold">
                View all services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                See every offering in detail, with scope and pricing.
              </p>
            </Link>
          </div>
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

              <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-[28px] sm:text-[40px] font-bold tracking-tight leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
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
