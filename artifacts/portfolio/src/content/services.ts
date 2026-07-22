import { Stethoscope, Library, Bot, Rocket, LifeBuoy, type LucideIcon } from "lucide-react";

// Single source of truth for the five service offerings. Used by the Writing
// landing page ("How I fix your product's content" cards) and the Services page
// (anchored detail sections). The landing cards deep-link to /writing/services#slug.
export interface Service {
  /** Anchor id on the Services page + URL fragment used by home-page cards. */
  slug: string;
  /** Benefit-oriented kicker, e.g. "Diagnose the problem". */
  eyebrow: string;
  /** Service name. */
  title: string;
  /** Short description shown on the home cards + Services page intro. */
  summary: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    slug: "content-experience-audit",
    eyebrow: "Diagnose the problem",
    title: "Content Experience Audit",
    summary:
      "A comprehensive audit of your product's words to find where you're losing users. I assess the current state, score the problems, and map them to the metrics you already track.",
    icon: Stethoscope,
  },
  {
    slug: "content-standards-systems",
    eyebrow: "Build rules to fix the problem",
    title: "Content Standards & Systems",
    summary:
      "One source of truth for your voice and tone, vocabulary, and message patterns — so your team can keep building without a dedicated writer in the room.",
    icon: Library,
  },
  {
    slug: "ai-content-evaluation",
    eyebrow: "Improve your AI outputs",
    title: "AI Content Evaluation",
    summary:
      "I take your AI feature's output and improve it so users actually trust it — designing what it says, how it says it, and what it does when it's wrong or unsure.",
    icon: Bot,
  },
  {
    slug: "onboarding-activation",
    eyebrow: "Make a better first impression",
    title: "Onboarding & Activation Flow Rewrite",
    summary:
      "People signing up but not sticking around? I'll build a new onboarding flow — from lifecycle emails to first-run screens and empty states — all built around your product's value.",
    icon: Rocket,
  },
  {
    slug: "content-design-retainer",
    eyebrow: "Get content support when you need it",
    title: "Content Design Retainer",
    summary:
      "Just need someone to make sure the words are good? I'll work with your team for launches, features, and everything in between — only when you need it.",
    icon: LifeBuoy,
  },
];
