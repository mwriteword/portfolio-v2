import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// The SEO/AEO/GEO content library. Each article is one Markdown file in
// src/content/resources/. The schema encodes the fields the article template
// needs to emit strong structured data and answer-first content:
//   - `answer`   — a tight, quotable definition rendered as the highlighted lead.
//                  This is what AI answer engines extract, so keep it self-contained.
//   - `faqs`     — powers both the visible FAQ section and FAQPage JSON-LD.
//   - dates      — datePublished + optional dateModified ("Updated …" freshness).
const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    /** Meta description + hub-card subtitle. ~150–160 chars. */
    description: z.string(),
    /** Answer-first lead: 2–3 self-contained sentences an AI can quote verbatim. */
    answer: z.string(),
    datePublished: z.coerce.date(),
    /** Bump when you genuinely refresh the piece — revives evergreen content. */
    dateModified: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Optional slug of a related service (see content/services.ts) for the CTA. */
    relatedService: z.string().optional(),
    /** Q&A pairs → visible FAQ block + FAQPage structured data. */
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    /** Per-article social/AI card image; falls back to the site default. */
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Portfolio case studies. Each study is one MDX file in src/content/case-studies/.
// The schema captures the structured metadata the template + Portfolio/Home cards
// pull from (tagline, role, company, timeline, collaborators, skills, accent,
// summary, teaser). The MDX BODY carries the narrative — authored with `##`
// headings (which auto-populate the in-page section nav) plus the case-study
// block components (Section, Tldr, Term, Figure, Gallery, StatGrid, ImageCarousel).
const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/case-studies" }),
  schema: z.object({
    /** Case study title — H1, breadcrumb, and card heading. */
    title: z.string(),
    /** One-sentence tagline shown under the title. */
    tagline: z.string(),
    /** SEO meta description; falls back to `summary` when omitted. */
    description: z.string().optional(),
    /** Meta sidebar — "Role" (title and role). */
    role: z.string(),
    /** Meta sidebar — "Company" (company name & product domain). */
    company: z.string(),
    /** Meta sidebar — "Timeline". */
    timeline: z.string(),
    /** Meta sidebar — "Collaborators". */
    collaborators: z.array(z.string()).default([]),
    /** Meta sidebar — "In this case study" (skills involved); also card tags. */
    skills: z.array(z.string()).default([]),
    /** Categorical accent hex (breadcrumb, card icon, section rules). */
    accent: z.string().default("#2563eb"),
    /** High-level summary (1–3 sentences) for the intro + Portfolio/Home cards. */
    summary: z.string(),
    /** In-page teaser image of the final product (shown at the top of the study). */
    teaserImage: z.string().optional(),
    /** Card/preview thumbnail for the Portfolio list + Home featured grid.
     *  Falls back to `teaserImage` when omitted. Use a landscape (~16:10) crop. */
    thumbnail: z.string().optional(),
    /** Ordering in the Portfolio list / Home featured grid (lower = first). */
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

// "Case study lite" — deliverable-focused writing-sample pages for quantity-heavy
// work (agency copywriting collections, SEO content sets) that doesn't fit the
// inline sample panel. Lean schema (no process narrative / meta sidebar / section
// nav); the MDX body is mostly galleries built from the shared case-study blocks.
const writingSamples = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/writing-samples" }),
  schema: z.object({
    /** Sample title — H1 + card heading. */
    title: z.string(),
    /** Category kicker, e.g. "Copywriting" or "SEO Content". */
    eyebrow: z.string(),
    /** Client / company the work was for. */
    client: z.string(),
    /** Optional role + date shown in the compact meta line. */
    role: z.string().optional(),
    date: z.string().optional(),
    /** Accent hex for the eyebrow. */
    accent: z.string().default("#4f46e5"),
    /** One-line summary for the page intro + Portfolio card. */
    summary: z.string(),
    /** Card thumbnail (also the tile image on the Portfolio grid). */
    thumbnail: z.string().optional(),
    /** Filter categories for the Portfolio filter bar. */
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { resources, caseStudies, writingSamples };
