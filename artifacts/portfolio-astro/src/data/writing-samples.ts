import type { Sample } from "../components/WorkSamples.astro";

// Shared writing-sample data, used by the Portfolio page (filtered grid) and the
// Additional Writing Samples page. `filters` drives the Portfolio filter bar.
//
// Two kinds of tile:
//   - discrete samples (one artifact) expand inline into a panel;
//   - "collection" samples (a body of work) set `href` and link out to a
//     deliverable-focused detail page (the writingSamples MDX collection).

export const writingFilters = [
  "Copywriting",
  "Content Writing",
  "SEO",
  "Editing",
  "Email",
  "Social Media",
  "Banners",
];

export const copywritingSamples: Sample[] = [
  {
    id: "rate-coach",
    title: "Rate Coach email program",
    category: "LIFECYCLE EMAIL • UTILITIES",
    preview: "3x opens and 9x CTR vs industry benchmarks for 800K households.",
    image: "/images/work/rate-coach-thumb.png",
    full: "/images/opower/intro-email.png",
    filters: ["Email", "Content Writing"],
    bodyHtml: `
      <p>In my full-time stint at Opower, we developed a brand new behavior change product to support many utilities changing to time-of-use rate models, where energy is more expensive at specific times of day. This email series was meant to guide users through this transition by explaining how time-of-use rates work and encouraging them to shift their energy use outside of peak-pricing hours.</p>
      <p>In terms of stakes, customers spend about 8 minutes per <em>year</em> thinking about their utility company and that's what we were up against. When we launched the program, we saw the following results:</p>
      <ul>
        <li>14 MW peak demand reduction across nearly 1 million homes in a mid-west utility.</li>
        <li>35,000 customers in the initial pilot with Exelon Maryland (BGE, Pepco, and Delmarva).</li>
        <li>+60% digital engagement at one utility.</li>
        <li>3x the opens and 9x the clickthrough rates for one utility with over 800,000 households.</li>
        <li>Customers were 17% more likely to recall the program against control.</li>
        <li>Customers were 16% more likely to identify peak-pricing hours against control.</li>
        <li>+8% customer satisfaction versus control, +5% overall.</li>
      </ul>
      <p><a href="/portfolio/case-study/bls-emails">Read the full email content and case study →</a></p>`,
  },
  {
    id: "twc-email",
    title: "Teamwork Collection Onboarding email",
    category: "ENGAGEMENT EMAIL • B2B SAAS",
    preview: "Email driving app activations to support a bundle launch.",
    image: "/images/work/twc-email-body.png",
    full: "/images/work/twc-full-email.png",
    imageTop: true,
    filters: ["Email", "Content Writing"],
    bodyHtml: `
      <p>One of my bigger projects at Atlassian was the full onboarding experience for the Teamwork Collection launch, a new bundle of Atlassian's most popular apps. Our goal with the email wasn't to upsell users on the bundle — these were sent to users whose leadership already <em>bought</em> the bundle. Our goal with the onboarding was to actually get users to activate their seat in the app and drive growth through monthly-active users across each app.</p>
      <p>I focused the content to read as straightforwardly as possible, almost like a notification email rather than a growth lever. The subject line and body content are intentionally short and direct; if this email got dismissed as marketing spam, we'd be dead in the water. Rather than load up the email with content, I wanted to give them the information straight to get them to click and learn more in the rest of the onboarding.</p>
      <p><a href="/portfolio/case-study/twc">See the full onboarding experience and case study here.</a></p>`,
  },
  {
    id: "onboarding-video",
    title: "Teamwork Collection video",
    category: "VIDEO SCRIPT • B2B SaaS",
    preview: "Scripted video supporting the launch of a new Atlassian bundle.",
    image: "/images/work/twc-video-thumb.jpg",
    video: "/videos/twc-onboarding-video.mp4",
    filters: ["Content Writing"],
    bodyHtml: `<p>This was just one piece of a full onboarding experience for the new Teamwork Collection bundle at Atlassian. I was the Content Designer on this project, but I worked with the brand and creative team on this hero video. I wrote the original script to align with the rest of the onboarding experience (while making it flexible enough to work in other contexts). <a href="/portfolio/case-study/twc">You can read the full case study here</a>.</p>`,
  },
  {
    // Collection → links out to the deliverable-focused detail page.
    id: "quinstreet",
    title: "QuinStreet Samples",
    category: "COPYWRITING • AGENCY",
    preview: "Banners, emails, social posts, and landing pages across many verticals.",
    image: "/images/logos/quinstreet.svg",
    thumbnailContain: true,
    href: "/portfolio/writing/quinstreet",
    filters: ["Copywriting", "Banners", "Social Media", "Email"],
  },
];

export const longformSamples: Sample[] = [
  {
    id: "solitaire",
    title: "An analytical essay on Solitaire",
    category: "EDITORIAL CONTENT • UX",
    preview: "Written and self-edited for UX Collective's Bootcamp publication.",
    image: "/images/work/solitaire.jpg",
    filters: ["Content Writing", "Editing"],
    bodyHtml: `
      <p>In the mid-to-late 2010s, I drove 30 minutes in traffic to a train station that's normally 10 minutes away, then rode a train for an hour just to get to my office. And at the end of the day, I did the same thing in reverse. I played a lot of <em>Microsoft Solitaire Collection</em> on my phone during those long train rides, so I (finally) wrote about my observations of two games in that collection, and the piece was published in UX Collective's Bootcamp publication.</p>
      <p><a href="https://medium.com/design-bootcamp/the-solitaire-you-remember-is-not-a-good-game-00cf1392e639?sharedUserId=vjtlaq" target="_blank" rel="noopener noreferrer">Read the piece on Medium →</a></p>`,
  },
  {
    id: "energy-tips",
    title: "Source-verified energy efficiency tips",
    category: "RESEARCH & CONTENT • REGULATED ENERGY",
    preview: "300+ tips with all claims sourced to DOE standards.",
    image: "/images/work/tip-library-thumb.png",
    full: "/images/work/tip-sample-full.png",
    filters: ["Content Writing", "Editing"],
    bodyHtml: `
      <p>In 2024, a former colleague at Opower asked if I could help review and refresh tip content used by more than 175 utility partners worldwide. This refresh is done every few years to ensure that tips are still accurate and adequately sourced, since government energy guidance and standards can change year-to-year. I verified sources for every claim, updating them to match new guidance or rewriting claims entirely if they no longer had a live source. If your utility has energy-saving tips on their website and they look like the one in the thumbnail, then you can see my handiwork for yourself. Here's a sample of one, in the event your utility is not an Opower partner.</p>
      <p><button type="button" data-zoomable data-src="/images/work/tip-sample-full.png" data-alt="Full-page energy efficiency tip sample" class="font-medium text-primary hover:underline">View the full-page sample →</button></p>`,
  },
  {
    // Collection → links out to the deliverable-focused detail page.
    id: "course-hero",
    title: "Course Hero — Textbook Solutions",
    category: "SEO CONTENT • EDTECH",
    preview: "25+ SEO textbook descriptions written to drive organic traffic.",
    image: "/images/coursehero/screenshot-1.png",
    href: "/portfolio/writing/course-hero",
    filters: ["SEO", "Content Writing"],
  },
];

/** Combined set for the Portfolio page's single filtered grid. */
export const writingSamples: Sample[] = [...copywritingSamples, ...longformSamples];
