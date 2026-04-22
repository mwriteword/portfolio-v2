import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { CardCarousel } from "../components/CardCarousel";
import { SectionHeading } from "../components/SectionHeading";
import { TableOfContents, useTocActiveSection, TocItem } from "../components/TableOfContents";

/* ── Images ── */
const twcBundle             = "/images/atlassian/onboarding/twc-bundle.png";
const newUserModal          = "/images/atlassian/onboarding/newusermodal.png";
const existingUserModal     = "/images/atlassian/onboarding/existingusermodal.png";
const trelloExample         = "/images/atlassian/onboarding/trello-example.png";
const spotlight1            = "/images/atlassian/onboarding/spotlight-1.png";
const spotlight2            = "/images/atlassian/onboarding/spotlight-2.png";
const spotlight3            = "/images/atlassian/onboarding/spotlight-3.png";
const homeCarouselHighlight = "/images/atlassian/onboarding/home-carousel-highlight.png";

/* ── Modal variants ── */
const modalVariants = [
  {
    id: 1,
    image: "/images/atlassian/onboarding/modal-v1.png",
    bullets: [
      <><strong>New</strong> Atlassian users</>,
      <>Access to Jira, Confluence, and Loom</>,
      <>Access to Goals and Projects</>,
    ],
  },
  {
    id: 2,
    image: "/images/atlassian/onboarding/modal-v2.png",
    bullets: [
      <><strong>Existing</strong> Atlassian users/admins</>,
      <>Currently has Jira and Confluence, gaining access to Loom</>,
      <>Access to Goals and Projects</>,
    ],
  },
  {
    id: 3,
    image: "/images/atlassian/onboarding/modal-v3.png",
    bullets: [
      <><strong>Existing</strong> Atlassian users/admins</>,
      <>Currently has one of the TWC apps and gaining access to the rest</>,
      <>Works whether they have Goals and Projects access or not</>,
    ],
  },
  {
    id: 4,
    image: "/images/atlassian/onboarding/modal-v4.png",
    bullets: [
      <><strong>New</strong> Atlassian users</>,
      <>Access to Jira, Confluence, and Loom</>,
      <><strong>No</strong> access to Goals and Projects</>,
    ],
  },
  {
    id: 5,
    image: "/images/atlassian/onboarding/modal-v5.png",
    bullets: [
      <><strong>Existing</strong> Atlassian users/admins</>,
      <>Currently has Jira and Confluence, gaining access to Loom</>,
      <><strong>No</strong> access to Goals and Projects</>,
    ],
  },
  {
    id: 6,
    image: "/images/atlassian/onboarding/modal-v6.png",
    bullets: [
      <><strong>Existing</strong> Atlassian users/admins</>,
      <>Currently has one of the TWC apps and gaining access to one other app (2/3)</>,
      <>Works whether they have Goals and Projects access or not</>,
    ],
  },
];

/* ── TOC ── */
const tocItems: TocItem[] = [
  { id: "section-highlights",  label: "Project highlights" },
  { id: "section-background",  label: "Background & context" },
  { id: "section-strategy",    label: "End user strategy" },
  { id: "section-modal",       label: "Modal overwhelming" },
  { id: "section-spotlights",  label: "HubSpot(lights)" },
  { id: "section-cards",       label: "The card deck" },
  { id: "section-video",       label: "Onboarding video" },
];

/* ── Shared image component ── */
function CaseImage({ src, alt, caption, wide }: { src: string; alt: string; caption?: string; wide?: boolean }) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        className={`rounded-lg ${wide ? "w-full" : "max-w-full"}`}
        onError={(e) => { (e.target as HTMLImageElement).closest("figure")?.style.setProperty("display", "none"); }}
      />
      {caption && (
        <figcaption className="mt-2 text-xs text-[#888888] leading-relaxed">{caption}</figcaption>
      )}
    </figure>
  );
}

export default function CaseStudyOnboarding() {
  const activeId = useTocActiveSection(tocItems);
  const [modalIdx, setModalIdx] = useState(0);
  const modalTotal = modalVariants.length;

  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <TableOfContents items={tocItems} activeId={activeId} />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        <Link href="/" className="flex items-center gap-2 text-[#f59e0b] hover:text-[#fbbf24] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-[#ffffff] mb-8 sm:mb-12">
          Onboarding & Content Strategy
        </h1>

        {/* ── Intro ── */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-16">
          <div className="flex-shrink-0 sm:w-52">
            <div className="space-y-4">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Role</p>
                <p className="text-[#ffffff] text-sm">Content Design Lead</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Company</p>
                <p className="text-[#ffffff] text-sm">Atlassian</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Timeline</p>
                <p className="text-[#ffffff] text-sm">Winter 2024 – Fall 2025</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Collaborators</p>
                <p className="text-[#ffffff] text-sm">Product Design, Content Designers, Design Leadership</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Deliverables</p>
                <p className="text-[#ffffff] text-sm">Content strategy, in-product flows, onboarding hero video script</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              At the peak of my time managing 4 separate product areas as the sole content designer on the team, I was unexpectedly made the content lead on a Growth project. This project was a joint effort between Atlassian Home (one of my 4 product areas) and the Growth team, and I was originally meant to be supporting a content designer from Growth. But for some reason (which I never fully learned), the Growth content designer was moved to another project and I was asked to take over and lead content design for the onboarding.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              It's never easy taking over a project mid-stream, but it did give me a chance to build a fresh content strategy, which is exactly what this project needed.
            </p>
          </div>
        </div>

        {/* ── Project highlights ── */}
        <div id="section-highlights" className="scroll-mt-12 mb-16 sm:mb-20">
          <SectionHeading>Project highlights</SectionHeading>

          {/* Figma embed */}
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden mb-6" style={{ height: "480px" }}>
            <iframe
              className="w-full h-full"
              src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/RxIhhlc92dWjGi3PEfp3R9/TWC-Onboarding?node-id=2-381399&t=AYPjoTBWV5f3ALHK-1"
              allowFullScreen
              title="TWC Onboarding — Figma prototype"
            />
          </div>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            To support the launch of Teamwork Collection (TWC), a new app bundle consisting of Jira, Confluence, and Loom, we worked with designers from Growth to deliver an onboarding experience in Atlassian Home.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">I led and delivered all the content for this project, including:</p>
          <ul className="space-y-2 mb-6">
            {[
              "End user content strategy, contributed back to the overall content strategy for TWC.",
              "Email content to notify users of app access.",
              "UI copy for the entire flows.",
              "Content variants across email and modal content (20+ modal variants condensed to 6 to alleviate engineering load).",
              "Onboarding spotlights on Home, plus app-specific onboarding for Goals, Projects, and Teams apps (other platform apps I was responsible for).",
              "Script for onboarding hero video.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-[#ffffff]">
                <span className="text-[#888888] mt-1.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Background and context ── */}
        <div id="section-background" className="scroll-mt-12 mb-16 sm:mb-20">
          <SectionHeading>Background and context</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            In an attempt to alleviate longstanding confusion around which Atlassian apps should be used for what purpose and when, the product organization began grouping apps into bundles called "collections." Teamwork Collection was the first one to be announced, consisting of Atlassian's core collaboration apps: Jira, Confluence, and Loom.
          </p>

          <div className="max-w-[620px] mx-auto">
            <CaseImage
              src={twcBundle}
              alt="Atlassian app ecosystem diagram showing how apps are grouped by team type"
              caption="Unfortunately none of the versions I could find of this visual actually spell out the app name. But maybe that's the point because the visible labels more directly answer the question, 'What do I use these for?'"
              wide
            />
          </div>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            For Teamwork Collection's launch, the central growth team was tasked with the onboarding experience which they wanted to live in Atlassian Home since that's what was squarely positioned as the "hub" app between all Atlassian apps. Jira, Confluence, and Loom all had their own individual onboarding experiences, and while a consolidated, TWC onboarding was planned, the initial onboarding would be a general intro to each app through Atlassian Home.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            There were meant to be 4 of us working on this: one content + product design duo from Home and one duo from Growth, with the latter leading the design work. But a couple months into the project, design leadership asked me to take over as the content lead and work on content strategy and delivery on my own.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff]">
            I never got the full story about what happened, nor did I really ask or seek it out. All my manager told me was that the content just wasn't getting to where we needed it to be and so they wanted me to take over. If I had to guess, it was because a lot of what the Growth content designer had written thus far leaned heavily into marketing content, which made sense because the overarching content strategy for TWC was predominantly sales-focused. And that was ultimately the problem: the existing content strategy was written for <em>buyers</em>, not <em>end users</em>. We needed to focus the onboarding away from the marketing and actually deliver content that's relevant to the users getting these apps for the first time.
          </p>
        </div>

        {/* ── Strategy ── */}
        <div id="section-strategy" className="scroll-mt-12 mb-16 sm:mb-20">
          <SectionHeading>The end(user)game strategy</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            The first thing I did when I took over was write a new content strategy for this particular project. If the other content designer's content was primarily marketing driven, it makes sense given that the TWC content strategy was written for buyers, admins, and general decision makers. After all, TWC was mostly a pricing and packaging change so there wasn't much need for an end user onboarding strategy since access to apps was the only thing really changing.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            One thing I advocated for in particular was avoiding mention of "Teamwork Collection" in both the onboarding and general end user experience. The latter was less important, but for users gaining access to new apps, the name of the bundle that someone several layers of elevation removed from them bought would at best be trivial and at worst confusing. The actual end users, or those who have no say in the buying decision at all, don't need to understand what exactly TWC is — only that they have access to new Atlassian tools.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-8">
            I centered the content strategy around the "new tool access" message, with two key audience segments:
          </p>

          {/* Two-column audience segments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Net new users */}
            <div className="bg-[#242424] rounded-xl p-6">
              <p className="text-white font-semibold text-base mb-1">Net new Atlassian users</p>
              <p className="text-[#aaaaaa] text-sm mb-4">No current Atlassian access, getting access to all TWC + platform apps.</p>
              <ul className="space-y-3">
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Assumptions</span>
                  <p className="mt-0.5">A new employee or an existing employee gaining access to Atlassian for the first time.</p>
                </li>
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Psychographics</span>
                  <p className="mt-0.5">Overwhelmed, trying to figure out new tooling and team processes.</p>
                </li>
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Primary goal</span>
                  <p className="mt-0.5">Trying to get set up with TWC apps (and all other software tools they will need) as quickly as possible.</p>
                </li>
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Target message</span>
                  <p className="mt-0.5">Clear tool definitions to get them up and running faster.</p>
                </li>
              </ul>
            </div>

            {/* Existing users */}
            <div className="bg-[#242424] rounded-xl p-6">
              <p className="text-white font-semibold text-base mb-1">Existing Atlassian users</p>
              <p className="text-[#aaaaaa] text-sm mb-4">Currently uses at least one Atlassian app, and is now gaining all/remaining TWC apps.</p>
              <ul className="space-y-3">
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Assumptions</span>
                  <p className="mt-0.5">A regular user of an existing app, familiar with interactions and standards.</p>
                </li>
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Psychographics</span>
                  <p className="mt-0.5">Annoyed, resistant to change/new tooling, may see onboarding as a nuisance.</p>
                </li>
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Primary goal</span>
                  <p className="mt-0.5">Dismiss any intrusive messages and get on with their work.</p>
                </li>
                <li className="text-sm text-[#ffffff]">
                  <span className="text-[#888888] font-medium uppercase tracking-wide text-xs">Target message</span>
                  <p className="mt-0.5">Their current tools work better with the new ones.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Modal overwhelming ── */}
        <div id="section-modal" className="scroll-mt-12 mb-16 sm:mb-20">
          <SectionHeading>Modal overwhelming</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            One of the key parts of the onboarding experience was the modal, which would display either the first time a user lands in Home after gaining TWC access or after clicking the link in the email. This would potentially be their first in-app experience with their new apps and we wanted to target the modal content to the user experience as much as possible. So whether they were a net new user or an existing Atlassian user, we wanted the modal to reflect their circumstance as much as we could. But to actually target the content to the exact granularity we wanted would mean over 20 modal variants — to which the lead engineer said, "No."
          </p>

          {/* Two example modals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <CaseImage
              src={newUserModal}
              alt="New user modal"
              caption="The new user modal focuses on aspirational language with scannable, single-line definitions of each core app."
            />
            <CaseImage
              src={existingUserModal}
              alt="Existing user modal"
              caption="One of the existing user modal variants which targeted ~80% of users in this segment."
            />
          </div>

          <p className="text-base leading-relaxed text-[#ffffff] mb-8">
            Instead, I made it a content problem and asked, "How can I consolidate some of these user circumstances into similar groupings with slightly more generalized content?" The variants included which apps a user was getting access to, whether they had the additional platform apps enabled, and if they were in the 80% of existing users getting TWC at launch who already had Jira and Confluence. Through ✨content magic✨ (which was actually just painstaking stress-testing and plugging in minute changes across variants), I was able to get the number of variants down to 6.
          </p>

          {/* Modal variants — carousel */}
          <div className="mb-10">
            {/* Slide */}
            <div key={modalIdx} className="flex gap-5 items-start">
              {/* Numbered badge */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold mt-1">
                {modalVariants[modalIdx].id}
              </div>
              {/* Image + bullets */}
              <div className="flex flex-col sm:flex-row gap-6 flex-1">
                <div className="sm:w-[45%] flex-shrink-0">
                  <img
                    src={modalVariants[modalIdx].image}
                    alt={`Modal variant ${modalVariants[modalIdx].id}`}
                    className="w-full rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                  <div className="w-full aspect-video bg-[#3a3a3a] rounded-lg items-center justify-center hidden">
                    <span className="text-[#666666] text-sm">Image coming soon</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-2 mt-1">
                  {modalVariants[modalIdx].bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-base leading-relaxed text-[#ffffff]">
                      <span className="text-[#888888] shrink-0 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Controls: prev — numbered pills — next */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#3a3a3a]">
              <button
                onClick={() => setModalIdx((i) => (i - 1 + modalTotal) % modalTotal)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3a3a3a] text-[#888888] hover:bg-[#4a4a4a] hover:text-white transition-colors"
                aria-label="Previous variant"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {modalVariants.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIdx(i)}
                    className={`w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                      i === modalIdx
                        ? "bg-[#3b82f6] text-white"
                        : "bg-[#3a3a3a] text-[#888888] hover:bg-[#4a4a4a] hover:text-white"
                    }`}
                    aria-label={`Variant ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setModalIdx((i) => (i + 1) % modalTotal)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3a3a3a] text-[#888888] hover:bg-[#4a4a4a] hover:text-white transition-colors"
                aria-label="Next variant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pattern note + Trello example */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <p className="text-base leading-relaxed text-[#ffffff]">
                Our work on this modal also established a new pattern for spotlight modals, replacing{" "}
                <a
                  href="https://atlassian.design/components/onboarding/benefits-modal/examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
                >
                  the old one
                </a>{" "}
                in the design system with this 2-column format with more options for scalability. While my two product design counterparts created the overall design spec and guidelines (which are still internal only), I wrote the guidance for content on the modal, including character counts, content suggestions, and do's/don'ts.
              </p>
            </div>
            <div className="sm:w-[40%] flex-shrink-0">
              <CaseImage
                src={trelloExample}
                alt="Trello example showing the new modal pattern's scalability"
                caption="I found this Trello example in the wild, which incidentally does a great job showing the pattern's scalability with its expandable bullet sections and individual CTAs."
              />
            </div>
          </div>
        </div>

        {/* ── HubSpot(lights) ── */}
        <div id="section-spotlights" className="scroll-mt-12 mb-16 sm:mb-20">
          <SectionHeading>HubSpot(lights)</SectionHeading>

          {/* Three spotlight screenshots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <CaseImage src={spotlight1} alt="Atlassian Home onboarding spotlight — step 1" />
            <CaseImage src={spotlight2} alt="Atlassian Home onboarding spotlight — step 2" />
            <CaseImage src={spotlight3} alt="Atlassian Home onboarding spotlight — step 3" />
          </div>

          <p className="text-base leading-relaxed text-[#ffffff]">
            With the spotlights, we wanted them to be fairly straightforward without treading the same ground as the modal before it. Since it's onboarding for a bundle of apps as well, the spotlights served to orient the user on the core purpose of Atlassian Home, plus the platform components that they would be able to access from any app. The second spotlight in particular highlights the primary way users can navigate between the apps they just heard about in the modal and any other Atlassian apps they have access to.
          </p>
        </div>

        {/* ── The deck of onboarding cards ── */}
        <div id="section-cards" className="scroll-mt-12 mb-16 sm:mb-20">
          <SectionHeading>The deck of onboarding cards</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Another prominent feature of the onboarding was a series of cards outlining individual app/experience onboarding and tasks they could complete as part of exploring their new apps:
          </p>

          <div className="max-w-4xl mx-auto">
            <CaseImage
              src={homeCarouselHighlight}
              alt="Atlassian Home showing the Getting started card carousel highlighted"
              wide
            />
          </div>

          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            In order to align with the aspect of "clear tool definitions", the bolded headline of each card needed to explain the core action/function of an app in exactly one line. I landed on the format of <em>[verb] [object] with [app]</em> plus a short body to describe the core benefit/elaborate on the primary action of the app.
          </p>

          {/* Interactive card preview */}
          <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-4">
            Interactive preview
          </p>
          <CardCarousel />
        </div>

        {/* ── Bonus round: the onboarding video script ── */}
        <div id="section-video" className="scroll-mt-12 mb-16 sm:mb-20">
          <SectionHeading>Bonus round: the onboarding video script</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            You might've noticed in the Home screens above that one of the onboarding cards mentions a video. The thought, in our early planning, was that we would plug in whatever standard, "What is Teamwork Collection?" type video to help users understand. But the one the brand team sent, like the overall content strategy, was largely marketing with little to no value for actual end users:
          </p>

          {/* YouTube embed */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/DdyYpu1-_fs"
                title="Teamwork Collection marketing video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            For the onboarding, we wanted something closer to a demo that shows <em>why</em> these apps are all better together. While brand and creative would be creating the video itself, I was tasked with writing the script to best show off each app, plus platform apps and Rovo (Atlassian's AI solution) — all in under 2 minutes.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            Unfortunately, the video was not published publicly outside of the onboarding, nor do I have any of the script drafts to show my work here. What I can say is that the video gives specific actions associated with an app and then shows how a person or team would move into the next app. My closest approximation to the workflow shown in the video:
          </p>

          <ol className="space-y-3 mb-6">
            {[
              "A person sets up their team in the Teams app and invites everyone to join.",
              "The team then moves to Confluence, where they have a brainstorm session on a Whiteboard.",
              "Loom's AI assistant records the session, automatically generating a Confluence page with the recording embedded, meeting notes, and action items.",
              "From the ideas on the whiteboard, the team can create tickets in Jira to help track their work.",
              "Once they've organized all their tasks in Jira, they can connect them to Projects and Goals to collect all the relevant links and share weekly regular updates.",
              <>It ends with a cheeky, <em>"And Rovo connects all of these things together. If you're ready to get started, start a new chat with Rovo and ask, 'What's next?'"</em></>,
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-[#ffffff]">
                <span className="text-[#3b82f6] font-semibold shrink-0 w-5 text-right">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>

          <p className="text-base leading-relaxed text-[#ffffff]">
            I wrote several drafts and iterations based on feedback, partnering with both the lead TWC content designer for feedback and a copywriter from the creative/brand team to align with Atlassian's brand voice. In all honesty, the above approximation might be from an earlier version, but the core concept and flow remains valid and should be enough to illustrate the difference between the script I wrote and the marketing video embedded above.
          </p>
        </div>
      </div>
    </main>
  );
}
