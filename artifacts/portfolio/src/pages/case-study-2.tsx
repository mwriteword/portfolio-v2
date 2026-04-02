import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { TableOfContents, useTocActiveSection, TocItem } from "../components/TableOfContents";

const tocItems: TocItem[] = [
  { id: "cs2-intro", label: "Intro Email" },
  { id: "cs2-weekly", label: "Weekly Update" },
  { id: "cs2-monthly", label: "Monthly Recap" },
];

export default function CaseStudy2() {
  const activeSection = useTocActiveSection(tocItems);

  return (
    <main className="min-h-screen bg-[#2e2e2e]">
      <TableOfContents items={tocItems} activeId={activeSection} />
      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        <Link href="/" className="flex items-center gap-2 text-[#22c55e] hover:text-[#4ade80] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-[#ffffff] mb-8 sm:mb-12">
          Content Strategy & Behavior Change — Opower
        </h1>

        {/* Intro Section */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12 sm:mb-16">
          {/* Left Column - Fields */}
          <div className="flex-shrink-0 sm:w-52">
            <div className="space-y-4">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Role</p>
                <p className="text-[#ffffff] text-sm">UX Copywriter / Content Lead</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Company</p>
                <p className="text-[#ffffff] text-sm">Oracle Utilities - Opower</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Collaborators</p>
                <p className="text-[#ffffff] text-sm">UX Designers & UX Researchers</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Date</p>
                <p className="text-[#ffffff] text-sm">2019</p>
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="flex-1 space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              In the evenings when most people are returning home from school or work, the demand for energy gets very high because everyone is cooking, doing laundry, taking showers, watching TV, and other electricity-intensive things all at the same time. Time-of-Use electricity plans were introduced to help utilities mitigate energy load during these "peak hours" by charging less money when the demand is lower and more when the demand is higher.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              As you may have noticed, this is not an easy concept to explain in 30 seconds or less. Some of the participants in our research sessions were actually on a Time-of-Use rate in real life, but didn't fully understand how it worked (humble-brag: they did after our session with them).
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              In order to sustain actual behavior change, we developed an email communication series to give customers relevant, useful data about their energy use and encourage them to shift their usage away from peak hours.
            </p>
          </div>
        </div>

        {/* THE INTRO EMAIL */}
        <div id="cs2-intro" className="mb-12 sm:mb-16 scroll-mt-12">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6 sm:mb-8">The Intro Email</h2>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
            <div className="flex-1 space-y-4">
              <p className="text-base leading-relaxed text-[#ffffff]">
                The challenge in this email was introducing the Rate Coach series while also re-iterating how Time-of-Use works. In order to keep the email from becoming too copy-heavy, I had limited real estate in the headlines of each module, as well as shorter body copy.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                Though not as prominent in this email, there is the ultimate goal of long-term behavior change. The primary data visualization shows their average hourly energy use from the last week. The headline gives the graph context, while the subhead prompts the customer into considering what their evening routine looks like, and how they could shift energy use away from peak hours.
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-64">
              <img
                src="/images/opower/intro-email.png"
                alt="Intro email design"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* THE WEEKLY UPDATE */}
        <div id="cs2-weekly" className="mb-12 sm:mb-16 scroll-mt-12">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6 sm:mb-8">The Weekly Update</h2>
          <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-12 items-start">
            <div className="flex-shrink-0 w-full sm:w-64">
              <img
                src="/images/opower/weekly-update.png"
                alt="Weekly update email design"
                className="rounded-lg w-full"
              />
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-base leading-relaxed text-[#ffffff]">
                In contrast to the Intro Email, there is a lot less explanation required for this email. Instead, its main goal is to deliver their insights in a quick and easy-to-understand way.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                The primary headline of the email delivers the main insight we want them to understand: whether they did better or worse than the previous week. We know gamification works, but if you're more subtle about it (i.e. simply showing two data points rather than calling it a game), the idea can feel more organic and self-motivated for the user.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                Full disclosure: the short tip at the bottom beneath the "Ways to Save" headline was pulled from our tip library and was not written by me.
              </p>
            </div>
          </div>
        </div>

        {/* THE MONTHLY RECAP */}
        <div id="cs2-monthly" className="mb-12 sm:mb-16 scroll-mt-12">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6 sm:mb-8">The Monthly Recap</h2>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
            <div className="flex-1 space-y-4">
              <p className="text-base leading-relaxed text-[#ffffff]">
                This is the ultimate culmination of the weekly update. The headline functions in the same way as the weekly update: the primary insight delivered quickly, which in this case is their week with the lowest peak energy use.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                If you can consider the rate coach series a "game", this would serve the same mental purpose as a "results screen". The user is shown their energy use over a 4-week period, with a spotlight cast on their week with the lowest cost. In an ideal world, they would think back to that lowest week and consider what they did differently to lower their costs so dramatically.
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-64">
              <img
                src="/images/opower/monthly-recap.png"
                alt="Monthly recap email design"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
