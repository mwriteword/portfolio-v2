import { useState } from "react";
import { Link } from "wouter";
import { PenLine, FileText, Linkedin, Quote, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { ModeToggle } from "../components/ModeToggle";
import { WorkSamples } from "../components/WorkSamples";

const EMAIL = "vjtlaq@gmail.com";

const disciplines = [
  {
    icon: PenLine,
    title: "Copywriting",
    blurb:
      "Proven marketing experience in an agency setting, writing for clients such as The Home Depot, Chase, and HP.",
  },
  {
    icon: FileText,
    title: "Content Writing",
    blurb:
      "Long-form context experience including SEO/AEO/GEO, research-driven informational content, and government-sourcing.",
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
    role: "Head of Content Design, Atlassian",
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

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // First-pass: no backend yet — open the user's mail client.
    // TODO: replace with POST /contact once the api-server endpoint exists.
    const subject = encodeURIComponent(`Project inquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-5 w-5" />
        </div>
        <p className="font-medium text-foreground">Thanks — your email client should be open.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          If it didn't, reach me directly at {EMAIL}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
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
          What do you need?
        </label>
        <Textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project, timeline, and goals."
        />
      </div>
      <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">
        Send inquiry
      </Button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Writing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        {/* 1 — Hero */}
        <section className="mb-20 sm:mb-28 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Copywriting • Content Writing
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[60px] lg:text-[72px] leading-[1.05]">
            I write words that get the results you need.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            I'm a professional writer with 12 years of experience across B2B SaaS, energy
            efficiency, and source-verified, authoritative content.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CopyEmailButton theme="light" />
            <a
              href="https://linkedin.com/in/vjtlaq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </section>

        {/* 2 — What I do / philosophy */}
        <section className="mb-20 sm:mb-28">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-4">
            The writing expertise you're looking for
          </h2>
          <div className="max-w-3xl space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
            <p>
              My entire career has been a single job wearing different outfits. Whether it's UX
              writing, marketing copy, or long-form content, it's all been the same thing
              underneath: getting the right message to the right audience at the right time.
            </p>
            <p>
              I've spent the last decade honing my expertise in this direction, writing in
              different contexts and using words to guide users, motivate action, and get the
              results you're looking for.
            </p>
            <p>
              If you're looking for someone who can write well and drive the right metrics,
              you've found them.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {disciplines.map(({ icon: Icon, title, blurb }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-5">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{blurb}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3 — Numbers */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-[32px] sm:text-[44px] font-bold tracking-tight leading-none">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 — Work samples */}
        <section className="mb-20 sm:mb-28">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-2">
            Selected work
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Tap any piece to see the work up close.
          </p>
          <WorkSamples />
        </section>

        {/* 5 — Testimonials */}
        <section className="mb-20 sm:mb-28">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            What clients say
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className={`flex flex-col rounded-xl border border-border bg-card p-6 sm:p-8 ${
                  testimonials.length === 1 ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <Quote className="h-6 w-6 text-primary" />
                <blockquote
                  className={`mt-4 flex-1 leading-relaxed text-foreground ${
                    testimonials.length === 1 ? "text-lg sm:text-xl max-w-3xl" : "text-sm"
                  }`}
                >
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 6 — Contact */}
        <section>
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-2">
            Ready when you are
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Tell me a little about what you're working on, and I'll get back to you almost immediately.
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
