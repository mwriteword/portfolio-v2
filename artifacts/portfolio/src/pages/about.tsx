import { Link } from "wouter";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { WritingNav } from "../components/WritingNav";
import { Breadcrumbs } from "../components/Breadcrumbs";

// Google Calendar appointment-scheduling booking page (matches the nav CTA).
const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2i1JtJLb7GAUKgfIkvBWBvA1qn5-ZBOsxF3_x0nwVFNrpr2_w_xmdqhNFxRUZc2G6Eg0bM5-Ld";

// Inline external link styling, consistent across the long-form copy.
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  );
}

// A photo that floats beside the prose (right or left) on larger screens and
// stacks full-width on mobile. `side` sets which way the text wraps.
function FloatFigure({
  src,
  alt,
  caption,
  side,
}: {
  src: string;
  alt: string;
  caption: string;
  side: "left" | "right";
}) {
  const floatClass =
    side === "right"
      ? "md:float-right md:ml-8"
      : "md:float-left md:mr-8";
  return (
    <figure
      className={`mb-6 w-full md:mb-3 md:w-[300px] lg:w-[340px] ${floatClass}`}
    >
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
        className="w-full rounded-lg"
      />
      <figcaption className="mt-2 text-xs italic text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <WritingNav />

      <div className="max-w-[1120px] w-[90%] mx-auto pt-6 pb-12 sm:pt-8 sm:pb-20">
        <Breadcrumbs label="About" theme="light" homeHref="/" />

        {/* Hero */}
        <section className="mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            About
          </p>
          <h1 className="mt-4 font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05]">
            Hello! You can call me Vern.
          </h1>
        </section>

        {/* 1 — Intro (photo floats right) */}
        <section className="mb-14 sm:mb-20">
          <div>
            <FloatFigure
              src="/images/about/portrait.jpg"
              alt="Vern with a group of colleagues"
              caption="I'm the one in the black shirt."
              side="right"
            />
            <p className="text-[17px] sm:text-[19px] leading-relaxed text-foreground">
              I've been writing professionally for 12 years across a lot of
              different contexts and roles. In that time, it's always been the
              same job: deliver the right message at the right time for the right
              person.
            </p>
            <div className="mt-4 space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
              <p>
                The cost of getting that message wrong is often higher than it
                seems. When SaaS products typically start up, staffing for UX
                content isn't usually a priority. Which makes sense at the time:
                between marketing specialists, product managers, and designers,
                they can usually write enough of the interface copy to ship the
                MVP.
              </p>
              <p>
                But that lack of consistency in the content isn't truly felt
                until the product has already begun growing its surfaces and
                developing new features past the minimum requirements. That's
                when inconsistent content starts to cost real money via support
                tickets and continued user drop-off.
              </p>
              <p>
                I've seen firsthand how this can happen in software products.
                I've been on teams with a very real need to wrangle all of the
                errant content and introduce consistency at scale.
              </p>
            </div>
          </div>
        </section>

        {/* 2 — Career (photo floats left) */}
        <section className="mb-14 sm:mb-20">
          <h2 className="mb-6 text-[24px] sm:text-[32px] font-bold tracking-tight">
            From agency to in-house to freelance
          </h2>
          <div>
            <FloatFigure
              src="/images/about/laughing.jpg"
              alt="Vern laughing"
              caption="This is me laughing at a joke you told me."
              side="left"
            />
            <div className="space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
              <p>
                I started my career as a copywriter working at a performance
                marketing agency called QuinStreet. I wrote a lot of email and
                ad campaigns for brand partners like The Home Depot, Chase, and
                HP, but QuinStreet's internal lead-gen sites are where I started
                to learn about UX. Optimizing the content across sign up flows
                and landing pages was where I started crafting messaging with a
                greater focus on the user's perspective.
              </p>
              <p>
                After a few years, I moved to Opower, an energy efficiency
                company that was acquired by Oracle Utilities about a year
                before I joined. Opower was created based on{" "}
                <A href="https://www.apa.org/news/press/releases/2007/09/peerpressure">
                  Dr. Robert Cialdini's psychological research into energy
                  conservation
                </A>
                , which found that peer pressure actually worked best in getting
                people to save energy.
              </p>
              <p>
                To do this at scale, Opower's flagship{" "}
                <A href="https://www.oracle.com/a/ocom/docs/opower-energy-efficiency-solution-product-overview.pdf">
                  Home Energy Report
                </A>{" "}
                was designed to adapt to any utility's branding and deliver
                energy use comparisons directly to customers.
              </p>
              <p>
                At Opower, I developed skills and experience in three specific
                areas:
              </p>
              <ol className="ml-1 list-inside list-decimal space-y-2 marker:font-semibold marker:text-foreground">
                <li>
                  Translating complex, intimidating concepts into plain
                  language.
                </li>
                <li>The psychology of driving behavior change.</li>
                <li>
                  Navigating heavily regulated industries with strict compliance
                  requirements.
                </li>
              </ol>
              <p>
                According to research by Accenture,{" "}
                <A href="https://www.cx4people.com/pdf/accenture-customer-centricity-must-have-waste-energy-pov.pdf">
                  people spend roughly <strong className="font-semibold text-foreground">10 minutes per year</strong> thinking
                  about their utility
                </A>
                . The need for clear, concise language was absolutely critical
                to creating successful energy efficiency products at Opower.
                While there, my biggest projects were leading the content in a{" "}
                <A href="https://www.oracle.com/a/ocom/docs/industries/utilities/utilities-opower-home-energy-reports.pdf">
                  redesign of the Home Energy Report
                </A>{" "}
                and developing{" "}
                <A href="https://www.oracle.com/a/ocom/docs/industries/utilities/utilities-behavioral-load-shaping.pdf">
                  a new email program focused on peak hour energy use and
                  time-of-use rate plans
                </A>
                .
              </p>
              <p>
                After Opower, I joined Atlassian and worked across several teams
                in my tenure there. Across each team, I developed and applied
                the exact framework my services are based on. In my longest
                tenure, I led content for 4 platform apps as the sole content
                designer on the team, building the systems and governance
                standards to keep each of them aligned and consistent enough
                despite different audiences, use cases, and growth needs.
              </p>
              <p className="text-foreground">
                Now, I'm looking to work with product teams that need help
                managing their content. I know what that inconsistency costs, and
                I know how to fix it.
              </p>
            </div>
          </div>
        </section>

        {/* 3 — Life outside work (photo floats right) */}
        <section className="mb-14 sm:mb-20">
          <h2 className="mb-6 text-[24px] sm:text-[32px] font-bold tracking-tight">
            When I'm not working
          </h2>
          <div>
            <FloatFigure
              src="/images/about/family.jpg"
              alt="Vern with his family"
              caption="This is my family and I love them!"
              side="right"
            />
            <div className="space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
              <p>
                You can typically find me playing butler to two small children,
                aged 5.5 and 2.5. They take up the majority of my free time,
                whether they're riding bikes and scooters at the park, bossing me
                around in play time, or demanding snacks and cups of milk.
              </p>
              <p>
                I enjoy cooking as a hobby, but it's hard to qualify something
                you do for survival as a hobby. Most weeknights, it's the usual
                rotations of easy-to-make meals that balance foods I know the
                kids will eat with slightly more adventurous things (like adding
                spinach to spaghetti).
              </p>
              <p>
                But when I find a new recipe I want to try or have an event or
                potluck to cook for, I enjoy the craft of cooking and creating
                something for people to enjoy. Lately, I've been cooking with my
                kids a lot more which has doubled my normal cleanup and tripled
                my bonding time being able to teach what I know about food. This
                has not made them more likely to eat the food we actually cook,
                but we still enjoy doing it.
              </p>
              <p>
                I've also played video games my entire life, another passion I'm
                sharing with my girls. My eldest daughter and I have played
                through all of <em>Princess Peach: Showtime!</em> together, and
                she's recently enjoyed talking to Pokémon friends in{" "}
                <em>Pokémon Pokopia</em>. By most standards, I'm considered an
                oldhead in gaming circles, having been around long enough to know
                firsthand why Discord calls their communities "Servers."
              </p>
              <p>
                We've also taken to playing board games and card games with our
                girls, which brings out a healthy competitiveness in all of us.
                Our feral second child, however, is still learning how to wait
                patiently for her turn and how to not immediately bend cards the
                second we hand them to her. Our current favorites are{" "}
                <em>Sleeping Queens</em>, <em>Hoot, Owl, Hoot!</em>, and{" "}
                <em>Sushi Go!</em>
              </p>
              <p>
                And if I'm not doing any of these things, I've somehow found time
                to sneak away to my local climbing gym to do some bouldering. I'm
                generally not the most athletic, but bouldering satisfies both
                the need for tangible accomplishment and the innate urge to climb
                the really tall thing.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border pt-10 sm:pt-14">
          <div>
            <h2 className="text-[24px] sm:text-[32px] font-bold tracking-tight">
              I think this is the beginning of a beautiful partnership
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
              Book an intro call now and we'll work on a solution together.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                <CalendarPlus className="h-4 w-4 shrink-0" />
                Book a call
              </a>
              <Link
                href="/services"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                See my services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ↑ Back to top
            </button>
          </div>
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
