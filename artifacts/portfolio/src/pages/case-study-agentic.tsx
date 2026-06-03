import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { SectionHeading } from "../components/SectionHeading";
import { TableOfContents, useTocActiveSection, TocItem } from "../components/TableOfContents";

/* ── Images ── */
const riskFeature = "/images/atlassian/agentic/risk-feature.png";

/* ── TOC ── */
const tocItems: TocItem[] = [
  { id: "section-demo", label: "Workflow demo" },
  { id: "section-context", label: "Context" },
  { id: "section-process", label: "Process" },
  { id: "section-result", label: "Result" },
];

/* ── Inline link ── */
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#06b6d4] hover:text-[#22d3ee] transition-colors underline underline-offset-2"
    >
      {children}
    </a>
  );
}

/* ── Image with "coming soon" fallback (content still in progress) ── */
function CaseImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-6">
      <div className="relative w-full overflow-hidden rounded-lg border border-white/5 bg-[#242424]">
        <img
          src={src}
          alt={alt}
          className="block w-full"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const ph = img.nextElementSibling as HTMLElement | null;
            if (ph) ph.style.display = "flex";
          }}
        />
        <div className="hidden aspect-video w-full items-center justify-center text-sm text-[#666666]">
          Image coming soon
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-[#888888] leading-relaxed">{caption}</figcaption>
      )}
    </figure>
  );
}

export default function CaseStudyAgentic() {
  const activeId = useTocActiveSection(tocItems);

  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <TableOfContents items={tocItems} activeId={activeId} />

      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        <Link href="/" className="flex items-center gap-2 text-[#06b6d4] hover:text-[#22d3ee] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-[#ffffff] mb-8 sm:mb-12">
          AI Content & Agentic Workflows — Builders Week Demo
        </h1>

        {/* ── Intro ── */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12">
          <div className="flex-shrink-0 sm:w-52">
            <div className="space-y-4">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Role</p>
                <p className="text-[#ffffff] text-sm">Senior Content Designer</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Company</p>
                <p className="text-[#ffffff] text-sm">Atlassian</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Timeline</p>
                <p className="text-[#ffffff] text-sm">3-hour build session</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Collaborators</p>
                <p className="text-[#ffffff] text-sm">Just me 😇</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              Atlassian hosted a few AI Builders Weeks during my time there, filled with several informative sessions and demos about different ways to integrate AI tools into your daily workflow. At the end of the last builders week I attended, we had a 3-hour build session where we could either team up with others or build something on our own. At the last minute, I decided to build an agentic workflow that would enhance a low-use feature in the Goals and Projects app.
            </p>
          </div>
        </div>

        {/* ── Workflow demo ── */}
        <div id="section-demo" className="scroll-mt-12 mb-12">
          <SectionHeading>Workflow demo</SectionHeading>

          <div className="w-full mb-3">
            <div className="relative w-full rounded-lg overflow-hidden border border-white/5" style={{ paddingBottom: "62.5%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://risk-agent-demo.lovable.app/"
                title="Risk Agent workflow demo"
                loading="lazy"
                allow="clipboard-write"
              />
            </div>
            <p className="mt-2 text-xs text-[#888888]">
              <A href="https://risk-agent-demo.lovable.app/">Open the live demo ↗</A>
            </p>
          </div>

          <p className="text-base leading-relaxed text-[#ffffff]">
            This demo is a recreation I made of what the intended workflow would've looked like. The actual agent details and instructions were proprietary, and I do not have access to the assets I created.
          </p>
        </div>

        {/* ── Context ── */}
        <div id="section-context" className="scroll-mt-12 mb-12">
          <SectionHeading>Context</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            In both the Goals and Projects apps, there is a "Risk" feature that lets you catalogue an identified risk over the course of the goal or project lifecycle. The main problem was that it <em>just</em> catalogued the risk, and didn't provide any real action or utility beyond identifying it. In real life, risks have their own lifecycle, where strategies are discussed and decisions are made and mitigation happens to balance the risk. But none of that was happening in our apps — all the useful information was kept somewhere else and you would only hope a later project update would capture its resolution.
          </p>

          <div className="max-w-3xl mx-auto">
            <CaseImage
              src={riskFeature}
              alt="The Risk feature in the Goals and Projects apps"
              caption="And that's about all you would see and do with a risk."
            />
          </div>

          <p className="text-base leading-relaxed text-[#ffffff]">
            So for Builders Week, rather than just slap AI/Rovo chat into the Goals and Projects apps, I decided to use our own AI tools to try and extend the risk feature into something more useful and actionable.
          </p>
        </div>

        {/* ── Process ── */}
        <div id="section-process" className="scroll-mt-12 mb-12">
          <SectionHeading>Process</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            In the session, I started with{" "}
            <A href="https://www.atlassian.com/software/rovo/studio">Atlassian Studio</A>, a bespoke tool for users to build their own AI tools and agents. I described what the agentic workflow should do and look like, and I started by building the agent profile.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Using Rovo itself, I created the agent instructions and the general Confluence template. In order to determine both what information should be in the template and what outputs the agent should generate, I RAG-trained the agent on any and all Risk Summary/Mitigation documents it could find in Atlassian's internal Confluence instance. Rovo found and analyzed docs going back almost 15 years to determine the right template and content to generate.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            I refined the agent's instructions based on the findings from analyzing those risk documents, making sure it knew how to read the comment/message text against this context and generate content in the template that stakeholders would find useful.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Once the agent was able to analyze a risk message and generate a risk summary page, I moved on to the necessary automations within Studio. The automation flow went:
          </p>

          <ol className="space-y-3 mb-6">
            <li className="flex gap-3 text-base leading-relaxed text-[#ffffff]">
              <span className="text-[#06b6d4] font-semibold shrink-0 w-5 text-right">1.</span>
              <span>Agent invoked in a Confluence comment.</span>
            </li>
            <li className="text-base leading-relaxed text-[#ffffff]">
              <div className="flex gap-3">
                <span className="text-[#06b6d4] font-semibold shrink-0 w-5 text-right">2.</span>
                <span>Run core agent function.</span>
              </div>
              <ul className="mt-2 ml-8 space-y-1.5">
                {["Analyze comment/thread.", "Generate page from template.", "Fill out the template with analyzed information."].map((sub, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#cccccc] leading-relaxed">
                    <span className="text-[#888888] shrink-0">{String.fromCharCode(97 + i)}.</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="flex gap-3 text-base leading-relaxed text-[#ffffff]">
              <span className="text-[#06b6d4] font-semibold shrink-0 w-5 text-right">3.</span>
              <span>Reply back in thread with link to the newly generated page.</span>
            </li>
          </ol>

          <p className="text-base leading-relaxed text-[#ffffff]">
            Ideally, the agent would also generate a risk on the associated Project or Goal, but Atlassian's Platform Apps were not integrated with Rovo or automation in the necessary way to make this final step possible with these tools only.
          </p>
        </div>

        {/* ── Result ── */}
        <div id="section-result" className="scroll-mt-12 mb-12">
          <SectionHeading>Result</SectionHeading>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            A big part of my focus was on the content design output of this process: the template and the instructions for how the agent should fill it out. I structured the template for usability, organizing the content and information architecture to surface the most useful, critical information up front. Using findings from the risk artifact assessment, I focused the instructions on how to analyze the source message and surface the right information in the template.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            By the end, the agent could produce a filled-out risk summary page, which I tested using logged risks on real Projects. Triggering the workflow from a comment was the one unfinished piece. I spent the last hour of the session digging into the audit logs to find out which events were not firing properly. I'd just found where it was breaking down when the session ended, but I'd learned enough to know where to keep refining.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff]">
            By this point, inserting Rovo chat and auto-generated summaries felt like table-stakes applications of AI. Going through this exercise and building the full agentic workflow felt like the first step in applying AI to our apps and feature sets in ways that users would actually find useful. For risk management, getting the workflow to trigger properly was just the cherry on top. But the real value was in the template and the agent, getting stakeholders up to speed quickly with everything they need to know on one page.
          </p>
        </div>
      </div>
    </main>
  );
}
