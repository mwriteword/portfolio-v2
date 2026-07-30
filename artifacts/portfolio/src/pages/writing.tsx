import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  BookOpen,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WritingNav } from "../components/WritingNav";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { TableOfContents, useTocActiveSection, type TocItem } from "../components/TableOfContents";
import { services } from "../content/services";
import { AVATAR_SRC, LINKEDIN_URL, MEDIUM_URL, RESUME_URL } from "../content/about";

const EMAIL = "vjtlaq@gmail.com";

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
    body: "20–30 minutes with no pitch. You tell me where your users are getting stuck, and I'll tell you honestly whether content is the problem.",
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

// ── Contact form ──────────────────────────────────────────────────────────────

// Web3Forms access key (frontend-safe). Set VITE_WEB3FORMS_ACCESS_KEY in .env /
// Vercel to enable real server-side delivery to vjtlaq@gmail.com. Without it, the
// form falls back to opening the visitor's mail client.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Project inquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No key configured yet → keep working via the visitor's mail client.
    if (!WEB3FORMS_KEY) {
      mailtoFallback();
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New inquiry from ${form.name || "your writing site"}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "", // honeypot; real submissions leave this empty
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-5 w-5" />
        </div>
        <p className="font-medium text-foreground">Thanks — your message is on its way.</p>
        <p className="mt-1 text-sm text-muted-foreground">I'll get back to you soon.</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
      {/* Honeypot: hidden from users, catches bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Describe your problem or project
        </label>
        <Textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me where your users are getting stuck."
        />
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm text-destructive">
          Something went wrong sending that. Please try again, or email me directly at{" "}
          <a href={`mailto:${EMAIL}`} className="font-medium underline">
            {EMAIL}
          </a>
          .
        </p>
      )}
      <Button type="submit" size="lg" disabled={submitting} className="mt-5 w-full sm:w-auto">
        {submitting ? "Sending…" : "Book an intro call"}
      </Button>
    </form>
  );
}

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
          <blockquote className="text-[15px] sm:text-base font-medium leading-relaxed text-foreground">
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
            Your product grew,
            <br />
            but the words didn't.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            The people in your product don't know how to use it. I fix all the words that are
            confusing your users—then I build systems to make sure it stays fixed.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              <Mail className="h-4 w-4" />
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
              When SaaS companies grow quickly, smart features get built but the words don't get the
              same thought. Before you know it, the same feature has three different names,
              navigation menus don't go where users expect, and instructions are so overloaded with
              text that users don't know what they're supposed to do. Then support requests pile up,
              adoption numbers start going down, and users stop using your product altogether.
            </p>
            <p>
              I've seen this happen a lot, and it's cheap to fix as you scale up but expensive to
              solve after the product has already grown. Fortunately, I've done this in both
              directions.
            </p>
          </div>
        </section>

        {/* 3 — How I fix your product's content (independent offerings → Services) */}
        <section id="offerings" className="mb-14 sm:mb-20 scroll-mt-24">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            How I fix your product's content
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services#${s.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-5 w-5 text-primary" />
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-1 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                </Link>
              );
            })}

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
          <h2 className="mb-6 max-w-3xl text-[20px] sm:text-[24px] font-semibold tracking-tight">
            I've led content for products used by millions.
          </h2>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="min-w-0 flex-1">
              <div className="space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
                <p>
                  I've been the sole writer at some point across every single team I've been on.
                  I've built the exact solutions I've outlined above repeatedly — building systems
                  and standards from zero and extending them across features and products. My work
                  has driven real impact, with one email program driving clarity and behavior change
                  at a utility with over 1 million households.
                </p>
                <p>
                  I've solved the content problems you're experiencing at companies like Atlassian
                  and Oracle, and I'm ready (and excited) to solve yours next.
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
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3"
                >
                  <FileText className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="text-sm text-foreground underline-offset-2 group-hover:underline">
                    Resume
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
            Let's figure out where your content is breaking
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Send me a note about what you need fixed and I'll get back to you within a day.
          </p>
          <ContactForm />
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
