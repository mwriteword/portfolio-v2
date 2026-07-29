import { TopNav } from "../components/TopNav";
import { BackToTop } from "../components/BackToTop";
import { ZoomableImage } from "../components/Lightbox";
import { Breadcrumbs } from "../components/Breadcrumbs";

/* ── Course Hero images ── */
const chImg1 = "/images/coursehero/screenshot-1.png";
const chImg2 = "/images/coursehero/screenshot-2.png";
const chImg3 = "/images/coursehero/screenshot-3.png";
const chImg4 = "/images/coursehero/screenshot-4.png";

function CaseImg({ src, alt }: { src: string; alt: string }) {
  return <ZoomableImage src={src} alt={alt} />;
}

export default function CaseStudyCourseHero() {
  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <TopNav />
      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        <Breadcrumbs label="Textbook Solutions" color="#a855f7" />

        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-[#ffffff] mb-8 sm:mb-12">
          Textbook Solutions
        </h1>

        {/* Intro: two-column */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12">
          <div className="flex-shrink-0 sm:w-52">
            <div className="space-y-4">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Role</p>
                <p className="text-[#ffffff] text-sm">Web Content Specialist, SEO (Contract)</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Company</p>
                <p className="text-[#ffffff] text-sm">Course Hero</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Timeline</p>
                <p className="text-[#ffffff] text-sm">~4 months</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">In this case study</p>
                <p className="text-[#ffffff] text-sm">SEO Content, Longform Content, Web Content,</p>
              </div>
            </div>
          </div>

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
          {[chImg1, chImg2, chImg3, chImg4].map((src, i) => (
            <CaseImg key={i} src={src} alt={`Course Hero textbook description example ${i + 1}`} />
          ))}
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
