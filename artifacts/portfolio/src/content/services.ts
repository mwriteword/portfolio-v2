import { Stethoscope, Library, Bot, Rocket, LifeBuoy, type LucideIcon } from "lucide-react";

// Single source of truth for the service offerings. Used by the Writing landing
// page ("How I fix your product's content" cards, which read eyebrow/title/summary/
// icon) and the Services page (which additionally renders the full `detail`).
// The landing cards deep-link to /services#slug.

/** The short, structured case study shown in the modal behind the "Case study"
 *  tag. Mirrors the intro block on the full portfolio case studies: a meta rail
 *  (company/role/timeline/scope) beside a four-beat narrative. */
export interface CaseStudyDetail {
  /** Headline for this story, e.g. "One audit, more than 50 prioritized fixes". */
  title: string;
  company: string;
  role: string;
  timeline: string;
  scope: string;
  situation: string;
  problem: string;
  whatIDid: string;
  result: string;
}

export interface CaseStudy {
  label: string;
  /** No full craft case study yet — the modal is the whole story. */
  comingSoon?: boolean;
  /** Full craft case study on the portfolio side. When set, the modal footer
   *  links out to it; until then the modal stands alone. */
  href?: string;
  /** Content for the modal. When present, the tag opens the modal on click. */
  study?: CaseStudyDetail;
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
      caseStudy: {
        label: "Platform Apps Support Doc Audit",
        study: {
          title: "One audit, more than 50 prioritized fixes",
          company: "Atlassian",
          role: "Senior Content Designer",
          timeline: "6 weeks",
          scope: "60+ support documents",
          situation:
            "I joined as the first and only embedded content designer on a team with 12 product designers, 7 PMs, and 30+ engineers. The product had been scaling for a few years without someone keeping track of the words.",
          problem:
            "Two years of content debt had built up across every surface. Inconsistent terminology, jargon in microcopy, and generic error messages with no context on what went wrong. I had to get the lay of the land to find what was broken and make a case for fixing it.",
          whatIDid:
            "I ran a full audit across all product surfaces, meta experiences (onboarding, spotlights, temporary messages), and 60+ support documents, prioritizing each one by severity and effort. Then I launched into a support doc uplift program to work through the highest-priority content fixes.",
          result:
            "The audit surfaced 30+ text string fixes in the product, 6 larger UX/interaction issues, and ~20 signals for new content patterns. The support doc uplift program improved helpfulness scores by 18%.",
        },
      },
      timeline: "3–6 weeks depending on size and scope.",
      pricing: "Starts at $6,000.",
      forWho: "Teams that don't have or haven't had dedicated content support.",
      notForWho: "Teams with larger technical problems beyond the words.",
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
        "Walkthrough and handoff",
        "Content Standards AI Agent — a functional agent that anyone in the org can use to check or generate standards-aligned content without a content designer",
      ],
      caseStudy: {
        label: "Platform Apps Type System",
        href: "/portfolio/case-study/goal-types",
        study: {
          title: "Unlocking enterprise adoption with a naming foundation",
          company: "Atlassian",
          role: "Senior Content Designer",
          timeline: "~1.5 years",
          scope: "Goals app type system + foundation for Teams and Projects",
          situation:
            "Atlassian's platform apps—Goals, Teams, and Projects—had no shared framework for object types. Every layer of each app used the same name as the app itself, which was fine until the apps needed to support different kinds of objects to serve user needs.",
          problem:
            "Enterprise customers were requesting OKR support in the Goals app, but the object model couldn't accurately support a bundled Objective and Key Result relationship. Whatever was built for Goals had to be flexible enough for Teams, which had its own specific type needs, with more apps to follow.",
          whatIDid:
            "I built a new object type system across the platform, including a new dependent object type called a “Success measure” to mimic the relationship between Objectives and Key Results. I defined the naming patterns and hierarchy that resolved the model confusion, and established the foundation that Teams would use for its own type system.",
          result:
            "In the first month after launch, users created ~1,500 measures per day, and the enterprise clients we spoke with said they'd be able to move forward with adoption. The system laid the naming foundation for both Teams and Projects' own type systems.",
        },
      },
      timeline: "6–10 weeks, part-time embedded in the team",
      pricing: "Starts at $18k",
      forWho:
        "Teams struggling to maintain product content or help articles, or who need help scaling their existing content standards across the organization.",
      notForWho:
        "Teams that have established standards frameworks that are keeping the content aligned.",
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
      caseStudy: {
        label: "Rovo Risk Agent",
        href: "/portfolio/case-study/risk-agent",
        study: {
          title: "Full agentic workflow, built and evaluated in 3 hours",
          company: "Atlassian",
          role: "Solo builder",
          timeline: "3-hour session",
          scope: "Confluence automation workflow using Rovo and Atlassian Studio",
          situation:
            "The Goals and Projects apps had a “Risk” feature that let teams log risks—but that's about it. Descriptions only, no lifecycle or mitigation features. You couldn't even mark it as resolved or mitigated.",
          problem:
            "Most AI integrations at the time were adding chat or text summaries to just about any surface. I wanted to try extending an existing feature using AI and automations, rather than going through the roadmap process and building it ourselves.",
          whatIDid:
            "I RAG-trained an agent on 15 years of real, internal Atlassian risk documents to establish the right structure and content expectations. I then designed the output template for usability, surfacing the critical information first. Then I built the full automation workflow in Studio: analyze a comment, generate a structured Confluence page, and reply in thread with a link to the page.",
          result:
            "A working proof of concept with a live demo. The agent produces structured, actionable risk summaries from unstructured comments. The automation trigger had one unresolved bug at the end, but agent design, template IA, and evaluation rubric were complete.",
        },
      },
      timeline: "4–8 weeks, or ongoing",
      pricing: "Starts at $8k",
      forWho:
        "Teams with AI chatbots and AI-powered features that need to yield a specific type of output.",
      notForWho: "Teams experiencing deeper technical problems beyond AI outputs.",
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
      caseStudy: {
        label: "Opower Rate Coach Emails",
        href: "/portfolio/case-study/bls-emails",
        study: {
          title: "Emails that changed electricity use for over 1 million homes",
          company: "Oracle Utilities (Opower)",
          role: "UX Copywriter / Content Lead",
          timeline: "~6 months",
          scope: "Three-part email series piloted across five utility deployments",
          situation:
            "Utility customers were enrolled in Time-of-Use electricity plans that charged more during peak hours (usually from 4-8pm) and less the rest of the day. Utilities needed customers to shift their usage, but first their customers had to understand how their new rate plan actually worked.",
          problem:
            "Before we could motivate behavior change, we had to focus on time-of-use comprehension first. Customers needed to see their own data, understand what it meant, and build new behaviors over time. The content had to make a complex billing concept feel simple and personal.",
          whatIDid:
            "I wrote a three-part email series covering the introduction, weekly update, and monthly recap, using progressive data disclosure and light gamification to build understanding and reinforce behavior over time. Each email led with the most actionable insight first, anchored to the customer's own usage.",
          result:
            "The program drove a 1-2% peak load shift across all five pilot deployments. At one utility, digital engagement increased by 60% and the emails saw 3x the opens and 9x the clickthroughs compared to industry benchmarks. Recipients were 17% more likely to recall the program and 16% more likely to correctly identify their peak hours.",
        },
      },
      timeline: "2–5 weeks",
      pricing: "Starts at $8k",
      forWho:
        "Teams whose products don't have an existing onboarding experience, or whose existing onboarding is fragmented.",
      notForWho: "Teams who are having problems with initial signups or marketing/acquisition.",
    },
  },
  {
    slug: "content-design-retainer",
    eyebrow: "Get embedded content support",
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
      notForWho: "Teams whose products don't rely on clear content.",
    },
  },
];
