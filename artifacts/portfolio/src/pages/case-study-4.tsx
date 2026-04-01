import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { SectionHeading } from "../components/SectionHeading";

const bannerFull  = "/images/quinstreet/banner-full.jpeg";
const banner2col1 = "/images/quinstreet/banner-col-1.jpeg";
const banner2col2 = "/images/quinstreet/banner-col-2.jpeg";
const banner2col3 = "/images/quinstreet/banner-col-3.jpeg";

const email1 = "/images/quinstreet/email-1.jpeg";
const email2 = "/images/quinstreet/email-2.jpeg";
const email3 = "/images/quinstreet/email-3.jpeg";
const email4 = "/images/quinstreet/email-4.png";
const email5 = "/images/quinstreet/email-5.png";
const email6 = "/images/quinstreet/email-6.png";

const landing1 = "/images/quinstreet/landing-1.png";
const landing2 = "/images/quinstreet/landing-2.png";

function CaseImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-lg w-full ${className}`}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

export default function CaseStudy4() {
  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <div className="max-w-[1120px] w-[90%] mx-auto py-12 sm:py-20">
        <Link href="/" className="flex items-center gap-2 text-[#f59e0b] hover:text-[#fbbf24] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[28px] sm:text-[48px] text-[#ffffff] mb-8 sm:mb-12">
          Early Copywriting Works — QuinStreet
        </h1>

        {/* Intro: two-column */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12">
          {/* Left column */}
          <div className="flex-shrink-0 sm:w-40">
            <div className="space-y-4">
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Role</p>
                <p className="text-[#ffffff] text-sm">Copywriter</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-widest font-medium mb-1">Date</p>
                <p className="text-[#ffffff] text-sm">Jan 2014 - Mar 2017</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1">
            <p className="text-base leading-relaxed text-[#ffffff]">
              While at QuinStreet, a majority of the projects I worked on were digital marketing communications. I worked on a lot of other, bigger projects but I couldn't take those with me for confidentiality reasons. Instead, here's an assortment of some of my favorites from the time.
            </p>
          </div>
        </div>

        {/* BANNERS */}
        <div className="mb-12">
          <SectionHeading>Banners</SectionHeading>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            Serving a variety of verticals, I wrote a numerous many banner ads for both clients and our internal sites. These were often requested frequently and in high volume, allowing more flexible to write salient, eye-catching copy to generate higher interest.
          </p>
          <div className="space-y-4">
            <CaseImg src={bannerFull} alt="Banner ad example — full width" />
            <div className="grid grid-cols-3 gap-4">
              <CaseImg src={banner2col1} alt="Banner ad example 2" />
              <CaseImg src={banner2col2} alt="Banner ad example 3" />
              <CaseImg src={banner2col3} alt="Banner ad example 4" />
            </div>
          </div>
        </div>

        {/* EMAIL & SOCIAL */}
        <div className="mb-12">
          <SectionHeading>Email & Social</SectionHeading>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            If there are two things online that are sacred, it's a person's inbox and their news feed. While ultimately invasive, I would always write social media ads and emails with a more personal touch so as to soften the blow of seeing ads in these sacred spaces.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <CaseImg src={email1} alt="Email / social ad example 1" />
              <CaseImg src={email2} alt="Email / social ad example 2" />
              <CaseImg src={email3} alt="Email / social ad example 3" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <CaseImg src={email4} alt="Email / social ad example 4" />
              <CaseImg src={email5} alt="Email / social ad example 5" />
              <CaseImg src={email6} alt="Email / social ad example 6" />
            </div>
          </div>
        </div>

        {/* LANDING PAGES */}
        <div className="mb-12">
          <SectionHeading>Landing Pages</SectionHeading>
          <p className="text-base leading-relaxed text-[#ffffff] mb-6">
            Often, we would need dedicated landing pages for a specific client or promotion. Regardless, they would need to capture all of the most important information that a person might need to know before filling out a form or going through a flow.
          </p>
          <div className="space-y-4">
            <CaseImg src={landing1} alt="Landing page example 1" />
            <CaseImg src={landing2} alt="Landing page example 2" />
          </div>
        </div>

      </div>
    </main>
  );
}
