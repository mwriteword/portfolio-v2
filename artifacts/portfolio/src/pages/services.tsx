import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { WritingNav } from "../components/WritingNav";
import { ServiceMenu } from "../components/ServiceMenu";
import { services } from "../content/services";

const additionalServices = [
  { name: "Copywriting", desc: "Email, ad copy, landing pages, and more." },
  {
    name: "Editorial services",
    desc: "AI content review, writing review, copyediting, and proofreading.",
  },
  {
    name: "Content writing & SEO",
    desc: "Long-form content and editorial, with analytics and performance tracking.",
  },
];

export default function Services() {
  const [, setLocation] = useLocation();

  // Route to the freelance landing page and scroll to its contact section.
  const goToContact = () => {
    setLocation("/");
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 60) requestAnimationFrame(tryScroll);
    };
    requestAnimationFrame(tryScroll);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Services
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05]">
            Content that scales with your product.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            Whether you want project-based content or ongoing support, I offer a variety of services
            to help you get the UX content expertise you need. Most engagements start with an audit
            and grow from there, but you can select independent engagements as needed.
          </p>
        </section>

        {/* Core offerings — master–detail menu */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Core offerings
          </h2>
          <ServiceMenu services={services} onBookCall={goToContact} />
        </section>

        {/* Additional services */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-2">
            Additional services
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Prices vary based on the size and shape of the engagement. Get in touch and we can work
            out pricing together.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {additionalServices.map(({ name, desc }) => (
              <div key={name} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight">
                Not sure which is the right fit?
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                We can work it out together. Just tell me what you're working on and we'll build the
                right solution for you.
              </p>
            </div>
            <button
              type="button"
              onClick={goToContact}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
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
