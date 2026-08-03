import { Fragment } from "react";
import { ArrowUp } from "lucide-react";
import { WritingNav } from "../components/WritingNav";
import { SiteFooter } from "../components/SiteFooter";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { WorkSamples, emailSamples, longformSamples, otherSamples } from "../components/WorkSamples";

// Rate Coach emails, TWC onboarding email, fintech emails, TWC video, and the
// DirectBuy landing page — the former "email" and "other" groups shown together.
const copywritingSamples = [...emailSamples, ...otherSamples];

const sections = [
  { id: "copywriting", label: "Copywriting samples" },
  { id: "long-form", label: "Long-form writing samples" },
];

// Honor prefers-reduced-motion; smooth otherwise.
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// Additional writing samples — nested under Services and linked from the
// "Additional services" section. Reuses the archived WorkSamples content in the
// original email / long-form / other structure.
export default function AdditionalWritingSamples() {
  const jumpTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  };

  const backToTop = () => window.scrollTo({ top: 0, behavior: scrollBehavior() });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto pt-6 pb-12 sm:pt-8 sm:pb-20">
        <Breadcrumbs
          label="Additional Writing Samples"
          theme="light"
          homeHref="/"
          trail={[{ label: "Services", href: "/services" }]}
        />

        <section className="mb-14 sm:mb-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Services
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05]">
            Additional writing samples
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            In 12 years of professional writing, I've done copywriting, SEO content, regulated
            content research, editing, and more. Here are a few samples of the non-UX work I've done.
          </p>

          <nav
            aria-label="Jump to section"
            className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm"
          >
            {sections.map((s, i) => (
              <Fragment key={s.id}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-muted-foreground/40">
                    •
                  </span>
                )}
                <a
                  href={`#${s.id}`}
                  onClick={(e) => jumpTo(e, s.id)}
                  className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </Fragment>
            ))}
          </nav>
        </section>

        <section id="copywriting" className="mb-14 sm:mb-20 scroll-mt-24">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Copywriting samples
          </h2>
          <WorkSamples samples={copywritingSamples} />
        </section>

        <section id="long-form" className="scroll-mt-24">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Long-form writing samples
          </h2>
          <WorkSamples samples={longformSamples} />
        </section>

        <div className="mt-14 sm:mt-20 flex justify-center">
          <button
            type="button"
            onClick={backToTop}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </button>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
