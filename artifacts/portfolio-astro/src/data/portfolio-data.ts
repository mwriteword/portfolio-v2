// Structured Portfolio/About data extracted from the old dark portfolio page so
// it can be shared across the rebuilt Portfolio page (tools + skills) and the
// About page (experience).

const EMPTY_DOT = "#cbd5e1";
export const proficiencyConfig = {
  Novice: { label: "Novice", labelColor: "#3b82f6", dots: [{ color: "#3b82f6" }, { color: EMPTY_DOT }, { color: EMPTY_DOT }] },
  "Novice / Intermediate": { label: "Novice / Intermediate", labelColor: "#22c55e", dots: [{ color: "#22c55e" }, { color: "#22c55e", half: true }, { color: EMPTY_DOT }] },
  Intermediate: { label: "Intermediate", labelColor: "#eab308", dots: [{ color: "#eab308" }, { color: "#eab308" }, { color: EMPTY_DOT }] },
  "Intermediate / Advanced": { label: "Intermediate / Advanced", labelColor: "#f97316", dots: [{ color: "#f97316" }, { color: "#f97316" }, { color: "#f97316", half: true }] },
  Advanced: { label: "Advanced", labelColor: "#ef4444", dots: [{ color: "#ef4444" }, { color: "#ef4444" }, { color: "#ef4444" }] },
} as const;
export type Proficiency = keyof typeof proficiencyConfig;
export { EMPTY_DOT };

export const tools: { id: number; name: string; icon: string; proficiency: Proficiency; bullets: string[] }[] = [
  { id: 1, name: "Figma", icon: "/images/icons/figma.svg", proficiency: "Intermediate / Advanced", bullets: ["Worked with designers to insert UX writing into screens and flows", "Iterated on UI screens with different interactions and content", "Created click-through prototypes and presentation materials"] },
  { id: 2, name: "Replit", icon: "https://cdn.simpleicons.org/replit", proficiency: "Intermediate", bullets: ["Used to prototype flows and UI contexts", "Created interactive visuals to convey complicated concepts"] },
  { id: 3, name: "v0", icon: "https://cdn.simpleicons.org/v0", proficiency: "Novice", bullets: ["Used to prototype flows and UI contexts"] },
  { id: 4, name: "Claude", icon: "https://cdn.simpleicons.org/claude", proficiency: "Intermediate / Advanced", bullets: ["Built agents with context to perform specific actions", "Used MCP connections to build automation triggers and flows", "Refined this portfolio using Claude Code and deployed changes to repo"] },
  { id: 5, name: "Atlassian Suite", icon: "https://cdn.simpleicons.org/atlassian", proficiency: "Advanced", bullets: ["Extensive experience using Jira, Confluence, Goals, Projects, Teams, Bitbucket, and Focus", "Have an innate understanding of how apps connect", "Intimately familiar with Admin and End User surfaces"] },
  { id: 6, name: "Google Suite", icon: "/images/icons/google.svg", proficiency: "Advanced", bullets: ["Career-long experience using Docs, Sheets, Slides, Forms, and Drive"] },
  { id: 7, name: "Notion", icon: "https://cdn.simpleicons.org/notion", proficiency: "Intermediate", bullets: ["Used to build portfolio site", "Crafted relational databases in Notion in personal settings"] },
  { id: 10, name: "Contentful", icon: "https://cdn.simpleicons.org/contentful", proficiency: "Intermediate / Advanced", bullets: ["Owned the full Platform Experiences support document set.", "Led a content uplift program that resolved 50+ feedback tickets and increased overall helpfulness rating by 18%.", "Drove a 60+ document migration from Intercom to Contentful."] },
  { id: 8, name: "VS Code", icon: "/images/icons/vscode.svg", proficiency: "Novice", bullets: ["Experience using VS Code to edit text strings and other minor UI elements", "Familiarity with basic git usage, plus the commit and PR processes"] },
  { id: 9, name: "Github", icon: "https://cdn.simpleicons.org/github", proficiency: "Novice / Intermediate", bullets: ["Viewed and managed files in a repo", "Reviewed pull requests and commits", "Light git work editing files in a repository"] },
];

export const skillCategories = [
  { name: "Content & Writing", color: "#3b82f6", skills: ["Content design", "UX writing", "Copywriting", "SEO content", "Technical writing", "Markdown", "Voice and tone"] },
  { name: "Strategy & Systems", color: "#22c55e", skills: ["Content strategy", "Content systems", "Content standards", "Content auditing", "Content evaluation", "Information architecture", "Taxonomy & naming systems", "Object modeling", "Design systems"] },
  { name: "Research & Leadership", color: "#a855f7", skills: ["User research & synthesis", "Journey mapping", "Experience modeling", "Accessibility", "Localization", "Cross-functional collaboration", "Workshop design", "Mentorship"] },
  { name: "AI & Emerging Tech", color: "#ef4444", skills: ["Agentic workflow development", "AI-assisted content", "AI-assisted development", "AI prototyping", "Prompt/LLM content"] },
];

export const experience = [
  { company: "Atlassian", span: "Jul 2021 – Mar 2026", accent: "#3b82f6", monogram: "A", logo: "/images/logos/atlassian.jpeg", roles: [{ title: "Senior Content Designer", dates: "Sept 2023 – Mar 2026", summary: "Owned content strategy and wrote all UX content for four platform apps: Home, Goals, Projects, and Teams." }, { title: "Content Designer", dates: "Jul 2021 – Sept 2023", summary: "Drove content for internal resources and procedures for products onboarding to the Atlassian platform. Later, moved to the Teams feature team and eventually Atlas." }] },
  { company: "Opower / Oracle Utilities", span: "Apr 2017 – Jun 2025", accent: "#22c55e", monogram: "O", logo: "/images/logos/opower.jpeg", roles: [{ title: "Web Content Specialist (Contract)", dates: "Sept 2024 – Jun 2025", summary: "Part-time contract role brought on to help a former colleague with content quality checks and management for Opower's tip library of 300+ existing energy efficiency tips." }, { title: "UX Writer", dates: "Apr 2017 – Jun 2021", summary: "Led content strategy in a regulated utilities environment, applying behavioral science to drive energy-saving behavior." }] },
  { company: "Course Hero", span: "Oct 2019 – Apr 2020", accent: "#a855f7", monogram: "CH", logo: "/images/logos/coursehero.jpeg", roles: [{ title: "Web/SEO Content Writer (Contract)", dates: "Oct 2019 – Apr 2020", summary: "Wrote SEO-driven content for the Textbook Solutions product, plus question revisions to improve search rankings for the solutions." }] },
  { company: "QuinStreet", span: "Feb 2014 – Mar 2017", accent: "#ec4899", monogram: "Q", logo: "/images/logos/quinstreet.jpeg", roles: [{ title: "Copywriting Manager", dates: "Jul 2016 – Mar 2017", summary: "Continued copywriting duties, while managing team workflows and mentoring other copywriters." }, { title: "UX Copywriter", dates: "Feb 2014 – Jul 2016", summary: "Developed content experience for several energy efficiency products designed to encourage behavior change, including the flagship Home Energy Report and the Behavior Load-Shaping email series." }] },
];
