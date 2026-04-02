import { useState, useEffect } from "react";
import { Mail, Linkedin, FileText, ArrowUpRight } from "lucide-react";
import { TableOfContents, useTocActiveSection, TocItem } from "../components/TableOfContents";

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

const tocItems: TocItem[] = [
  { id: "section-work", label: "Work" },
  { id: "section-tools", label: "Tools" },
  { id: "section-about", label: "About" },
];

function useColumns() {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

function ToolsSection({ activeTool, setActiveTool }: { activeTool: Tool | null; setActiveTool: (t: Tool | null) => void }) {
  const cols = useColumns();

  // Chunk tools into rows based on column count
  const rows: Tool[][] = [];
  for (let i = 0; i < tools.length; i += cols) {
    rows.push(tools.slice(i, i + cols));
  }

  // Find which row contains the active tool
  const activeRowIdx = activeTool ? rows.findIndex(row => row.some(t => t.id === activeTool.id)) : -1;
  const isRowOpen = (rowIdx: number) => activeRowIdx === rowIdx;

  return (
    <div id="section-tools" className="mb-16 sm:mb-20 scroll-mt-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
        Tools I have used
      </h2>
      <div className="space-y-4">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx}>
            {/* Card row */}
            <div className={`grid gap-4 ${cols === 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
              {row.map((tool) => {
                const config = proficiencyConfig[tool.proficiency];
                const isActive = activeTool?.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(isActive ? null : tool)}
                    aria-expanded={isActive}
                    aria-label={`${tool.name} — ${config.label}`}
                    className={`text-left rounded-xl p-5 transition-all duration-200 border relative overflow-visible ${
                      isActive
                        ? "bg-white/[0.06] border-white/10"
                        : "bg-[#2e2e2e] border-[#3a3a3a] hover:border-[#555555] hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-5 h-5 object-contain"
                        style={{ filter: isActive ? "none" : "contrast(0) brightness(1.3)" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <span className="text-sm font-semibold text-white">{tool.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {config.dots.map((dot, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full overflow-hidden"
                            style={
                              dot.half
                                ? { background: `linear-gradient(to right, ${dot.color} 50%, ${EMPTY_DOT} 50%)` }
                                : { backgroundColor: dot.color }
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium" style={{ color: config.labelColor }}>
                        {config.label}
                      </span>
                    </div>
                    {/* Speech-bubble notch: filled with detail panel color, overlaps card border */}
                    {isActive && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                        style={{ bottom: "-12px" }}
                      >
                        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" className="block" aria-hidden="true">
                          <path d="M0 0 L13 11 L26 0 Z" fill="#3a3a3a" />
                          <line x1="0" y1="0" x2="13" y2="11" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                          <line x1="13" y1="11" x2="26" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detail panel — smooth grid-row animation */}
            <div
              className="grid transition-[grid-template-rows] duration-250 ease-out"
              style={{ gridTemplateRows: isRowOpen(rowIdx) ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div
                  className="transition-opacity duration-200 ease-out"
                  style={{
                    opacity: isRowOpen(rowIdx) ? 1 : 0,
                    paddingTop: isRowOpen(rowIdx) ? "16px" : "0px",
                  }}
                >
                  {isRowOpen(rowIdx) && activeTool && (
                    <div className="bg-[#3a3a3a] rounded-xl p-6 border border-white/10">
                      <div
                        key={activeTool.id}
                        className="animate-in fade-in duration-200"
                      >
                        <ul className="space-y-2">
                          {activeTool.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-[#cccccc] leading-relaxed">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const activeSection = useTocActiveSection(tocItems);

  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <TableOfContents items={tocItems} activeId={activeSection} />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">

        {/* Hero */}
        <div className="mb-16 sm:mb-20">
          <h1 className="font-bold tracking-tight text-[40px] sm:text-[64px] lg:text-[80px] text-white lowercase leading-[0.95]">
            words i have written.
          </h1>
          <p className="text-[16px] sm:text-[20px] text-[#aaaaaa] mt-4 sm:mt-6">
            A Content Design portfolio by Vernon Laquindanum
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-8 sm:mt-10">
          <a
            href="mailto:vjtlaq@gmail.com"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="https://linkedin.com/in/vjtlaq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1one-srcm0IkcxXvq7vZYGt3XYh5EEeVz/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
          </div>
        </div>

        {/* Case Studies */}
        <div id="section-work" className="mb-16 sm:mb-20 scroll-mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
            projects i've worked on
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
        <ToolsSection activeTool={activeTool} setActiveTool={setActiveTool} />

        {/* About / Contact */}
        <div id="section-about" className="mb-16 sm:mb-20 scroll-mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-8">
            More about me
          </h2>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left: Bio */}
            <div className="flex-1 min-w-0">
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6">Hello! You can call me Vern.</h2>
              <div className="space-y-3">
                <p className="text-base leading-relaxed text-[#ffffff]">I have been in the UX Writing / Content Design space for over 12 years. I went from Copywriter to UX Writer to Content Designer, but at the core of it all, I write words that guide people and create content systems that scale.</p>
                <p className="text-base leading-relaxed text-[#ffffff]">I did this most recently at Atlassian, where I built content systems for their platform apps (FKA Atlas). I was responsible for content across the Goals, Projects, and Teams apps, and had to build systems that were rigid enough to create consistency across the experiences but flexible enough to suit each app's needs.</p>
                <p className="text-base leading-relaxed text-[#ffffff]">Now, I'm most interested in extending these systems with AI and understanding how the content design craft shifts more towards context engineering and agentic evaluation. I'm open and ready to work, so just shoot me a ping and let me know how I can help.</p>
              </div>
            </div>

            {/* Right: Avatar + Contact */}
            <div className="lg:w-64 shrink-0 flex flex-col items-start lg:items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="/images/avatar/illustration.png"
                  alt="Vernon Laquindanum"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:vjtlaq@gmail.com"
                  className="flex items-center gap-3 group w-fit"
                >
                  <span className="text-lg">✉️</span>
                  <span className="text-white text-sm group-hover:underline underline-offset-2 transition-all">
                    vjtlaq@gmail.com
                  </span>
                </a>
                <a
                  href="https://linkedin.com/in/vjtlaq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group w-fit"
                >
                  <Linkedin className="w-[18px] h-[18px] text-[#aaaaaa] group-hover:text-white transition-colors" />
                  <span className="text-white text-sm group-hover:underline underline-offset-2 transition-all">
                    linkedin.com/in/vjtlaq
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
