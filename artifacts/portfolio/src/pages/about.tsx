import { FileText, Linkedin, BookOpen } from "lucide-react";
import { WritingNav } from "../components/WritingNav";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { aboutParagraphs, LINKEDIN_URL, MEDIUM_URL, RESUME_URL, AVATAR_SRC } from "../content/about";

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            About
          </p>
          <h1 className="mt-4 font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05]">
            A bit about me.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            Content designer and writer with 12+ years turning complex software into clear,
            consistent content that scales.
          </p>
        </section>

        {/* Bio */}
        <section className="mb-14 sm:mb-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="min-w-0 flex-1 space-y-4">
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
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1120px] w-[90%] mx-auto py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vernon Laquindanum
        </div>
      </footer>
    </main>
  );
}
