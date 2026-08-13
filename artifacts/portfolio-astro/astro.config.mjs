// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
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
    "/copy-work": "/services/additional-writing-samples",
    "/case-study-1": "/portfolio/case-study/goal-types",
    "/case-study-onboarding": "/portfolio/case-study/twc",
    "/case-study-agentic": "/portfolio/case-study/risk-agent",
    "/case-study-2": "/portfolio/case-study/bls-emails",
    "/case-study-coursehero": "/portfolio/case-study/textbook-solutions",
    "/case-study-quinstreet": "/portfolio/case-study/copywriting-samples",
    "/case-study-3": "/portfolio/case-study/textbook-solutions",
    "/case-study-4": "/portfolio/case-study/copywriting-samples",
    "/case-study-early-works": "/portfolio/case-study/textbook-solutions",
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
