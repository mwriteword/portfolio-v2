import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CaseStudy2() {
  return (
    <main className="min-h-screen text-gray-900 bg-[#2e2e2e]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="flex items-center gap-2 text-[#22c55e] hover:text-[#4ade80] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-bold tracking-tight text-[48px] text-[#ffffff] mb-6">
          Content Strategy & Behavior Change — Opower
        </h1>

        <div className="space-y-6 text-base leading-relaxed text-[#ffffff]">
          <p>Case study content coming soon...</p>
        </div>
      </div>
    </main>
  );
}
