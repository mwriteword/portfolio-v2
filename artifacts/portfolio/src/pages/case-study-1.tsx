import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { TableOfContents, useTocActiveSection, TocItem } from "../components/TableOfContents";
import { SectionHeading } from "../components/SectionHeading";
import { ImageCarousel } from "../components/ImageCarousel";

const tocItems: TocItem[] = [
  { id: "cs1-elevator", label: "Elevator Breakdown" },
  { id: "cs1-prologue", label: "Prologue" },
  { id: "cs1-ch1", label: "Ch. 1: Goals" },
  { id: "cs1-ch2", label: "Ch. 2: Research" },
  { id: "cs1-ch3", label: "Ch. 3: Two Models" },
  { id: "cs1-ch4", label: "Ch. 4: Solution" },
  { id: "cs1-ch45", label: "Ch. 4.5: Speed Bumps" },
  { id: "cs1-ch475", label: "Ch. 4.75: Sinkhole" },
  { id: "cs1-ch5", label: "Ch. 5: Launch" },
  { id: "cs1-epilogue", label: "Epilogue" },
];

const atlasHeaderImg = "/images/atlassian/atlasheader.png";
const goalPageImg = "/images/atlassian/goalpage.png";
const goalsQuoteImg = "/images/atlassian/goalsquote.png";
const projectsDirectoryImg = "/images/atlassian/directory.png";
const modelImg = "/images/atlassian/model.png";
const oldGoalPageWithKrsImg = "/images/atlassian/old-goalpage-withkrs.png";
const localizationAdjustedImg = "/images/atlassian/localization-adjusted.png";
const quotesImg = "/images/atlassian/quotes.png";

const beforeImages = [
  { src: "/images/atlassian/before_1.png", alt: "Before: KRs don't make sense without a goal", caption: "Key results don't really make sense without a goal and aren't the same type of object as a goal." },
  { src: "/images/atlassian/before_2.png", alt: "Before: KRs similar to metrics", caption: "Key results are very similar to metrics, an entirely different object in our model, which made it even harder to know how to add a key result." },
  { src: "/images/atlassian/before_3.png", alt: "Before: KRs lumped in with sub-goals", caption: "Key results are not the same thing as sub-goals, but they were lumped in all together." },
];

const afterImages = [
  { src: "/images/atlassian/after_1.png", alt: "After: KRs added to existing goals", caption: "Key results can only be added to an existing goal or objective, which is done entirely different from how goals are created." },
  { src: "/images/atlassian/after_2.png", alt: "After: Custom terms and localization workarounds", caption: "Putting custom terms in the UI to include Key Results meant we had to use workaround to support localization." },
  { src: "/images/atlassian/after_3.png", alt: "After: KRs visually separated from sub-goals", caption: "Key results have a completely different treatment and listing to sub-goals, further separating them in the UI." },
];

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#3a3a3a] rounded-lg px-5 py-4 mb-6">
      <p className="text-sm text-[#cccccc] leading-relaxed">{children}</p>
    </div>
  );
}


function CaseImage({ src, alt, caption, wide }: { src: string; alt: string; caption?: string; wide?: boolean }) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        className={`rounded-lg ${wide ? "w-full" : "max-w-full"}`}
        onError={(e) => {
          (e.target as HTMLImageElement).closest("figure")?.style.setProperty("display", "none");
        }}
      />
      {caption && (
        <figcaption className="mt-2 text-xs text-[#888888] leading-relaxed">{caption}</figcaption>
      )}
    </figure>
  );
}

function Term({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[0.85em] bg-[#3a3a3a] text-[#cccccc] px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors underline underline-offset-2"
    >
      {children}
    </a>
  );
}

export default function CaseStudy1() {
  const activeSection = useTocActiveSection(tocItems, true);

  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e] relative">
      <TableOfContents items={tocItems} activeId={activeSection} />

      <div className="max-w-[1120px] w-[90%] mx-auto pt-12 sm:pt-20 pb-12 sm:pb-20">
        <Link href="/" className="flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-[#ffffff] mb-8 sm:mb-12">
          Goal Types & Content Systems — Atlassian
        </h1>

        {/* Intro: two-column */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12">
          {/* Left column */}
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
                <p className="text-[#ffffff] text-sm">~1.5 years</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Collaborators</p>
                <p className="text-[#ffffff] text-sm">PM, Product Design, Engineering, Localization</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Deliverables</p>
                <p className="text-[#ffffff] text-sm">Content model aligned with object model, Content strategy, Information architecture, Support documentation, In-product UX content</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              By this point, pretty much everyone knows what an OKR is. Even if they don't understand how the framework <em>actually</em> works, they can tell you it stands for Objective and Key Results. But as well-known as it is, it's surprisingly difficult to effectively represent the framework in software. Take Microsoft Viva Goals for example, one of our biggest competitors in the space at the time.{" "}
              <A href="https://learn.microsoft.com/en-us/viva/goals/goals-retirement">They sunset the product in 2025</A>
              . While it's unfortunate, it was all the more reason we knew we had to get this right… especially because our first attempt at it was so poorly received.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              For your convenience, I've added a nice tl;dr section at the top of each chapter.
            </p>
          </div>
        </div>

        {/* Elevator Breakdown */}
        <div id="cs1-elevator" className="mb-12 scroll-mt-12">
          <SectionHeading>tl;dr</SectionHeading>

          {/* Before / After showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <ImageCarousel images={beforeImages} label="Before" interval={5000} />
            <ImageCarousel images={afterImages} label="After" interval={5000} />
          </div>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Our first attempt at OKR support in our goal-setting app failed in early access. Once we found out why it failed, we created an entirely new system to support how our customers actually structure OKRs in their organizations.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff]">
            As the lead (and only) content designer for the Goals app, I originated a new type system, redefined both our content model and the object model to bring them into alignment, and addressed localization changes in the eleventh hour in order to meet our public roadmap deadline. Among other things.
          </p>
        </div>

        {/* Prologue */}
        <div id="cs1-prologue" className="mb-12 scroll-mt-12">
          <SectionHeading>Prologue: An App is Born</SectionHeading>
          <Callout>
            <span className="font-semibold text-white">tl;dr</span> There was once an app called Atlas which let you share weekly project updates and monthly goal updates. Then one day, it was split into four apps: Atlassian Home, Goals, Projects, and Teams.
          </Callout>
          <CaseImage src={atlasHeaderImg} alt="Atlas header" />
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Before I joined Atlassian, there was an internal incubator program kicked up around 2019 that they called New Product Frameworks, or NPFs. It was a rigorous process in which you pitched a new product idea to Atlassian exec leadership, and if you got approved, you'd be fully funded to develop your product with your core team.{" "}
            <A href="https://www.atlassian.com/blog/announcements/introducing-atlas-teamwork-directory">Atlas</A>{" "}
            was one such product that spun out of that program, and for a while, was its biggest success story.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            The idea behind Atlas was simple: streamline, simplify, and standardize status updates on your work. Based on an existing Atlassian comms ritual called{" "}
            <A href="https://www.atlassian.com/loop/about">"The Loop"</A>
            , you would create a project for whatever you're working on that's about the size of an epic in Jira. Every Friday, you'd write a short, tweet-sized update (280 characters max) about what happened in your project that week. Then every Monday, your followers will read your update along with any other projects they're following in one nice, consolidated update feed. Same place, same time every week (or month for goals), meaning less pings saying, "Whats the latest on project X?" or "can you jump on a call and update me on the progress?"
          </p>
          <p className="text-base leading-relaxed text-[#ffffff]">
            And while it GA'd in 2023 (only a few months before I joined the team as the first and only embedded content designer), it was only in May 2024 that the product was{" "}
            <A href="https://community.atlassian.com/forums/Goals-and-Projects-articles/Atlas-is-evolving/ba-p/2686154">moved to the Atlassian platform</A>{" "}
            and its features offered for free to any customers with an Atlassian site. At this point, the Atlas homepage became Atlassian Home, meant to be the entry point to anywhere in Atlassian. For the next year, we would eventually see that each of Atlas's features would be split into their own app experiences: Atlassian Home would remain as is, but{" "}
            <A href="https://community.atlassian.com/forums/Goals-and-Projects-articles/Goals-navigation-changes-coming-soon/ba-p/2987557">Goals</A>
            ,{" "}
            <A href="https://community.atlassian.com/forums/Goals-and-Projects-discussions/Atlassian-Projects-is-now-a-Platform-app/td-p/3177341">Projects</A>
            , and Teams would each become their own app. While not fully relevant to this case study, my humble brag moment here is that I oversaw the communications and in-app changeboarding for each of these new app launches.
          </p>
        </div>

        {/* Chapter 1 */}
        <div id="cs1-ch1" className="mb-12 scroll-mt-12">
          <SectionHeading>Chapter 1: What Are Goals Even Anyway?</SectionHeading>
          <Callout>
            <span className="font-semibold text-white">tl;dr</span> Using our single-object-type model in Goals, we created a lightweight type system to introduce custom terms and OKR support. It was not well received.
          </Callout>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Fast forward to late 2024/early 2025 when the Goals app began developing a system to support OKR modeling within goals following a lot of customer feedback requesting these features. This was all a part of our push toward enterprise readiness, since Goals was used by many tech companies most of whom used the OKR framework and any larger enterprise companies <em>require</em> sets of functionality, including OKR representation.
          </p>
          <div className="float-left mr-6 mb-4 w-[45%] max-w-[480px] [&_figure]:my-0">
            <CaseImage src={goalPageImg} alt="The goal page in the Goals app" />
          </div>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            At this point in time, Goals had a very simple object model:
          </p>
          <ul className="mb-4 space-y-1 pl-4">
            <li className="flex items-start gap-2.5 text-base text-[#ffffff] leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
              You had goals
            </li>
            <li className="flex items-start gap-2.5 text-base text-[#ffffff] leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
              And you could nest them under other goals, making the nested goal a "sub-goal"
            </li>
            <li className="flex items-start gap-2.5 text-base text-[#ffffff] leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
              And you could link them to projects and Jira spaces (FKA projects, which this sentence may help explain the name change)
            </li>
          </ul>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            And that was pretty much it. While the initial intention with nested sub-goals <em>was</em> to act as a KR-like object, there were no distinctions between sub-goals treated as an actual sub goal and sub-goals that were KRs. Which brought us to our first iteration of goal types. Due to the typical timeline constraints and{" "}
            <A href="https://www.atlassian.com/roadmap/cloud/goal-types?sortBy=timeFrame&sort=asc&p=14d2d9fd-6d">a public roadmap item we needed to meet</A>
            , we opted for the simplest solution: give Goals app admins the ability to create custom goal types which would change the name without any significant functionality change. That way, you <em>could</em> distinguish sub-goals and actual KRs because the type label would indicate as much.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Or so we thought.
          </p>
          <div className="clear-both" />
          <div className="max-w-[65%] mx-auto">
            <CaseImage src={goalsQuoteImg} alt="Customer feedback quote about goal types" />
          </div>
          <p className="text-base leading-relaxed text-[#ffffff]">
            We released the feature in early access to several customers, and received a lot of feedback that it did not fulfill a lot of our customers needs. Which meant it was time to go back to the drawing board.
          </p>
        </div>

        {/* Chapter 2 */}
        <div id="cs1-ch2" className="mb-12 scroll-mt-12">
          <SectionHeading>Chapter 2: Feedback and Research Phase</SectionHeading>
          <Callout>
            <span className="font-semibold text-white">tl;dr</span> Customers felt the model was broken and didn't align with the actual OKR framework. They also really wanted to see OKR language in the app.
          </Callout>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            While some customers gave proactive feedback via the community group and other channels, we also had several customer conversations to dig into both the feature's inadequacies and what they were <em>actually</em> looking to create. From all these inputs, a few key themes emerged:
          </p>
          <ol className="space-y-4 mb-4">
            <li className="flex items-start gap-3 text-base text-[#ffffff] leading-relaxed">
              <span className="text-[#888888] shrink-0 font-medium">1.</span>
              <span>
                In our system, you could create a <Term>Key Result</Term> object without any other connections, but a sole <Term>Key Result</Term> object just doesn't make sense without an <Term>Objective</Term> to tie it to.
              </span>
            </li>
            <li className="flex items-start gap-3 text-base text-[#ffffff] leading-relaxed">
              <span className="text-[#888888] shrink-0 font-medium">2.</span>
              <span>
                Many enterprise customers in particular wanted to see <Term>Objective</Term> and <Term>Key Result</Term> language in the UI, meaning they didn't want to see <Term>Goal</Term> objects — only <Term>Objective</Term>. More on this later.
              </span>
            </li>
            <li className="flex items-start gap-3 text-base text-[#ffffff] leading-relaxed">
              <span className="text-[#888888] shrink-0 font-medium">3.</span>
              <span>
                While the type system distinguished between <Term>Key Result</Term> objects and <Term>Sub-goal</Term> objectives, they sat equally on a parent goal's list of <Term>Sub-goals</Term> and nested in directory lists without any indication of hierarchy or differentiation. In other words, they look as though they are equivalent, but they are not.
              </span>
            </li>
          </ol>
          <p className="text-base leading-relaxed text-[#ffffff]">
            All in all, we had the rare combination where semantics and text labels <em>actually</em> mattered plus an underlying object model that was not fully clear or easy to understand. To move forward with a real solution, we had to untangle both the object model and the content model all at once.
          </p>
        </div>

        {/* Chapter 3 */}
        <div id="cs1-ch3" className="mb-12 scroll-mt-12">
          <SectionHeading>Chapter 3: The Two-Model Problem</SectionHeading>
          <Callout>
            <span className="font-semibold text-white">tl;dr</span> Our object model in the platform apps overall were confusing compared to other premium apps. While other apps follow a normal App » Container » Collective object (primitive) » Object type model where every layer has a different name, Goals had Goals (app) » Goals (container) » Goals (primitive) » Goal (default object type).
          </Callout>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            As the content lead, I took the lead on sorting out this out by starting with the content model. One of the core problems was how we structure concepts within apps at Atlassian. The typical hierarchical structure that most of the Atlassian apps abide by is as follows:
          </p>
          <ul className="mb-4 space-y-1 pl-4">
            <li className="flex items-start gap-2.5 text-base text-[#ffffff] leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
              <span>App » <Term>Jira</Term></span>
            </li>
            <li className="flex items-start gap-2.5 text-base text-[#ffffff] leading-relaxed pl-4">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
              <span>Container » <Term>Space</Term> (FKA <Term>Project</Term>)</span>
            </li>
            <li className="flex items-start gap-2.5 text-base text-[#ffffff] leading-relaxed pl-8">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
              <span>Collective object (primitive) » <Term>Work item</Term> (FKA <Term>Issue</Term>)</span>
            </li>
            <li className="flex items-start gap-2.5 text-base text-[#ffffff] leading-relaxed pl-12">
              <span className="mt-2 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
              <span>Object type » <Term>Bug</Term>, <Term>Story</Term>, <Term>Task</Term>, <Term>Epic</Term>, etc.</span>
            </li>
          </ul>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            The 3rd layer, which we called a "Primitive", was where a lot of the content problem was happening. Looking at the above example, the "Work item" primitive refers to any of the following types collectively, giving a way to group several types under one term, which was particularly helpful in UI elements and microcopy. But for Goals, and actually all of our platform apps, they followed a… more confused pattern.
          </p>

          {/* Three-column object model comparison */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6">
            {[
              ["Goals", "Goals", "Goals", "Goal"],
              ["Teams", "Teams", "Teams", "Team"],
              ["Projects", "Projects", "Projects", "Project"],
            ].map(([app, container, primitive, type]) => (
              <div key={app} className="flex-1">
                <ul className="space-y-1">
                  <li className="flex items-start gap-2 text-sm text-[#ffffff]">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
                    <Term>{app}</Term>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[#ffffff] pl-4">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
                    <Term>{container}</Term>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[#ffffff] pl-8">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
                    <Term>{primitive}</Term>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[#ffffff] pl-12">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#555555] shrink-0" />
                    <Term>{type}</Term>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Backing up to the prologue where Atlas was debranded and split into 4 individual apps, it was decided (at a level above my paygrade) that each app would retain a smaller feature set (compared to a Jira or Confluence) and would adopt their core function as the name rather than get a branded name (like Focus or Confluence).
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            To go even further, each app (apart from Home) did not have containers built into the app—each app only featured a directory page with filters and saved views, but no other way to meaningfully group objects together.
          </p>
          <div className="float-right ml-6 mb-4 w-[45%] max-w-[480px] [&_figure]:my-0">
            <CaseImage
              src={projectsDirectoryImg}
              alt="Goals directory page"
              caption="Unlike Confluence and Jira, Goals did not have spaces or other container methods to group objects together. Just filters and different ways to slice the directory details."
            />
          </div>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Without any real containers, the next best thing was the title of the page, which you can see in the screenshot above is just the object name… again.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Until this point, none of these apps have had object types to poke holes in the content model. Because naming the default object type after the primitive isn't actually a problem when there are no other types. But once you have the collective <Term>Goals</Term> primitive and then there's a <Term>Goal</Term> type and an <Term>Objective</Term> type but both are <Term>Goals</Term>, it becomes unclear when to use what and whether the <Term>Goals</Term> primitive refers to just the <Term>Goal</Term> object or everything in the app.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff]">
            While an entire content model overhaul across all three of our platform apps was not in the cards for this project, the next best thing was creating an object type system to move forward, with the intent of adding in as much scalability as possible for the other apps.
          </p>
          <div className="clear-both" />
        </div>

        {/* Chapter 4 */}
        <div id="cs1-ch4" className="mb-12 scroll-mt-12">
          <SectionHeading>Chapter 4: Approaching a Solution</SectionHeading>
          <Callout>
            <span className="font-semibold text-white">tl;dr</span> We introduced <Term>Success measures</Term> which were only attached to a parent goal. This solved 2 of the 3 problems.
          </Callout>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            With all of this context and feedback and current state in mind, what did we actually come up with? We prioritized by the feedback first and foremost, then explored how the solution could scale to the other apps:
          </p>
          <ol className="space-y-6 mb-6">
            <li className="text-base text-[#ffffff] leading-relaxed">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-[#888888] shrink-0 font-medium">1.</span>
                <span>In our system, you could create a <Term>Key Result</Term> object without any other connections, but a sole <Term>Key Result</Term> object just doesn't make sense without an <Term>Objective</Term> to tie it to.</span>
              </div>
              <div className="flex items-start gap-3 pl-5">
                <span className="text-[#888888] shrink-0 font-medium">a.</span>
                <span><span className="text-[#22c55e] font-semibold">SOLUTION:</span> We needed to introduce a functionally different object that would nest under a goal and could not exist without it.</span>
              </div>
            </li>
            <li className="text-base text-[#ffffff] leading-relaxed">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-[#888888] shrink-0 font-medium">2.</span>
                <span>Many enterprise customers in particular wanted to see <Term>Objective</Term> and <Term>Key Result</Term> language in the UI, meaning they didn't want to see <Term>Goal</Term> objects — only <Term>Objective</Term>. More on this later.</span>
              </div>
              <div className="flex items-start gap-3 pl-5">
                <span className="text-[#888888] shrink-0 font-medium">a.</span>
                <span><span className="text-[#22c55e] font-semibold">SOLUTION:</span> We'd need a way to show custom terms in the UI where applicable, and ideally support whatever language experience customers want.</span>
              </div>
            </li>
            <li className="text-base text-[#ffffff] leading-relaxed">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-[#888888] shrink-0 font-medium">3.</span>
                <span>While the type system distinguished between <Term>Key Result</Term> objects and <Term>Sub-goal</Term> objects, they sat equally on a parent goal's list of <Term>Sub-goals</Term> and nested in directory lists without any indication of hierarchy or differentiation. In other words, they look as though they are equivalent, but they are not.</span>
              </div>
              <div className="flex items-start gap-3 pl-5">
                <span className="text-[#888888] shrink-0 font-medium">a.</span>
                <span><span className="text-[#22c55e] font-semibold">SOLUTION:</span> By resolving problem #1, we should theoretically resolve this one as well. Either way, we would list them differently and distinguish them in directory views.</span>
              </div>
            </li>
          </ol>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            In addition to supporting OKRs and other custom terms as types (similar to our original iteration), we knew that in order to properly support <Term>Key results</Term> in a framework-accurate way, we'd need to build something distinct from the goal object. Working in close collaboration with the PM and Product Designer on the project, we landed on <Term>Success measures</Term>, which were meant to function as both the primitive and a type in the same way <Term>Goals</Term> does.
          </p>
          <CaseImage
            src={modelImg}
            alt="The object model for Goals showing success measures as a separate primitive"
          />
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            <Term>Success measures</Term>, used interchangeably with <Term>Key results</Term>, would live primarily on the parent goal and be treated differently from sub-goals. They could only be created on the parent goal page and therefore could not exist without a parent attached.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff]">
            As part of the content design practice at Atlassian, I defined <Term>Success measure</Term> as a new, dependent object type, owning the definition in the Atlassian System of Work library, an internal record of all the objects and concepts we use in our apps. I was already responsible for several other concepts, including how verification works at a systems level, but I'd developed the content perspective on <Term>Success measures</Term> from the ground up and solidifying it in the library felt like seeing it through to completion.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mt-4">
            Functionally distinct ✅. Treated differently than sub-goals ✅. Now, if we could only solve that OKR language problem…
          </p>
        </div>

        {/* Chapter 4.5 */}
        <div id="cs1-ch45" className="mb-12 scroll-mt-12">
          <SectionHeading>Chapter 4.5: Speed Bumps Incoming…</SectionHeading>
          <Callout>
            <span className="font-semibold text-white">tl;dr</span> In order to appease customer requests, we decided to insert custom user terms into our UI. It went poorly with localization, and we had to scramble for a solution, which ended up being a lot of manual "short-term" resolutions to abide by localization requirements.
          </Callout>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            The much trickier problem was figuring out how to incorporate OKR language in the UI without full clarity on <em>how much</em> OKR language our customers actually wanted. From our customer conversations, it seemed like a mix of opinions, with some wanting even the app to be called OKRs, some wanting UI labels to reflect "Objective" instead of "Goal". What we did know for sure was that "Key results" <em>had</em> to be in there in a significantly more meaningful way so customers would immediately know its purpose. And that's where <Term>Success measures</Term> started to fall a bit short.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            While <Term>Goals</Term> had the benefit of being generally understandable in our cursed content model, <Term>Success measures</Term> was entirely made up and could not be easily understood without specificity. It was also long, so referring to <Term>Success measures</Term> as a primitive to include <Term>Key results</Term> would be awkward and not immediately be clear, not to mention customers who would <em>only</em> want <Term>Objective</Term> and <Term>Key result</Term> object types and nothing else.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            I proposed three different options, with varying degrees of feasibility:
          </p>

          {/* Three options */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 bg-[#3a3a3a] rounded-lg p-4">
              <p className="text-sm text-[#ffffff] leading-relaxed">
                <span className="font-semibold">OPTION 1:</span> Adopt <Term>Success measures</Term> as the primitive anyway, because this was the most scalable solution, the literal reason we have primitives, and it was already decided that <Term>Goals</Term> would still be the primitive even with <Term>Objectives</Term> as a OOTB type.
              </p>
            </div>
            <div className="flex-1 bg-[#3a3a3a] rounded-lg p-4">
              <p className="text-sm text-[#ffffff] leading-relaxed">
                <span className="font-semibold">OPTION 2:</span> Dynamically insert custom terms in the UI, which I <span className="font-semibold">did not recommend</span> because of the unpredictability of custom terms in UI contexts ends up breaking a lot of contexts.
              </p>
            </div>
            <div className="flex-1 bg-[#3a3a3a] rounded-lg p-4">
              <p className="text-sm text-[#ffffff] leading-relaxed">
                <span className="font-semibold">OPTION 3:</span> Change the default object types to <Term>Objectives</Term> and <Term>Key results</Term> and let <Term>Goal</Term> and <Term>Success measure</Term> <em>only</em> be primitives. Not ideal because PM didn't want to force <em>all</em> our users into OKR structures.
              </p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-[#ffffff]">
            So anyway, I lost this battle and PM decided to go with Option 2. This meant we'd have to flag all the places in the UI custom terms would be plug into and use <Term>Key results</Term> as a placeholder since it was the most commonly anticipated term to be plugged in.
          </p>
        </div>

        {/* Chapter 4.75 */}
        <div id="cs1-ch475" className="mb-12 scroll-mt-12">
          <SectionHeading>Chapter 4.75: …Followed by a Sinkhole</SectionHeading>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            I had a regular, fortnightly meeting with the localization PM who covers our apps. I shared the new flow using custom terms, and as expected, they flagged many concerns, most of which boiled down to these:
          </p>
          <ol className="space-y-4 mb-6">
            <li className="flex items-start gap-3 text-base text-[#ffffff] leading-relaxed">
              <span className="text-[#888888] shrink-0 font-medium">1.</span>
              <span>As part of our solution to include custom terms, we added a field for the plural form of whatever they chose. But for localization, some languages have several plural forms depending on the context.</span>
            </li>
            <li className="flex items-start gap-3 text-base text-[#ffffff] leading-relaxed">
              <span className="text-[#888888] shrink-0 font-medium">2.</span>
              <span>For many languages, words may have different forms depending on the context of the sentence, similar to how verbs conjugate differently depending on the subject of the sentence. With the way the tool translates words, it may just spit out the custom term in the entirely wrong form, or worse, as just an error in the middle of a sentence.</span>
            </li>
          </ol>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            I went back to the core root of the problem, as most of the feedback we'd gotten wasn't to include <em>any</em> custom term—it was <em>only</em> OKR language from customers who exclusively used OKRs and similar frameworks. What felt like the better, longer term solution was creating a split experience where goals language (besides the app name) were aligned to OKR language entirely. But this would mean pushing out our dev time significantly, not to mention the requisite design activities for swapping <Term>Goal</Term> out for <Term>Objective</Term>.
          </p>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            Working with the lead product designers on our team, we decided to follow Jira's solutions for including custom terms in the UI, which largely required separating out the custom term from any other content as much as possible. That would mean standalone microcopy with just the custom term and other workarounds to make it localizable. It wasn't ideal, but with the public roadmap deadline approaching and dev time being wasted waiting for final designs, we had to move forward.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CaseImage
              src={oldGoalPageWithKrsImg}
              alt="Original goal page design with key results"
              caption="This is what we originally designed and was ready to ship before localization problems arose"
            />
            <CaseImage
              src={localizationAdjustedImg}
              alt="Adjusted content labels for localization"
              caption="And this is how I adjusted the content labels in the UI to allow localization to proceed."
            />
          </div>
        </div>

        {/* Chapter 5 */}
        <div id="cs1-ch5" className="mb-12 scroll-mt-12">
          <SectionHeading>Chapter 5: And Finally, We Launch</SectionHeading>
          <Callout>
            <span className="font-semibold text-white">tl;dr</span> We release the feature to mostly mixed-to-positive response, and a clear path forward of fast follow improvements.
          </Callout>
          <p className="text-base leading-relaxed text-[#ffffff] mb-4">
            We managed to meet the roadmap deadline with a{" "}
            <A href="https://community.atlassian.com/forums/Goals-and-Projects-articles/Goal-Types-and-better-support-for-OKRs-are-coming-soon/ba-p/3151925">progressive release</A>{" "}
            to our customers. While the announcement was met with generally positive/mixed sentiment, ongoing feedback pointed out further gaps in our experience that showed we were generally moving in the right direction, at least moreso than our original release. We'd already been testing this model at different points in the design process, but we managed to get in a final round of usability testing a few months before our actual launch.
          </p>
          <div className="max-w-[65%] mx-auto">
            <CaseImage src={quotesImg} alt="Usability testing quotes from customers" />
          </div>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            From the comments on the community thread announcing the feature and individual posts after the announcement, we can glean the following sentiment breakdown:
          </p>

          {/* Sentiment stats */}
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <p className="text-xs text-[#888888] uppercase tracking-widest font-medium mb-2">Positive</p>
              <p className="text-[#22c55e] font-semibold text-sm mb-1">~9 posts (~15%)</p>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">Comments on the announcement post expressing excitement over the feature.</p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <p className="text-xs text-[#888888] uppercase tracking-widest font-medium mb-2">Mixed/positive</p>
              <p className="text-[#f97316] font-semibold text-sm mb-1">~22 posts (~37%)</p>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">Posts where the direction was praised, but questions, concern, or feedback were noted.</p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <p className="text-xs text-[#888888] uppercase tracking-widest font-medium mb-2">Negative/<wbr />critical</p>
              <p className="text-[#ef4444] font-semibold text-sm mb-1">~18 posts (~30%)</p>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">Posts that express frustration over functionality changes or specific aspects of its implementation.</p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <p className="text-xs text-[#888888] uppercase tracking-widest font-medium mb-2">No sentiment</p>
              <p className="text-[#3b82f6] font-semibold text-sm mb-1">~11 posts (~18%)</p>
              <p className="text-xs text-[#aaaaaa] leading-relaxed">Posts that were troubleshooting, bug reporting, or seeking help/assistance.</p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-[#ffffff]">
            A lot of the feedback and criticism was directed at the way progress and metrics rolled up to the overall goal's progress. Previously, sub-goals would inform the goal's progress, which we opted to maintain for any existing goals to prevent as much disruption as possible. Going forward however, goal progress would be informed by its <Term>success measures</Term> or <Term>key results</Term> with no option to go back to sub-goals. This, plus other feedback gathered from other channels, gave us clear next steps and fast follow improvements that I was actively working with PM and Product design on before my time at Atlassian was cut short.
          </p>
        </div>

        {/* Epilogue */}
        <div id="cs1-epilogue" className="border-t border-[#555555] pt-12 scroll-mt-12">
          <SectionHeading>Epilogue: Live to Write Another Day</SectionHeading>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              In developing the sub-goal rollup feature, it became clear just <em>how</em> unsustainable our solution to the localization problem actually was. I was writing surfaces with the knowledge of localization this time around, but we were actively losing clarity by not being able to mention either <Term>Key result</Term> or <Term>Success measure</Term> in the guiding contexts of the feature. It wouldn't be just for a few surfaces either, every new feature we'd build would always come up against the same problem until we actually went with a longer term solution, which I believed was the experience toggle where users (likely admins) could select whether they wanted to see goal language or OKR language. Microsoft Viva Goals did it this way, so I'd begun thinking about how we might apply this to our own app.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              To be clear, I don't think introducing custom terms was the wrong choice. It was a clear ask from our customers, and we knew we'd have to address it to keep up. But if we'd brought this up much earlier in the process, and possibly did more holistic assessments of how localization might've affected our plans when we were still exploring solutions, we might've been able to avoid a lot of these issues. Heck, our solution might've looked <em>entirely</em> different if we'd addressed localization and the OKR language problem a lot sooner.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              I like this project as a case study, mostly because it took the better part of an entire year to work through, but also because it reinforces something I keep running into with content systems work: the hardest problems aren't the ones that look hard on the surface. The localization issue looked like a translation problem. The object model issue looked like a naming problem. But neither of them were as simple as it might've seemed on the surface—instead, the problem was in the structure and structural problems don't get better by throwing more words and labels at them. They only get better when you take the time to define the right structure first, even when the roadmap is breathing down your neck. That's what this work was really about. Not OKRs, nor goal types or success measures. Just the slow, careful work of getting the foundation right so that everything we build on top of it actually holds.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
