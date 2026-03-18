import { useState } from "react";
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

type Proficiency = "Expert" | "Proficient" | "Familiar";

interface Tool {
  id: number;
  name: string;
  icon: string;
  proficiency: Proficiency;
  bullets: string[];
}

const tools: Tool[] = [
  {
    id: 1,
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma/ffffff",
    proficiency: "Expert",
    bullets: [
      "Placeholder bullet one for Figma",
      "Placeholder bullet two for Figma",
      "Placeholder bullet three for Figma",
    ],
  },
  {
    id: 2,
    name: "Replit",
    icon: "https://cdn.simpleicons.org/replit/ffffff",
    proficiency: "Proficient",
    bullets: [
      "Placeholder bullet one for Replit",
      "Placeholder bullet two for Replit",
      "Placeholder bullet three for Replit",
    ],
  },
  {
    id: 3,
    name: "v0",
    icon: "https://cdn.simpleicons.org/v0/ffffff",
    proficiency: "Proficient",
    bullets: [
      "Placeholder bullet one for v0",
      "Placeholder bullet two for v0",
      "Placeholder bullet three for v0",
    ],
  },
  {
    id: 4,
    name: "Claude",
    icon: "https://cdn.simpleicons.org/anthropic/ffffff",
    proficiency: "Proficient",
    bullets: [
      "Placeholder bullet one for Claude",
      "Placeholder bullet two for Claude",
      "Placeholder bullet three for Claude",
    ],
  },
  {
    id: 5,
    name: "Atlassian Suite",
    icon: "https://cdn.simpleicons.org/atlassian/ffffff",
    proficiency: "Expert",
    bullets: [
      "Placeholder bullet one for Atlassian Suite",
      "Placeholder bullet two for Atlassian Suite",
      "Placeholder bullet three for Atlassian Suite",
    ],
  },
  {
    id: 6,
    name: "Google Suite",
    icon: "https://cdn.simpleicons.org/google/ffffff",
    proficiency: "Expert",
    bullets: [
      "Placeholder bullet one for Google Suite",
      "Placeholder bullet two for Google Suite",
      "Placeholder bullet three for Google Suite",
    ],
  },
  {
    id: 7,
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion/ffffff",
    proficiency: "Proficient",
    bullets: [
      "Placeholder bullet one for Notion",
      "Placeholder bullet two for Notion",
      "Placeholder bullet three for Notion",
    ],
  },
  {
    id: 8,
    name: "VS Code",
    icon: "__vscode__",
    proficiency: "Familiar",
    bullets: [
      "Placeholder bullet one for VS Code",
      "Placeholder bullet two for VS Code",
      "Placeholder bullet three for VS Code",
    ],
  },
];

const proficiencyConfig: Record<Proficiency, { label: string; color: string; bars: number }> = {
  Expert:     { label: "Expert",     color: "#3b82f6", bars: 3 },
  Proficient: { label: "Proficient", color: "#a855f7", bars: 2 },
  Familiar:   { label: "Familiar",   color: "#f59e0b", bars: 1 },
};

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

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
        <div className="mb-24">
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
                <div
                  className="relative w-full aspect-square rounded-xl flex items-center justify-center text-2xl overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl"
                  style={{ backgroundColor: study.bg }}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {study.emoji}
                  </span>
                  <div className="absolute top-3 right-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4" style={{ color: study.accent }} />
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${study.accent}40` }}
                  />
                </div>
                <p className="mt-3 text-sm font-medium leading-snug text-[#cccccc] group-hover:text-white transition-colors duration-200">
                  {study.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
            Tools I have used
          </h2>
          <div className="flex gap-8 items-start">

            {/* Left: tool list */}
            <div className="w-44 shrink-0 flex flex-col">
              {tools.map((tool) => {
                const isActive = activeTool?.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    onMouseEnter={() => setActiveTool(tool)}
                    onClick={() => setActiveTool(tool)}
                    className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-[#888888] hover:text-[#cccccc] hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2.5">
                        {tool.icon === "__vscode__" ? (
                          <svg
                            viewBox="0 0 24 24"
                            className={`w-4 h-4 shrink-0 transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-40"}`}
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
                          </svg>
                        ) : (
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className={`w-4 h-4 object-contain transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-40"}`}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        )}
                        {tool.name}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: detail panel */}
            <div className="flex-1 min-h-[220px]">
              {activeTool ? (
                <div
                  key={activeTool.id}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-200"
                >
                  {/* Tool name + proficiency */}
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="text-lg font-semibold text-white">{activeTool.name}</h3>
                    <div className="flex items-center gap-2">
                      {/* Pip indicators */}
                      <div className="flex gap-1">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className="w-2 h-2 rounded-full transition-colors duration-200"
                            style={{
                              backgroundColor:
                                n <= proficiencyConfig[activeTool.proficiency].bars
                                  ? proficiencyConfig[activeTool.proficiency].color
                                  : "#444444",
                            }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: proficiencyConfig[activeTool.proficiency].color }}
                      >
                        {proficiencyConfig[activeTool.proficiency].label}
                      </span>
                    </div>
                  </div>

                  {/* Bullet list */}
                  <ul className="space-y-2.5">
                    {activeTool.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#aaaaaa] leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col justify-center h-full min-h-[180px] border border-dashed border-[#3a3a3a] rounded-xl px-6">
                  <p className="text-sm text-[#555555] select-none">
                    Hover a tool to see experience &amp; proficiency
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
