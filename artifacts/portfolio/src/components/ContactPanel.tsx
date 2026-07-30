import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const EMAIL = "vjtlaq@gmail.com";

// Calendly inline booking, tuned to the site's slate CTA color.
const CALENDLY_URL =
  "https://calendly.com/vjtlaq/30min?hide_gdpr_banner=1&primary_color=0e172b";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

// Web3Forms access key (frontend-safe). Set VITE_WEB3FORMS_ACCESS_KEY in .env /
// Vercel to enable real server-side delivery to vjtlaq@gmail.com. Without it, the
// form falls back to opening the visitor's mail client.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

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
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

/**
 * Calendly inline booking widget. Initialized programmatically (rather than the
 * auto-scan the embed snippet relies on) so it works when this tab mounts after
 * the script has already loaded.
 */
function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | undefined;

    // Note: the container intentionally has NO `calendly-inline-widget` class —
    // that class triggers widget.js's load-time auto-scan (which needs a
    // `data-url` attribute and only runs once), and would conflict with the
    // programmatic init below that we need for a tab mounting after load.
    const init = () => {
      if (cancelled || !ref.current || !window.Calendly) return false;
      ref.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: ref.current });
      return true;
    };

    if (!init()) {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = CALENDLY_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", init, { once: true });
      // Fallback in case the script had already fired `load` before we listened.
      poll = setInterval(() => {
        if (init()) clearInterval(poll);
      }, 300);
    }

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div ref={ref} style={{ minWidth: 320, height: 700 }} />
    </div>
  );
}

/**
 * Contact panel with two tabs: a message form (Web3Forms, mailto fallback) and a
 * Calendly booking embed. Used on the Writing landing page and the Services page.
 */
export function ContactPanel() {
  return (
    <Tabs defaultValue="form" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="form">Contact form</TabsTrigger>
        <TabsTrigger value="call">Book a call</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <ContactForm />
      </TabsContent>
      <TabsContent value="call">
        <CalendlyEmbed />
      </TabsContent>
    </Tabs>
  );
}
