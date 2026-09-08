// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// Canonical production origin. Every page's <link rel="canonical"> and the
// generated sitemap are derived from this, so per-route SEO tags are unique
// and correct even before the Vercel cutover.
export default defineConfig({
  site: "https://wordsbyvern.com",
  // Preserve the old URL structure (from the SPA's router) so existing inbound
  // links and search results keep working after the cutover.
  redirects: {
    "/writing": "/",
    "/copy-work": "/portfolio#writing-samples",
    "/services/additional-writing-samples": "/portfolio#writing-samples",
    "/case-study-1": "/portfolio/case-study/goal-types",
    "/case-study-onboarding": "/portfolio/case-study/twc",
    "/case-study-agentic": "/portfolio/case-study/risk-agent",
    "/case-study-2": "/portfolio/case-study/bls-emails",
    "/case-study-coursehero": "/portfolio/writing/course-hero",
    "/case-study-quinstreet": "/portfolio/writing/quinstreet",
    "/case-study-3": "/portfolio/writing/course-hero",
    "/case-study-4": "/portfolio/writing/quinstreet",
    "/case-study-early-works": "/portfolio/writing/course-hero",
    // Course Hero + QuinStreet were briefly modeled as case studies; they are now
    // deliverable-focused writing samples.
    "/portfolio/case-study/textbook-solutions": "/portfolio/writing/course-hero",
    "/portfolio/case-study/copywriting-samples": "/portfolio/writing/quinstreet",
  },
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
