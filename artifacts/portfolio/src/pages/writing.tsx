import { useState } from "react";
import { Link } from "wouter";
import { PenLine, FileText, Linkedin, ArrowDown, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { ModeToggle } from "../components/ModeToggle";
import { WorkSamples } from "../components/WorkSamples";
import { TableOfContents, useTocActiveSection, type TocItem } from "../components/TableOfContents";
import { aboutParagraphs, LINKEDIN_URL, RESUME_URL, AVATAR_SRC } from "../content/about";

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

// Content Writing shown first (stacked above Copywriting) per design.
const disciplines = [
  {
    icon: FileText,
    title: "Content Writing",
    blurb:
      "Long-form content experience including SEO and well-researched, editorial-grade content.",
  },
  {
    icon: PenLine,
    title: "Copywriting",
    blurb:
      "Proven marketing experience in an agency setting, writing for clients such as The Home Depot, Chase, and HP.",
  },
];

const stats = [
  { value: "9x", label: "Email CTR vs. benchmark" },
  { value: "12%", label: "Lift in customer sentiment" },
  { value: "18%", label: "Increase in content helpfulness ratings" },
];

const testimonials = [
  {
    quote:
      "Vern is exactly the kind of content designer that every switched-on tech leader needs in their team. He can flex in every direction without losing a beat in delivering high quality or velocity.",
    name: "Libby V.",
    role: "Head of Content Design",
  },
];

// ── Header ────────────────────────────────────────────────────────────────────

function WritingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-[1120px] w-[90%] mx-auto flex h-12 items-center gap-4">
        <Link
          href="/writing"
          className="shrink-0 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          <span className="sm:hidden">Vern</span>
          <span className="hidden sm:inline">Vernon Laquindanum</span>
        </Link>
        <div className="ml-auto">
          <ModeToggle theme="light" />
        </div>
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
            Copywriting • Content Writing
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[60px] lg:text-[72px] leading-[1.05]">
            I write words,
            <br />
            you get results.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            Hello! I'm Vern, and I have 12 years of experience writing SaaS UX, marketing copy, and
            regulated content. And occasionally, serious essays about deeply unserious things.
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

        {/* Woven-in client quote (casual callout; more to be added over time) */}
        <section className="mb-14 sm:mb-20">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground">
              “{testimonials[0].quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              — {testimonials[0].name}, {testimonials[0].role}
            </figcaption>
          </figure>
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

        {/* 3 — Work samples */}
        <section id="work" className="mb-14 sm:mb-20 scroll-mt-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Stuff I've written
          </h2>
          <WorkSamples />
        </section>

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
