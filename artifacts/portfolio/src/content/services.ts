import { Stethoscope, Library, Bot, Rocket, LifeBuoy, type LucideIcon } from "lucide-react";

// Single source of truth for the service offerings. Used by the Writing landing
// page ("How I fix your product's content" cards, which read eyebrow/title/summary/
// icon) and the Services page (which additionally renders the full `detail`).
// The landing cards deep-link to /services#slug.

export interface CaseStudy {
  label: string;
  comingSoon?: boolean;
  /** Set once the case-study page exists; until then the tag renders as "Soon". */
  href?: string;
}

export interface ServiceDetail {
  /** "What this solves" */
  solves: string;
  /** "What the process is like" */
  process: string;
  /** "What you get" */
  youGet: string[];
  caseStudy?: CaseStudy;
  timeline: string;
  pricing: string;
  /** "Who this is for" */
  forWho: string;
  /** "Who this is not for" */
  notForWho: string;
}

export interface Service {
  /** Anchor id on the Services page + URL fragment used by home-page cards. */
  slug: string;
  /** Benefit-oriented kicker, e.g. "Diagnose the problem". */
  eyebrow: string;
  /** Service name. */
  title: string;
  /** One-line description shown collapsed (Services) + on the home cards. */
  summary: string;
  icon: LucideIcon;
  /**
   * Categorical accent (hue from the shared multi-color palette, tuned to a
   * light-legible shade). Each offering owns one, mirroring how case studies /
   * experience entries own an accent on the portfolio side. Where an offering
   * links to a case study, the hue matches that case study's accent.
   */
  accent: string;
  detail: ServiceDetail;
}

export const services: Service[] = [
  {
    slug: "content-experience-audit",
    eyebrow: "Diagnose the problem",
    title: "Content Experience Audit",
    summary: "A comprehensive audit of your product's words to find where you're losing users.",
    icon: Stethoscope,
    accent: "#9333ea", // purple
    detail: {
      solves:
        "Customer service tickets are up. Users are dropping off week to week. You might suspect the content, but maybe you're not sure. I'll find what's broken across the experience, prioritize by impact, and show you what to fix first.",
      process:
        "I'll do a comprehensive audit of the words across your product, help articles, and anywhere else your users are reading your words. I'll assess the current state line by line, identify problem areas, note opportunities for standardization, and map them to metrics you already track.",
      youGet: [
        "Full inventory of content across the target surfaces",
        "Prioritized issue log with severity and effort",
        "Rewritten copy for the top-priority items",
        "Findings readout and ways to prevent this from happening again in the future",
      ],
      caseStudy: { label: "Platform Apps Support Doc Audit", comingSoon: true },
      timeline: "3–6 weeks depending on size and scope.",
      pricing: "Starts at $6,000.",
      forWho:
        "Teams that don't or haven't had content design support and need help with product content, help articles, or even marketing content.",
      notForWho:
        "Companies who have larger technical or interaction problems beyond just the content.",
    },
  },
  {
    slug: "content-standards-systems",
    eyebrow: "Build rules to fix the problem",
    title: "Content Standards & Systems",
    summary:
      "A source of truth for voice, tone, vocabulary, and message patterns so your team can keep building.",
    icon: Library,
    accent: "#2563eb", // blue — matches the linked Goal Types case study
    detail: {
      solves:
        "Your product works, but each page sounds like it was written by a different team. When no one owns the content, naming drifts, messages aren't consistent, and navigating your product becomes frustrating. Rather than looking at microcopy screen-by-screen, I'll build standards for what your words should actually sound like and create repeatable message patterns so it stays consistent.",
      process:
        "I start with the same audit process to understand your product and get a feel for the language. If you don't already have voice and tone established, I'll factor that into the audit so we can build those guidelines based on what's already in your product. Once the standards are set and you're on board with them, I'll build the AI system to make it usable and sustainable by anyone on the team.",
      youGet: [
        "Voice and tone framework with real examples",
        "Terminology and taxonomy standards",
        "Reusable content patterns for common UI moments (empty states, errors, onboarding, confirmations)",
        "Governance model for who owns what and how it gets updated",
        "Walkthrough and hand off",
        "Content Standards AI Agent — a functional agent that anyone in the org can use to check or generate standards-aligned content without a content designer",
      ],
      caseStudy: { label: "Platform Apps Type System", href: "/portfolio/case-study/goal-types" },
      timeline: "6–10 weeks, part-time embedded in the team",
      pricing: "Starts at $18k",
      forWho:
        "Teams struggling with product content, help articles, or any body of content that needs consistency or standards.",
      notForWho:
        "Companies with established content standards in their style guide or design system.",
    },
  },
  {
    slug: "ai-content-evaluation",
    eyebrow: "Improve your AI outputs",
    title: "AI Content Design",
    summary:
      "I design what your AI features say and how they say it, so your users actually want to use them.",
    icon: Bot,
    accent: "#0891b2", // cyan — matches the linked Risk Agent case study
    detail: {
      solves:
        "You implemented AI features that technically work, but they aren't particularly useful. Users don't trust them, and they don't have any real effect on the number of support tickets you get.",
      process:
        "I'll define the goals of the AI feature you implemented, whether it's an automatic feature like a generated summary or an opt-in chatbot. I'll determine the best format, shape the persona and voice, and outline response patterns based on common scenarios.",
      youGet: [
        "Agent persona and voice specification",
        "Response patterns: confidence, uncertainty, refusal, escalation, error recovery, and additional edge cases",
        "Prompt and system-message content",
        "Knowledge architecture — what your AI draws from, what it's fenced away from, and how it stays current as your product evolves",
        "Evaluation rubric for content quality",
      ],
      caseStudy: { label: "Rovo Risk Agent", href: "/portfolio/case-study/risk-agent" },
      timeline: "4–8 weeks, or ongoing",
      pricing: "Starts at $8k",
      forWho:
        "Teams with AI chatbots and AI-powered features that need to yield a specific type of output.",
      notForWho:
        "Non-AI features or other situations where deeper content analysis and evaluation is required.",
    },
  },
  {
    slug: "onboarding-activation",
    eyebrow: "Make a better first impression",
    title: "Onboarding & Activation Flow",
    summary:
      "A new onboarding strategy — lifecycle emails, first-run screens, and empty states — built around your product's actual value.",
    icon: Rocket,
    accent: "#ca8a04", // yellow
    detail: {
      solves:
        "You're seeing plenty of sign-ups and activations, but users aren't sticking around. Usually it isn't actually the product but the first five minutes. If a user can't figure out how to use the product or imagine ways it fits into their workflow, they're less likely to continue using it.",
      process:
        "I'll audit the current onboarding experience, noting the likely mental state from the marketing and sign-up experiences. I'll note any gaps or opportunities, with hypotheses to explain drop-offs. I'll look through notification emails and in-product onboarding, and rewrite the full experience.",
      youGet: [
        "Current-state flow audit",
        "Rewritten end-to-end content",
        "Variant recommendations for testing",
        "Measurement plan",
      ],
      caseStudy: { label: "Opower Rate Coach Emails", href: "/portfolio/case-study/bls-emails" },
      timeline: "2–5 weeks",
      pricing: "Starts at $8k",
      forWho:
        "Teams whose products don't have an existing onboarding experience, or whose existing onboarding is fragmented.",
      notForWho:
        "Products where people aren't signing up in the first place, or it's an acquisition/marketing problem.",
    },
  },
  {
    slug: "content-design-retainer",
    eyebrow: "Get content support when you need it",
    title: "Content Design Retainer",
    summary:
      "I'll work with your teams for launches, features, and everything in between — for a fraction of a full-time hire.",
    icon: LifeBuoy,
    accent: "#16a34a", // green
    detail: {
      solves:
        "Your product is shipping new features every month, but no one's looking at the words. Product managers, designers, and engineers are doing their best to write the words for the experience, but they don't know if it's cohesive or consistent.",
      process:
        "I'll embed within your teams for a set number of hours each week in an ongoing partnership. I'll attend kick-offs, contribute to research, draft solutions with designers, and work with cross-functional collaborators to develop your product.",
      youGet: [
        "End-to-end UX writing for product surfaces",
        "Help article and tech writing support",
        "Information architecture",
        "Content modeling and taxonomy",
        "Naming explorations and suggestions",
        "Content advisement at kickoff",
        "Design partnership",
      ],
      timeline: "1–2 days per week. 1-month trial, then 3-month minimum engagement.",
      pricing: "$4,000/month for 1 day/week; $8,000/month for 2 days/week.",
      forWho:
        "Teams that want content support without the need or budget for a full-time content designer.",
      notForWho: "Teams that only want content support for a single project.",
    },
  },
];
