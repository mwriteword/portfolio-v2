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

type Proficiency =
  | "Novice"
  | "Novice / Intermediate"
  | "Intermediate"
  | "Intermediate / Advanced"
  | "Advanced";

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
    proficiency: "Intermediate / Advanced",
    bullets: [
      "Worked with designers to insert UX writing into screens and flows",
      "Iterated on UI screens with different interactions and content",
      "Created click-through prototypes and presentation materials",
    ],
  },
  {
    id: 2,
    name: "Replit",
    icon: "https://cdn.simpleicons.org/replit/ffffff",
    proficiency: "Intermediate",
    bullets: [
      "Used to prototype flows and UI contexts",
      "Created interactive visuals to convey complicated concepts",
    ],
  },
  {
    id: 3,
    name: "v0",
    icon: "https://cdn.simpleicons.org/v0/ffffff",
    proficiency: "Novice",
    bullets: [
      "Used to prototype flows and UI contexts",
    ],
  },
  {
    id: 4,
    name: "Claude",
    icon: "https://cdn.simpleicons.org/claude/ffffff",
    proficiency: "Intermediate / Advanced",
    bullets: [
      "Built agents with context to perform specific actions",
      "Used MCP connections to build automation triggers and flows",
    ],
  },
  {
    id: 5,
    name: "Atlassian Suite",
    icon: "https://cdn.simpleicons.org/atlassian/ffffff",
    proficiency: "Advanced",
    bullets: [
      "Extensive experience using Jira, Confluence, Goals, Projects, Teams, Bitbucket, and Focus",
      "Have an innate understanding of how apps connect",
      "Intimately familiar with Admin and End User surfaces",
    ],
  },
  {
    id: 6,
    name: "Google Suite",
    icon: "__google__",
    proficiency: "Advanced",
    bullets: [
      "Career-long experience using Docs, Sheets, Slides, Forms, and Drive",
    ],
  },
  {
    id: 7,
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion/ffffff",
    proficiency: "Intermediate",
    bullets: [
      "Used to build portfolio site",
      "Crafted relational databases in Notion in personal settings",
    ],
  },
  {
    id: 8,
    name: "VS Code",
    icon: "__vscode__",
    proficiency: "Novice",
    bullets: [
      "Experience using VS Code to edit text strings and other minor UI elements",
      "Familiarity with basic git usage, plus the commit and PR processes",
    ],
  },
];

const EMPTY_DOT = "#3a3a3a";

type DotConfig = { color: string; half?: boolean };

interface ProficiencyConfig {
  label: string;
  labelColor: string;
  dots: [DotConfig, DotConfig, DotConfig];
}

const proficiencyConfig: Record<Proficiency, ProficiencyConfig> = {
  "Novice": {
    label: "Novice",
    labelColor: "#3b82f6",
    dots: [{ color: "#3b82f6" }, { color: EMPTY_DOT }, { color: EMPTY_DOT }],
  },
  "Novice / Intermediate": {
    label: "Novice / Intermediate",
    labelColor: "#22c55e",
    dots: [{ color: "#22c55e" }, { color: "#22c55e", half: true }, { color: EMPTY_DOT }],
  },
  "Intermediate": {
    label: "Intermediate",
    labelColor: "#eab308",
    dots: [{ color: "#eab308" }, { color: "#eab308" }, { color: EMPTY_DOT }],
  },
  "Intermediate / Advanced": {
    label: "Intermediate / Advanced",
    labelColor: "#f97316",
    dots: [{ color: "#f97316" }, { color: "#f97316" }, { color: "#f97316", half: true }],
  },
  "Advanced": {
    label: "Advanced",
    labelColor: "#ef4444",
    dots: [{ color: "#ef4444" }, { color: "#ef4444" }, { color: "#ef4444" }],
  },
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
            <p className="text-base leading-relaxed text-[#ffffff]">I have been in the UX Writing / Content Design space for over 12 years. I went from Copywriter to UX Writer to Content Designer, but at the core of it all, I write words that guide people and create content systems that scale.</p>
            <p className="mt-3 text-base leading-relaxed text-[#ffffff]">did this most recently at Atlassian, where I built content systems for their platform apps (FKA Atlas). I was responsible for content across the Goals, Projects, and Teams apps, and had to build systems that were rigid enough to create consistency across the experiences but flexible enough to suit each app’s needs.

            Now, I’m most interested in extending these systems with AI and understanding how the content design craft shifts more towards context engineering and agentic evaluation.</p>
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
        <div className="mb-24">
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
                        ) : tool.icon === "__google__" ? (
                          <svg
                            viewBox="0 0 24 24"
                            className={`w-4 h-4 shrink-0 transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-40"}`}
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
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
                        {proficiencyConfig[activeTool.proficiency].dots.map((dot, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full transition-all duration-200 overflow-hidden"
                            style={
                              dot.half
                                ? {
                                    background: `linear-gradient(to right, ${dot.color} 50%, ${EMPTY_DOT} 50%)`,
                                  }
                                : { backgroundColor: dot.color }
                            }
                          />
                        ))}
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: proficiencyConfig[activeTool.proficiency].labelColor }}
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

        {/* Contact section */}
        <div className="mb-24">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
            How to contact me
          </h2>

          <p className="text-[#FFFFFF] text-base mb-10 max-w-md leading-relaxed">
            I'm ready and open to work. Just shoot me a line and we'll take it from there.
          </p>

          <div className="flex flex-col gap-5">
            {/* Email */}
            <a
              href="mailto:vjtlaq@gmail.com"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="text-lg">✉️</span>
              <span className="text-[#aaaaaa] text-sm">Email:</span>
              <span className="text-white text-sm group-hover:underline underline-offset-2 transition-all">
                vjtlaq@gmail.com
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="http://linkedin.com/in/vjtlaq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit"
            >
              <img
                src="https://cdn.simpleicons.org/linkedin/aaaaaa"
                alt="LinkedIn"
                className="w-[18px] h-[18px] object-contain group-hover:opacity-100 opacity-70 transition-opacity"
              />
              <span className="text-[#aaaaaa] text-sm">LinkedIn:</span>
              <span className="text-white text-sm group-hover:underline underline-offset-2 transition-all">
                linkedin.com/in/vjtlaq
              </span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
