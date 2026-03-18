import { Mail, Linkedin, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* Hero title */}
        <div className="mb-10">
          <h1 className="sm:text-7xl font-bold tracking-tight text-gray-950 text-[70px]">
            Vernon Laquindanum
          </h1>
          <h1 className="text-6xl sm:text-7xl font-bold leading-tight tracking-tight text-gray-400 mt-1">
            💿 Content Design
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href="mailto:vjtlaq@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="http://linkedin.com/in/vjtlaq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1R7rL1Ndgr0b1lKSF8xvW39OA3-Dy7Md_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Avatar + Bio */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://vjtlaq.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbe7efbf3-2dcd-4e36-8e17-4c59c4ab7e05%2Fb80aa8c3-3a70-4bb9-8617-9a8d7eba895a%2FPhoto_on_3-9-24_at_7.32_PM_2.jpg?table=block&id=02dee1b7-b498-26c9-b2ea-7bf0d4fcb59e&width=250&userId=&cache=v2"
                alt="Vernon Laquindanum"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base text-gray-600 leading-relaxed">
              Hey, I'm Vernon — a content designer with a background in linguistics, editorial strategy, and product writing. I work at the intersection of language and experience, crafting copy that's clear, intentional, and human.
            </p>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              I've worked across SaaS, fintech, and consumer products — helping teams ship better words, faster. Whether it's microcopy, onboarding flows, or content systems, I care deeply about how language shapes the way people feel about a product.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
