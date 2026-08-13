import { useState } from "react";

// Interactive island: contact form (Web3Forms with a mailto fallback) + a Google
// Calendar booking embed, behind two tabs. This is the kind of genuinely stateful
// widget that stays React and hydrates on the client — everything else on the
// page is static, server-rendered HTML. Dependency-light on purpose (plain
// elements, no Radix) so the slice stays small; it can be swapped for the
// original Radix ContactPanel once the ui/* primitives are ported.

const EMAIL = "vjtlaq@gmail.com";
const GCAL_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2i1JtJLb7GAUKgfIkvBWBvA1qn5-ZBOsxF3_x0nwVFNrpr2_w_xmdqhNFxRUZc2G6Eg0bM5-Ld?gv=true";
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string | undefined;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30";

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
          botcheck: "",
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
        <p className="font-medium text-foreground">Thanks — your message is on its way.</p>
        <p className="mt-1 text-sm text-muted-foreground">I'll get back to you soon.</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Describe your problem or project
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me where your users are getting stuck."
          className={fieldClass}
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
      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default function ContactPanel() {
  const [tab, setTab] = useState<"form" | "call">("form");
  const tabClass = (active: boolean) =>
    `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
      active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="w-full">
      <div className="mb-4 inline-flex gap-1 rounded-xl border border-border bg-card p-1">
        <button type="button" onClick={() => setTab("form")} className={tabClass(tab === "form")}>
          Contact form
        </button>
        <button type="button" onClick={() => setTab("call")} className={tabClass(tab === "call")}>
          Book a call
        </button>
      </div>
      {tab === "form" ? (
        <ContactForm />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <iframe
            src={GCAL_EMBED_URL}
            title="Book a call"
            className="block w-full"
            style={{ border: 0, height: 700 }}
          />
        </div>
      )}
    </div>
  );
}
