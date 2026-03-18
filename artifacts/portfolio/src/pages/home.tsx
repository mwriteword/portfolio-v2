import { Mail, Linkedin, FileText, ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Goal types & Content Systems — Atlassian",
    emoji: "🗂️",
    bg: "#1e3a5f",
    accent: "#3b82f6",
    href: "#",
  },
  {
    id: 2,
    title: "Content Strategy & Behavior Change — Opower",
    emoji: "⚡",
    bg: "#1a3a2a",
    accent: "#22c55e",
    href: "#",
  },
  {
    id: 3,
    title: "SEO & Longform Content — Course Hero",
    emoji: "📖",
    bg: "#2a1a3a",
    accent: "#a855f7",
    href: "#",
  },
  {
    id: 4,
    title: "Early Copywriting Works — QuinStreet",
    emoji: "✍️",
    bg: "#3a2a10",
    accent: "#f59e0b",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* Hero title */}
        <div className="mb-10">
          <h1 className="sm:text-7xl font-bold tracking-tight text-[70px] text-[#ffffff]">
            Vernon Laquindanum
          </h1>
          <h1 className="sm:text-7xl font-bold tracking-tight mt-1 text-[52px] text-[#cccccc]">Content Design</h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href="mailto:vjtlaq@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="http://linkedin.com/in/vjtlaq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1R7rL1Ndgr0b1lKSF8xvW39OA3-Dy7Md_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Avatar + Bio */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-24">
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://vjtlaq.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbe7efbf3-2dcd-4e36-8e17-4c59c4ab7e05%2Fb80aa8c3-3a70-4bb9-8617-9a8d7eba895a%2FPhoto_on_3-9-24_at_7.32_PM_2.jpg?table=block&id=02dee1b7-b498-26c9-b2ea-7bf0d4fcb59e&width=250&userId=&cache=v2"
                alt="Vernon Laquindanum"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base leading-relaxed text-[#FFFFFF]">
              Hey, I'm Vernon — a content designer with a background in linguistics, editorial strategy, and product writing. I work at the intersection of language and experience, crafting copy that's clear, intentional, and human.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#ffffff]">
              I've worked across SaaS, fintech, and consumer products — helping teams ship better words, faster. Whether it's microcopy, onboarding flows, or content systems, I care deeply about how language shapes the way people feel about a product.
            </p>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
            Words I have written
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {caseStudies.map((study) => (
              <a
                key={study.id}
                href={study.href}
                className="group block"
              >
                {/* Tile */}
                <div
                  className="relative w-full aspect-square rounded-xl flex items-center justify-center text-2xl overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl"
                  style={{ backgroundColor: study.bg }}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {study.emoji}
                  </span>
                  {/* Arrow on hover */}
                  <div className="absolute top-3 right-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    <ArrowUpRight
                      className="w-4 h-4"
                      style={{ color: study.accent }}
                    />
                  </div>
                  {/* Subtle border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${study.accent}40` }}
                  />
                </div>
                {/* Title below tile */}
                <p className="mt-3 text-sm font-medium leading-snug text-[#cccccc] group-hover:text-white transition-colors duration-200">
                  {study.title}
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
