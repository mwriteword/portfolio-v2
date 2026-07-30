import { WritingNav } from "../components/WritingNav";
import { WorkSamples, emailSamples, longformSamples, otherSamples } from "../components/WorkSamples";

// Preserved (but intentionally un-linked) archive of the writing work samples that
// used to live on the freelance landing page. Not in any nav yet — reachable only by
// direct URL (/copy-work) so the content is kept but not surfaced.
export default function CopyWork() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        <section className="mb-14 sm:mb-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Work
          </p>
          <h1 className="mt-4 font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05]">
            Writing samples
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            A selection of email, long-form, and other writing work.
          </p>
        </section>

        <section className="mb-14 sm:mb-20">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-6">
            Email samples
          </h2>
          <WorkSamples samples={emailSamples} />
        </section>

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

      <footer className="border-t border-border">
        <div className="max-w-[1120px] w-[90%] mx-auto py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vernon Laquindanum
        </div>
      </footer>
    </main>
  );
}
