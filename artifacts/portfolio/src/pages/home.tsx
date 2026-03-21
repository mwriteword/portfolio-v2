import { useState } from "react";
import { Mail, Linkedin, FileText, ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Goal types & Content Systems — Atlassian",
    image: "/images/atlassian/atlasheader.png",
    bg: "#1e3a5f",
    accent: "#3b82f6",
    href: "/case-study-1",
  },
  {
    id: 2,
    title: "Content Strategy & Behavior Change — Opower",
    image: "/images/opower/tile.webp",
    bg: "#1a3a2a",
    accent: "#22c55e",
    href: "/case-study-2",
  },
  {
    id: 3,
    title: "SEO & Longform Content — Course Hero",
    image: "/images/coursehero/tile.webp",
    bg: "#2a1a3a",
    accent: "#a855f7",
    href: "/case-study-3",
  },
  {
    id: 4,
    title: "Early Copywriting Works — QuinStreet",
    image: "/images/quinstreet/tile.webp",
    bg: "#3a2a10",
    accent: "#f59e0b",
    href: "/case-study-4",
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
    icon: "https://cdn.simpleicons.org/figma",
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
    icon: "https://cdn.simpleicons.org/replit",
    proficiency: "Intermediate",
    bullets: [
      "Used to prototype flows and UI contexts",
      "Created interactive visuals to convey complicated concepts",
    ],
  },
  {
    id: 3,
    name: "v0",
    icon: "https://cdn.simpleicons.org/v0",
    proficiency: "Novice",
    bullets: [
      "Used to prototype flows and UI contexts",
    ],
  },
  {
    id: 4,
    name: "Claude",
    icon: "https://cdn.simpleicons.org/claude",
    proficiency: "Intermediate / Advanced",
    bullets: [
      "Built agents with context to perform specific actions",
      "Used MCP connections to build automation triggers and flows",
      "Refined this portfolio using Claude Code and deployed changes to repo",
    ],
  },
  {
    id: 5,
    name: "Atlassian Suite",
    icon: "https://cdn.simpleicons.org/atlassian",
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
    icon: "/images/icons/google.svg",
    proficiency: "Advanced",
    bullets: [
      "Career-long experience using Docs, Sheets, Slides, Forms, and Drive",
    ],
  },
  {
    id: 7,
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion",
    proficiency: "Intermediate",
    bullets: [
      "Used to build portfolio site",
      "Crafted relational databases in Notion in personal settings",
    ],
  },
  {
    id: 8,
    name: "VS Code",
    icon: "/images/icons/vscode.svg",
    proficiency: "Novice",
    bullets: [
      "Experience using VS Code to edit text strings and other minor UI elements",
      "Familiarity with basic git usage, plus the commit and PR processes",
    ],
  },
  {
    id: 9,
    name: "Github",
    icon: "https://cdn.simpleicons.org/github/ffffff",
    proficiency: "Novice / Intermediate",
    bullets: [
      "Viewed and managed files in a repo",
      "Reviewed pull requests and commits",
      "Light git work editing files in a repository",
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
      <div className="max-w-3xl mx-auto px-5 py-12 sm:px-6 sm:py-20">

        {/* Hero title + Avatar */}
        <div className="flex gap-5 sm:gap-8 items-start">
          <div className="flex-1 min-w-0">
            <h1 className="font-bold tracking-tight text-[32px] sm:text-[48px] text-[#ffffff]">
              Vernon Laquindanum
            </h1>
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#ffffff] mb-4">Content Design, Strategy, and Systems</h2>
          </div>

          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/images/avatar/illustration.png"
                alt="Vernon Laquindanum"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5 sm:mt-6 mb-10">
          <a
            href="mailto:vjtlaq@gmail.com"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="http://linkedin.com/in/vjtlaq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1R7rL1Ndgr0b1lKSF8xvW39OA3-Dy7Md_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Case Studies */}
        <div className="mb-12">
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
                  <img
                    src={study.image}
                    alt={study.title}
                    className="absolute inset-0 w-full h-full object-contain p-3 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  />
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
        <div className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
            Tools I have used
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">

            {/* Left: tool list */}
            <div className="w-full sm:w-44 shrink-0 flex flex-row flex-wrap sm:flex-col gap-1">
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
                        <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-4 h-4 object-contain transition-all duration-150"
                            style={{
                              filter: isActive ? "none" : "contrast(0) brightness(1.1)",
                            }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
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
            <div className="flex-1 sm:min-h-[220px]">
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
                <div className="hidden sm:flex flex-col justify-center h-full min-h-[180px] border border-dashed border-[#3a3a3a] rounded-xl px-6">
                  <p className="text-sm text-[#555555] select-none">
                    Hover a tool to see experience &amp; proficiency
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Contact section */}
        <div className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
            More about me
          </h2>
        {/* Intro section headline */}
        <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#ffffff] mb-4">Hello! You can call me Vern.</h2>

        {/* Bio */}
        <div className="mb-12">
          <p className="text-base leading-relaxed text-[#ffffff]">I have been in the UX Writing / Content Design space for over 12 years. I went from Copywriter to UX Writer to Content Designer, but at the core of it all, I write words that guide people and create content systems that scale.</p>
          <p className="mt-3 text-base leading-relaxed text-[#ffffff]">I did this most recently at Atlassian, where I built content systems for their platform apps (FKA Atlas). I was responsible for content across the Goals, Projects, and Teams apps, and had to build systems that were rigid enough to create consistency across the experiences but flexible enough to suit each app's needs.</p>

        <p>Now, I'm most interested in extending these systems with AI and understanding how the content design craft shifts more towards context engineering and agentic evaluation. I'm open and ready to work, so just let me know how I can help.</p>
        </div>
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
              <Linkedin className="w-[18px] h-[18px] text-[#aaaaaa] group-hover:text-white transition-colors" />
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
