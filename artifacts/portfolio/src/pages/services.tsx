import { WritingNav } from "../components/WritingNav";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ServiceMenu } from "../components/ServiceMenu";
import { ContactPanel } from "../components/ContactPanel";
import { services } from "../content/services";

const additionalServices = [
  { name: "Copywriting", desc: "Email, ad copy, landing pages, and more." },
  {
    name: "Editorial services",
    desc: "AI content review, writing review, copyediting, and proofreading.",
  },
  {
    name: "Content writing & SEO",
    desc: "Long-form content and editorial, with analytics and performance tracking.",
  },
];

export default function Services() {
  // Scroll to the contact section (form + booking) at the bottom of this page.
  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto pt-6 pb-12 sm:pt-8 sm:pb-20">
        <Breadcrumbs label="Services" theme="light" homeHref="/" />

        {/* Hero */}
        <section className="mb-14 sm:mb-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Services
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05]">
            Specialized solutions to your content problems
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] sm:text-[20px] text-muted-foreground">
            Whether you want project-based content or ongoing support, I offer a variety of services
            to help you get the UX content expertise you need. Most engagements start with an audit
            and grow from there, but you can select independent engagements as needed.
          </p>
        </section>

        {/* Core offerings — sticky scroll-spy rail; heading pins inside ServiceMenu */}
        <section className="mb-14 sm:mb-20">
          <ServiceMenu services={services} onBookCall={goToContact} />
        </section>

        {/* Additional services */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight mb-2">
            Additional services
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Prices vary based on the size and shape of the engagement. Get in touch and we can work
            out pricing together.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {additionalServices.map(({ name, desc }) => (
              <div key={name} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Not ready for a full audit? — closing CTA with contact form + booking */}
        <section id="contact" className="scroll-mt-24">
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight">
            Need a more customized solution?
          </h2>
          <p className="mt-2 mb-6 text-sm text-muted-foreground">
            These services are just a starting point, and we can work out the right shape and
            solution for your needs. Just tell me what you're working on and we'll work it out
            together.
          </p>
          <ContactPanel />
        </section>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1120px] w-[90%] mx-auto py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vernon Laquindanum
        </div>
      </footer>
    </main>
  );
}
