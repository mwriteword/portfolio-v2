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

export const collections = { resources };
