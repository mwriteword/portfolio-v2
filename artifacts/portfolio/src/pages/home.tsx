import { useState, useEffect, useRef, useCallback } from "react";
import { Mail, Linkedin, FileText, ArrowUpRight, Check, Copy } from "lucide-react";
import { TableOfContents, useTocActiveSection, TocItem } from "../components/TableOfContents";

const caseStudies = [
  {
    id: 1,
    title: "Goal Types & Content Systems — Atlassian",
    image: "/images/atlassian/tile.png",
    bg: "#1e3a5f",
    accent: "#3b82f6",
    href: "/case-study-1",
    fit: "cover" as const,
    tags: ["Content Systems", "IA", "Localization"],
    description: "A new goal type system that brought OKR support to Atlassian's Goals app.",
  },
  {
    id: 2,
    title: "TWC Onboarding & Content Strategy — Atlassian",
    image: "/images/atlassian/tileonboarding.png",
    bg: "#3a2a10",
    accent: "#f59e0b",
    href: "/case-study-onboarding",
    fit: "cover" as const,
    tags: ["Content Strategy", "Onboarding", "UX Writing"],
    description: "End-to-end onboarding content for the launch of a new multi-app bundle.",
  },
  {
    id: 3,
    title: "Behavior Change & UX Writing — Opower",
    image: "/images/opower/tile.png",
    bg: "#1a3a2a",
    accent: "#22c55e",
    href: "/case-study-2",
    fit: "contain" as const,
    tags: ["UX Writing", "Behavior Change", "Email"],
    description: "An email series designed to shift real-world energy-use behavior.",
  },
  {
    id: 4,
    title: "SEO & Longform Content — Course Hero",
    image: "/images/coursehero/tile.webp",
    bg: "#2a1a3a",
    accent: "#a855f7",
    href: "/case-study-coursehero",
    fit: "contain" as const,
    tags: ["SEO", "Longform", "Web Content"],
    description: "Search-optimized textbook descriptions written without access to the source texts.",
  },
  {
    id: 5,
    title: "Marketing Copywriting — QuinStreet",
    image: "/images/quinstreet/tile.png",
    bg: "#3a1a2e",
    accent: "#ec4899",
    href: "/case-study-quinstreet",
    fit: "contain" as const,
    tags: ["Copywriting", "Email", "Landing Pages"],
    description: "Banner, email, and landing-page copy across a range of marketing verticals.",
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
    icon: "/images/icons/figma.svg",
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
    id: 10,
    name: "Contentful",
    icon: "https://cdn.simpleicons.org/contentful",
    proficiency: "Intermediate / Advanced",
    bullets: [
      "Owned the full Platform Experiences support document set.",
      "Led a content uplift program that resolved 50+ feedback tickets and increased overall helpfulness rating by 18%.",
      "Drove a 60+ document migration from Intercom to Contentful.",
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

interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

// Four peer categories rendered in a uniform 2x2 grid (AI last).
// `color` (reused from the site's project palette) tints pills on hover.
const skillCategories: SkillCategory[] = [
  {
    name: "Content & Writing",
    color: "#3b82f6", // blue
    skills: [
      "Content design",
      "UX writing",
      "Copywriting",
      "SEO content",
      "Technical writing",
      "Markdown",
      "Voice and tone",
    ],
  },
  {
    name: "Strategy & Systems",
    color: "#22c55e", // green
    skills: [
      "Content strategy",
      "Content systems",
      "Content standards",
      "Content auditing",
      "Content evaluation",
      "Information architecture",
      "Taxonomy & naming systems",
      "Object modeling",
      "Design systems",
    ],
  },
  {
    name: "Research & Leadership",
    color: "#a855f7", // purple
    skills: [
      "User research & synthesis",
      "Journey mapping",
      "Experience modeling",
      "Accessibility",
      "Localization",
      "Cross-functional collaboration",
      "Workshop design",
      "Mentorship",
    ],
  },
  {
    name: "AI & Emerging Tech",
    color: "#ef4444", // red
    skills: [
      "Agentic workflow development",
      "AI-assisted content",
      "AI-assisted development",
      "AI prototyping",
      "Prompt/LLM content",
    ],
  },
];

interface ExperienceRole {
  title: string;
  dates: string;
  summary: string;
}

interface ExperienceEntry {
  company: string;
  span: string;
  accent: string;
  monogram: string;
  logo: string;
  roles: ExperienceRole[];
}

const experience: ExperienceEntry[] = [
  {
    company: "Atlassian",
    span: "Jul 2021 – Mar 2026",
    accent: "#3b82f6",
    monogram: "A",
    logo: "/images/logos/atlassian.jpeg",
    roles: [
      {
        title: "Senior Content Designer",
        dates: "Sept 2023 – Mar 2026",
        summary: "Owned content strategy and wrote all UX content for four platform apps: Home, Goals, Projects, and Teams.",
      },
      {
        title: "Content Designer",
        dates: "Jul 2021 – Sept 2023",
        summary: "Drove content for internal resources and procedures for products onboarding to the Atlassian platform. Later, moved to the Teams feature team and eventually Atlas.",
      },
    ],
  },
  {
    company: "Opower / Oracle Utilities",
    span: "Apr 2017 – Jun 2025",
    accent: "#22c55e",
    monogram: "O",
    logo: "/images/logos/opower.jpeg",
    roles: [
      {
        title: "Web Content Specialist (Contract)",
        dates: "Sept 2024 – Jun 2025",
        summary: "Part-time contract role brought on to help a former colleague with content quality checks and management for Opower's tip library of 300+ existing energy efficiency tips.",
      },
      {
        title: "UX Writer",
        dates: "Apr 2017 – Jun 2021",
        summary: "Led content strategy in a regulated utilities environment, applying behavioral science to drive energy-saving behavior.",
      },
    ],
  },
  {
    company: "Course Hero",
    span: "Oct 2019 – Apr 2020",
    accent: "#a855f7",
    monogram: "CH",
    logo: "/images/logos/coursehero.jpeg",
    roles: [
      {
        title: "Web/SEO Content Writer (Contract)",
        dates: "Oct 2019 – Apr 2020",
        summary: "Wrote SEO-driven content for the Textbook Solutions product, plus question revisions to improve search rankings for the solutions.",
      },
    ],
  },
  {
    company: "QuinStreet",
    span: "Feb 2014 – Mar 2017",
    accent: "#ec4899",
    monogram: "Q",
    logo: "/images/logos/quinstreet.jpeg",
    roles: [
      {
        title: "Copywriting Manager",
        dates: "Jul 2016 – Mar 2017",
        summary: "Continued copywriting duties, while managing team workflows and mentoring other copywriters.",
      },
      {
        title: "UX Copywriter",
        dates: "Feb 2014 – Jul 2016",
        summary: "Developed content experience for several energy efficiency products designed to encourage behavior change, including the flagship Home Energy Report and the Behavior Load-Shaping email series.",
      },
    ],
  },
];

const tocItems: TocItem[] = [
  { id: "section-work", label: "Work" },
  { id: "section-skills", label: "Skills" },
  { id: "section-tools", label: "Tools" },
  { id: "section-experience", label: "Experience" },
  { id: "section-about", label: "About" },
];

// Literal classes per category so Tailwind generates them (utilities are !important
// here, so inline color can't override — and arbitrary-with-var doesn't generate).
const skillActiveClass: Record<string, string> = {
  "Content & Writing": "text-[#3b82f6] border-[#3b82f6]",
  "Strategy & Systems": "text-[#22c55e] border-[#22c55e]",
  "Research & Leadership": "text-[#a855f7] border-[#a855f7]",
  "AI & Emerging Tech": "text-[#ef4444] border-[#ef4444]",
};

function SkillsSection() {
  // Color highlight on hover (desktop) or tap (mobile). A tap lights the pill,
  // then it auto-fades after 2.5s — purely cosmetic.
  const [tapped, setTapped] = useState<Set<string>>(new Set());
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const highlight = (key: string) => {
    setTapped((prev) => new Set(prev).add(key));
    if (timers.current[key]) clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => {
      setTapped((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      delete timers.current[key];
    }, 2500);
  };

  useEffect(() => () => { Object.values(timers.current).forEach(clearTimeout); }, []);

  return (
    <div id="section-skills" className="mb-16 sm:mb-20 scroll-mt-12">
      <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6">
        skills i've developed.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#777777] mb-4">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => {
                const key = `${category.name}::${skill}`;
                const active = tapped.has(key) || hoverKey === key;
                return (
                  <span
                    key={skill}
                    onClick={() => highlight(key)}
                    onMouseEnter={() => setHoverKey(key)}
                    onMouseLeave={() => setHoverKey(null)}
                    className={`cursor-pointer select-none text-sm rounded-full border px-3.5 py-1.5 transition-colors duration-200 ${
                      active ? skillActiveClass[category.name] : "text-[#aaaaaa] border-[#3a3a3a]"
                    }`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  // Expand on hover (desktop) or tap (mobile). Single open at a time; clicking
  // outside collapses. Height/opacity driven by inline styles for reliability.
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div id="section-experience" ref={sectionRef} className="mb-16 sm:mb-20 scroll-mt-12">
      <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6">
        places i've worked.
      </h2>
      <div className="divide-y divide-[#333333]">
        {experience.map((entry, i) => {
          const isOpen = openId === entry.company;
          const expanded = isOpen || hoverId === entry.company;
          return (
            <div
              key={entry.company}
              onClick={() => setOpenId(isOpen ? null : entry.company)}
              onMouseEnter={() => setHoverId(entry.company)}
              onMouseLeave={() => setHoverId(null)}
              className={`py-4 px-3 -mx-3 rounded-xl cursor-pointer transition-colors duration-200 ${
                expanded ? "bg-[#383838]" : ""
              }`}
            >
              {/* Collapsed row — top-aligned so the logo stays anchored on expand */}
              <div className="flex items-start gap-4">
                {/* Index (centered against the logo height) */}
                <span className="h-9 flex items-center text-xs text-[#555555] w-6 shrink-0 font-mono tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Logo (monogram fallback behind) */}
                <div
                  className="relative w-9 h-9 rounded-lg shrink-0 overflow-hidden"
                  style={{ backgroundColor: `${entry.accent}1a` }}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-sm font-bold"
                    style={{ color: entry.accent }}
                  >
                    {entry.monogram}
                  </span>
                  <img
                    src={entry.logo}
                    alt={entry.company}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                {/* Company + roles, with dates right-aligned */}
                <div className="flex-1 min-w-0">
                  {/* First line — vertically centered to the logo */}
                  <div className="h-9 flex items-center">
                    <div className="flex-1 min-w-0 flex items-baseline justify-between gap-4">
                      <div className="min-w-0 flex items-baseline gap-x-2 flex-wrap">
                        <span className="text-sm font-medium text-white">{entry.company}</span>
                        <span className="text-sm text-[#888888] truncate">
                          {entry.roles.map((r) => r.title).join(", ")}
                        </span>
                      </div>
                      <span className="text-xs text-[#888888] shrink-0">{entry.span}</span>
                    </div>
                  </div>

                  {/* Expanded detail — per-role dates + summary.
                      Conditionally rendered with a fade/slide-in on hover or tap. */}
                  {expanded && (
                    <div className="pt-2 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                      {entry.roles.map((role) => (
                        <div key={role.title}>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm font-medium text-white">{role.title}</span>
                            <span className="text-xs text-[#888888]">{role.dates}</span>
                          </div>
                          <p className="text-sm text-[#cccccc] leading-relaxed mt-0.5">{role.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ToolsSection() {
  const [selectedId, setSelectedId] = useState(tools[0].id);
  // Expand/collapse is a persistent mode: stays collapsed while browsing tools,
  // and once expanded stays expanded (across tool changes) until "Show less".
  const [expanded, setExpanded] = useState(false);
  const selected = tools.find((t) => t.id === selectedId) ?? tools[0];
  const selConfig = proficiencyConfig[selected.proficiency];
  const hasMore = selected.bullets.length > 1;

  return (
    <div id="section-tools" className="mb-16 sm:mb-20 scroll-mt-12">
      <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6">
        tools i've used.
      </h2>

      {/* Detail panel — static at the top */}
      <div className="bg-[#242424] rounded-xl p-6 sm:p-8 border border-white/5 mb-6">
        <div key={selected.id} className="animate-in fade-in duration-200">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={selected.icon}
              alt={selected.name}
              className="w-7 h-7 object-contain shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <h3 className="text-lg font-semibold text-white">{selected.name}</h3>
          </div>
          <div className="flex items-center gap-2 mb-5 pb-5 border-b border-white/5">
            <div className="flex gap-1">
              {selConfig.dots.map((dot, i) => (
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
            <span className="text-xs font-medium" style={{ color: selConfig.labelColor }}>
              {selConfig.label}
            </span>
          </div>

          {/* Bullets — collapsed clamps to ~first bullet with a fade + "Show more" */}
          <div className="relative">
            <ul
              className={`space-y-3 overflow-hidden transition-all duration-300 ease-out ${
                expanded ? "max-h-[1000px]" : "max-h-[3.5rem]"
              }`}
            >
              {selected.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#cccccc] leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
            {hasMore && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="absolute inset-x-0 bottom-0 flex h-12 items-end justify-start bg-gradient-to-t from-[#242424] via-[#242424] to-transparent text-xs font-medium text-[#6ea8ff] hover:text-[#9cc4ff] transition-colors"
              >
                Show more
              </button>
            )}
          </div>

          {hasMore && expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="mt-3 text-xs font-medium text-[#6ea8ff] hover:text-[#9cc4ff] transition-colors"
            >
              Show less
            </button>
          )}
        </div>
      </div>

      {/* Tool list */}
      <div className="flex flex-col gap-0.5">
        {tools.map((tool) => {
          const config = proficiencyConfig[tool.proficiency];
          const isActive = tool.id === selectedId;
          return (
            <button
              key={tool.id}
              onMouseEnter={() => setSelectedId(tool.id)}
              onFocus={() => setSelectedId(tool.id)}
              onClick={() => setSelectedId(tool.id)}
              aria-pressed={isActive}
              aria-label={`${tool.name} — ${config.label}`}
              className={`flex items-center gap-3 rounded-lg pl-2 pr-3 py-2.5 text-left transition-colors duration-200 ${
                isActive ? "bg-[#383838]" : "hover:bg-[#333333]"
              }`}
            >
              {/* Accent bar */}
              <span
                className="w-0.5 h-5 rounded-full shrink-0 transition-colors duration-200"
                style={{ backgroundColor: isActive ? config.labelColor : "transparent" }}
              />
              <img
                src={tool.icon}
                alt=""
                className="w-4 h-4 object-contain shrink-0"
                style={{ filter: isActive ? "none" : "contrast(0) brightness(1.3)" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span
                className={`flex-1 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#999999]"
                }`}
              >
                {tool.name}
              </span>
              {/* Proficiency dots */}
              <div className="flex gap-1 shrink-0">
                {config.dots.map((dot, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full overflow-hidden"
                    style={
                      dot.half
                        ? { background: `linear-gradient(to right, ${dot.color} 50%, ${EMPTY_DOT} 50%)` }
                        : { backgroundColor: dot.color }
                    }
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const EMAIL = "vjtlaq@gmail.com";

function CopyEmailButton({ variant = "hero" }: { variant?: "hero" | "footer" }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [manualCopied, setManualCopied] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setShowTooltip(true);
    setManualCopied(false);
  }, []);

  const handleManualCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setManualCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setManualCopied(false), 2000);
  }, []);

  // Close tooltip on click outside
  useEffect(() => {
    if (!showTooltip) return;
    const handleClick = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showTooltip]);

  if (variant === "footer") {
    return (
      <div className="relative" ref={tooltipRef}>
        <button
          onClick={copyEmail}
          className="flex items-center gap-3 group w-fit cursor-pointer"
        >
          <span className="text-lg">✉️</span>
          <span className="text-white text-sm group-hover:underline underline-offset-2 transition-all">
            {EMAIL}
          </span>
        </button>
        {showTooltip && (
          <div className="absolute bottom-full left-0 mb-2 bg-[#3a3a3a] border border-[#555555] rounded-lg p-3 shadow-xl z-50 min-w-[280px]">
            <p className="text-xs text-[#22c55e] font-medium mb-2 flex items-center gap-1.5">
              <Check className="w-3 h-3" />
              Email copied to clipboard
            </p>
            <div className="flex gap-1.5">
              <input
                type="text"
                readOnly
                value={EMAIL}
                className="flex-1 px-2.5 py-1.5 rounded bg-[#2e2e2e] text-white text-xs border border-[#555555] outline-none select-all"
                onFocus={(e) => e.target.select()}
              />
              <button
                onClick={handleManualCopy}
                className="px-2.5 py-1.5 rounded bg-[#2e2e2e] border border-[#555555] text-white hover:bg-white/10 transition-colors"
                aria-label="Copy email"
              >
                {manualCopied ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={tooltipRef}>
      <button
        onClick={copyEmail}
        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Mail className="w-4 h-4" />
        Email
      </button>
      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 bg-[#3a3a3a] border border-[#555555] rounded-lg p-3 shadow-xl z-50 min-w-[280px]">
          <p className="text-xs text-[#22c55e] font-medium mb-2 flex items-center gap-1.5">
            <Check className="w-3 h-3" />
            Email copied to clipboard
          </p>
          <div className="flex gap-1.5">
            <input
              type="text"
              readOnly
              value={EMAIL}
              className="flex-1 px-2.5 py-1.5 rounded bg-[#2e2e2e] text-white text-xs border border-[#555555] outline-none select-all"
              onFocus={(e) => e.target.select()}
            />
            <button
              onClick={handleManualCopy}
              className="px-2.5 py-1.5 rounded bg-[#2e2e2e] border border-[#555555] text-white hover:bg-white/10 transition-colors"
              aria-label="Copy email"
            >
              {manualCopied ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const activeSection = useTocActiveSection(tocItems);

  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <TableOfContents items={tocItems} activeId={activeSection} />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">

        {/* Hero */}
        <div className="mb-16 sm:mb-20">
          <p className="text-[16px] sm:text-[20px] text-[#aaaaaa] mb-4 sm:mb-6">
            Hello! I'm Vern, a Senior Content Designer, and these are
          </p>
          <h1 className="font-bold tracking-tight text-[40px] sm:text-[64px] lg:text-[80px] text-white lowercase leading-[0.95]">
            words i have written.
          </h1>
          <p className="text-[16px] sm:text-[20px] text-[#aaaaaa] mt-4 sm:mt-6">
            In other words, this is a Content Design Portfolio by Vernon Laquindanum.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-8 sm:mt-10">
          <CopyEmailButton />

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
            href="https://docs.google.com/document/d/13RsZkG_7wzEnA9dBToBTtVLWqRb2BFS_X_Ns_zhAcro/edit?usp=sharing"
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
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6">
            things i've worked on.
          </h2>
          <div className="divide-y divide-[#333333]">
            {caseStudies.map((study, i) => {
              const [projectTitle, company] = study.title.split(' — ');
              return (
                <a
                  key={study.id}
                  href={study.href}
                  className="group flex items-center gap-4 py-4 px-3 -mx-3 rounded-xl hover:bg-[#383838] transition-colors duration-200"
                >
                  {/* Index */}
                  <span className="text-xs text-[#555555] w-6 shrink-0 font-mono tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Thumbnail */}
                  <div
                    className="w-16 h-12 rounded-md overflow-hidden shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: study.bg }}
                  >
                    <img
                      src={study.image}
                      alt=""
                      className={`w-full h-full ${study.fit === 'cover' ? 'object-cover' : 'object-contain p-1'}`}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#cccccc] group-hover:text-white transition-colors duration-200 truncate">
                      {projectTitle}
                    </p>
                    {company && (
                      <p className="text-xs text-[#555555] mt-0.5">{company}</p>
                    )}
                    {/* Description — revealed on hover via grid-rows expand */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-xs text-[#999999] leading-relaxed pt-1.5 pr-4">
                          {study.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div className="hidden md:flex items-center gap-1.5 shrink-0">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-[#888888] border border-[#3a3a3a] rounded-full px-2.5 py-1 group-hover:border-[#4a4a4a] group-hover:text-[#aaaaaa] transition-colors duration-200 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: study.accent }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <SkillsSection />

        {/* Tools */}
        <ToolsSection />

        {/* Experience */}
        <ExperienceSection />

        {/* About / Contact */}
        <div id="section-about" className="mb-16 sm:mb-20 scroll-mt-12">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6">
            more about me.
          </h2>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left: Bio */}
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-[#ffffff] mb-3">Hello! You can call me Vern.</p>
              <div className="space-y-3">
                <p className="text-base leading-relaxed text-[#ffffff]">I have been in the UX Writing / Content Design space for over 13 years. I went from Copywriter to UX Writer to Content Designer, but at the core of it all, I write words that guide people and create content systems that scale.</p>
                <p className="text-base leading-relaxed text-[#ffffff]">I did this most recently at Atlassian, where I built content systems for their platform apps (FKA Atlas). I was responsible for content across the Home, Goals, Projects, and Teams platform apps, and had to build systems that were rigid enough to create consistency across the experiences but flexible enough to suit each app's needs.</p>
                <p className="text-base leading-relaxed text-[#ffffff]">When I'm not doing content stuff, I'm a father/butler to two small children for a majority of my time. In what remaining time I find, I like to boulder at my local rock climbing gym and play a variety of video games (mostly RPGs of some kind).</p>
                <p className="text-base leading-relaxed text-[#ffffff]">In any case, I'm open and ready to work. Just give me a shout and let me know how I can help.</p>
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
                <CopyEmailButton variant="footer" />
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
