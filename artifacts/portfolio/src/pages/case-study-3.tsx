import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const img1 = "/images/coursehero/screenshot-1.png";

const img2 = "/images/coursehero/screenshot-2.png";

const img3 = "/images/coursehero/screenshot-3.png";

const img4 = "/images/coursehero/screenshot-4.png";

export default function CaseStudy3() {
  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        <Link href="/" className="flex items-center gap-2 text-[#a855f7] hover:text-[#c084fc] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-[#ffffff] mb-8 sm:mb-12">
          SEO & Longform Content — Course Hero
        </h1>

        {/* Intro: two-column */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12">
          {/* Left column */}
          <div className="flex-shrink-0 sm:w-52">
            <div className="space-y-4">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Company</p>
                <p className="text-[#ffffff] text-sm">Course Hero</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Project Type</p>
                <p className="text-[#ffffff] text-sm">Contract work</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Date</p>
                <p className="text-[#ffffff] text-sm">11/2019</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 space-y-4">
            <p className="text-base leading-relaxed text-[#ffffff]">
              I picked up some extra work as a contractor writing web content for Course Hero, an ed-tech company that provides students with learning resources. Their new Textbook Solutions product required some web descriptions to be written, specifically using search engine-optimized (SEO) phrases.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              In total, I wrote about 25 textbook descriptions. This was particularly tricky because I couldn't actually access the textbooks I was writing about (due to being a contractor, and not having full access to the company's servers). I had to get creative and develop a process for writing these using only free Amazon previews and product descriptions from the publisher.
            </p>
            <p className="text-base leading-relaxed text-[#ffffff]">
              For clarity, the bodies of content I wrote are the sections labeled "Textbook Summary" and "Looking for Solutions to…?"
            </p>
          </div>
        </div>

        {/* Screenshots */}
        <div className="space-y-6">
          {[img1, img2, img3, img4].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Course Hero textbook description example ${i + 1}`}
              className="w-full rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
