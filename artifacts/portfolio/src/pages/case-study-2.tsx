import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CaseStudy2() {
  return (
    <main className="min-h-screen bg-[#2e2e2e]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="flex items-center gap-2 text-[#22c55e] hover:text-[#4ade80] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[48px] text-[#ffffff] mb-12">
          Content Strategy & Behavior Change — Opower
        </h1>

        {/* Intro Section */}
        <div className="flex gap-12 mb-12">
          {/* Left Column - Fields */}
          <div className="flex-shrink-0 w-40">
            <div className="space-y-4">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Role</p>
                <p className="text-[#ffffff] text-sm">Content Strategist</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Company</p>
                <p className="text-[#ffffff] text-sm">Opower</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Year</p>
                <p className="text-[#ffffff] text-sm">2021-2022</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Timeline</p>
                <p className="text-[#ffffff] text-sm">8-10 Months</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Team</p>
                <p className="text-[#ffffff] text-sm">Design & Marketing</p>
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="flex-1 space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              As the Content Strategist at Opower, I led a large-scale content initiative to create messaging that would drive behavioral change in energy consumption among residential customers. The challenge was balancing technical accuracy with persuasive, accessible messaging.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              I designed and implemented a multi-channel communication strategy consisting of three core assets: an intro email to onboard new customers, weekly updates to sustain engagement, and monthly recaps to demonstrate impact. Each piece was strategically crafted to nudge customers toward energy-saving behaviors through psychological principles and data-driven insights.
            </p>
          </div>
        </div>

        {/* THE INTRO EMAIL Section */}
        <div className="mb-12">
          <h2 className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-8">The Intro Email</h2>
          
          <div className="flex gap-12 items-start mb-8">
            {/* Text */}
            <div className="flex-1 space-y-4">
              <p className="text-base leading-relaxed text-[#ffffff]">
                The initial touchpoint needed to educate customers on the value of the Opower program while addressing potential skepticism. The email introduces customers to their energy usage and the concept of peer comparison—a key behavioral lever.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                I focused on clarity and benefit-driven messaging: helping customers understand what they'll learn, why peer comparison matters, and what actions they can take next. The design emphasizes visual hierarchy to guide readers through energy insights and comparisons.
              </p>
            </div>

            {/* Placeholder Image */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 bg-[#404040] border border-[#555555] rounded-sm flex items-center justify-center">
                <span className="text-[#999999] text-sm">Email Design Mockup</span>
              </div>
            </div>
          </div>
        </div>

        {/* THE WEEKLY UPDATE Section */}
        <div className="mb-12">
          <h2 className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-8">The Weekly Update</h2>
          
          <div className="flex gap-12 items-start mb-8">
            {/* Placeholder Image */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 bg-[#404040] border border-[#555555] rounded-sm flex items-center justify-center">
                <span className="text-[#999999] text-sm">Weekly Update Mockup</span>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 space-y-4">
              <p className="text-base leading-relaxed text-[#ffffff]">
                The weekly update needed to sustain engagement without feeling repetitive or intrusive. This touchpoint reinforces progress and leverages social proof through peer comparison data—a proven behavioral change mechanism.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                I crafted messaging around three key pillars: celebrating their progress, showing how they compare to similar neighbors, and suggesting specific actions to save more. The visual hierarchy emphasizes the comparison data while making recommendations feel personalized rather than prescriptive.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                Key behavioral insights informed the tone: positive reinforcement for savers, gentle nudges for those using more energy, and recognition of seasonal variations in consumption.
              </p>
            </div>
          </div>
        </div>

        {/* THE MONTHLY RECAP Section */}
        <div className="mb-12">
          <h2 className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-8">The Monthly Recap</h2>
          
          <div className="flex gap-12 items-start">
            {/* Text */}
            <div className="flex-1 space-y-4">
              <p className="text-base leading-relaxed text-[#ffffff]">
                The monthly recap serves as a checkpoint to demonstrate broader impact and reinforce long-term value. This is where we aggregated behavioral data and showed cumulative savings—both financial and environmental.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                The strategy here was to shift perspective: from "how are you doing this month?" to "look what you've accomplished." I emphasized milestone achievements, environmental impact, and financial savings, all with context about how their actions compare to their community.
              </p>
              <p className="text-base leading-relaxed text-[#ffffff]">
                This recurring message was designed to build a habit and sense of community around energy conservation, making sustainability feel tangible and rewarding rather than like an obligation.
              </p>
            </div>

            {/* Placeholder Image */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 bg-[#404040] border border-[#555555] rounded-sm flex items-center justify-center">
                <span className="text-[#999999] text-sm">Monthly Recap Mockup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Learnings / Outcomes Section */}
        <div className="border-t border-[#555555] pt-12">
          <h2 className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-6">Outcomes</h2>
          
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              The messaging strategy resulted in a cohesive communication framework that increased engagement across all three touchpoints. By applying behavioral economics principles—particularly the power of peer comparison and progress tracking—we created a communication system that motivated customers to sustain energy-saving behaviors over time.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              This project deepened my understanding of how content strategy bridges the gap between data and human behavior, and how thoughtful messaging can make complex information feel personally relevant and actionable.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
