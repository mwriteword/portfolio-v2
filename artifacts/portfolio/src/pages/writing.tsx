import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Linkedin, BookOpen, ArrowDown, Mail, Check, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { ModeToggle } from "../components/ModeToggle";
import { WorkSamples, emailSamples, longformSamples, otherSamples } from "../components/WorkSamples";
import { TableOfContents, useTocActiveSection, type TocItem } from "../components/TableOfContents";
import { aboutParagraphs, LINKEDIN_URL, MEDIUM_URL, RESUME_URL, AVATAR_SRC } from "../content/about";

const EMAIL = "vjtlaq@gmail.com";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const tocItems: TocItem[] = [
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const disciplines = [
  {
    icon: Mail,
    title: "Email & Lifecycle",
    blurb: "Proven expertise in email copywriting across internal and agency settings.",
  },
  {
    icon: FileText,
    title: "Researched Content",
    blurb:
      "Extensive experience writing well-researched, long-form content in regulated environments.",
  },
];

const stats = [
  { value: "9x", label: "Email CTR vs. benchmark" },
  { value: "1M+", label: "US homes" },
  { value: "18%", label: "Increase in content helpfulness ratings" },
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

// ── Header ────────────────────────────────────────────────────────────────────

function WritingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-[1120px] w-[90%] mx-auto flex h-12 items-center gap-3">
        <Link
          href="/writing"
          className="shrink-0 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          <span className="sm:hidden">V.L.</span>
          <span className="hidden sm:inline">Vernon Laquindanum</span>
        </Link>
        <span className="h-4 w-px shrink-0 bg-black/15" aria-hidden="true" />
        <ModeToggle theme="light" />
      </div>
    </header>
  );
}

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
          What are we working on?
        </label>
        <Textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Give me the details of what you're looking for."
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
        {submitting ? "Sending…" : "Send"}
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
      <div className="flex h-[310px] items-center justify-center sm:h-[220px] lg:h-[190px]">
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="text-center"
        >
          <blockquote className="text-base sm:text-lg font-medium leading-relaxed text-foreground">
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
  const [moreWorkOpen, setMoreWorkOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />
      <TableOfContents items={tocItems} activeId={activeSection} theme="light" />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        {/* 1 — Hero */}
        <section className="mb-14 sm:mb-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Email & Lifecycle Copywriting • Editorial & Content Writing
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[60px] lg:text-[72px] leading-[1.05]">
            I write words,
            <br />
            you get results.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            Hello! I'm Vern and I have 12 years of writing experience. I specialize in email
            copywriting, with deep experience in UX and regulated content. And occasionally, serious
            essays on deeply unserious things.
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
            <button
              type="button"
              onClick={() => scrollToId("work")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              See my work
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Woven-in client quotes — auto-advancing carousel */}
        <section className="mb-14 sm:mb-20">
          <QuoteCarousel />
        </section>

        {/* 2 — What I do / philosophy */}
        <section id="approach" className="mb-14 sm:mb-20 scroll-mt-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Need content that people will actually read?
          </h2>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="min-w-0 flex-1">
              <div className="space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
                <p>
                  I have only done one job that wears different outfits. Sometimes, that job is
                  wearing a mustache and a cowboy hat to write a punchy headline. Other times, it's
                  wearing a striped shirt and red beret with a baguette slung across its back to
                  drive clear microcopy. Regardless of what outfit it's wearing, it's always still
                  the same job underneath: getting the right message to the right audience at the
                  right time.
                </p>
                <p>
                  I've spent the last decade working across marketing, UX, editorial, and long-form
                  content, building up expertise and using words to guide users, motivate action,
                  and get the results my clients need.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-[28px] sm:text-[40px] font-bold tracking-tight leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-4 lg:w-80">
              {disciplines.map(({ icon: Icon, title, blurb }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — Work samples, grouped into three sections */}
        <section id="work" className="mb-14 sm:mb-20 scroll-mt-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Email samples
          </h2>
          <WorkSamples samples={emailSamples} />
        </section>

        {/* Long-form + Other collapse behind "See more work" (peek of the images) */}
        <div className="relative mb-14 sm:mb-20">
          <div className={moreWorkOpen ? "" : "max-h-[280px] overflow-hidden pointer-events-none"}>
            <section className="mb-14 sm:mb-20">
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
                Long-form writing samples
              </h2>
              <WorkSamples samples={longformSamples} />
            </section>

            <section>
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
                Other writing samples
              </h2>
              <WorkSamples samples={otherSamples} />
            </section>
          </div>

          {!moreWorkOpen && (
            <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center bg-gradient-to-b from-transparent to-background">
              <button
                type="button"
                onClick={() => setMoreWorkOpen(true)}
                className="mb-1 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                See more work
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* 5 — More about me (mirrored from the UX side via ../content/about) */}
        <section id="about" className="mb-14 sm:mb-20 scroll-mt-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            More about me
          </h2>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="min-w-0 flex-1 space-y-3">
              {aboutParagraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-foreground">
                  {p}
                </p>
              ))}
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

        {/* 6 — Contact */}
        <section id="contact" className="scroll-mt-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-2">
            Ready when you are
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Tell me a little about what you're working on, and I'll get back to you in a very timely manner.
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
