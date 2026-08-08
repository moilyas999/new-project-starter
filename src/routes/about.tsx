import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ContactActions } from "@/components/site/contact-actions";
import { SiteLayout } from "@/components/site/layout";
import { Container, Prose, Section, SectionHeading } from "@/components/site/primitives";
import { CoverageSection, CtaBand, ReviewsSection } from "@/components/site/sections";
import { business, businessClaims } from "@/config/business";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About TTT | Total Transport Team Ltd | London Removals",
      description:
        "TTT stands for Total Transport Team — the same team, with a sharper focus on moving homes and businesses across London and the UK. Here's how we work.",
      path: "/about",
    }),
  component: AboutPage,
});

const values = [
  {
    title: "We do one thing",
    body: "Removals. Not couriers, not recovery, not chauffeurs. Every person, van and process here is pointed at moving homes and businesses well.",
  },
  {
    title: "We plan before we lift",
    body: "Most moves that go wrong went wrong at the planning stage. We ask about access, stairs, parking and timings up front so moving day is uneventful.",
  },
  {
    title: "We tell you the truth",
    body: "If a move needs a bigger team, an extra day, or packing you weren't planning on, we'd rather say so at the quote stage than on the day.",
  },
  {
    title: "We turn up",
    body: "Reliability is the whole job. Your completion, your keys and your tenancy all depend on us being where we said we'd be.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="ttt-grid-backdrop absolute inset-0 text-primary-foreground" aria-hidden />
        <Container className="relative py-14 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            About TTT
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            {business.brandName} stands for {business.brandExpanded} — the same team, with a sharper
            focus on moving homes and businesses.
          </p>
          <ContactActions className="mt-8" size="lg" inverted />
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading title="The same team, a sharper focus" />
            <Prose className="mt-6">
              <p>
                {business.brandExpanded} has always been about getting people and their possessions
                where they need to be. Over the years that covered a lot of ground. Today, we're
                focused on doing one thing exceptionally well: removals.
              </p>
              <p>
                That focus is what {business.brandName} is. Same company, same people,{" "}
                <strong>{business.companyName}</strong> still on the paperwork — but everything you
                see here is about moving homes and businesses, because that's the work we're best at
                and the work our customers keep coming back for.
              </p>
              <p>
                We're based in {business.location} and we move customers across the capital and out
                to destinations across the UK. Some moves are a flat down the road. Some are a
                four-bedroom house to the other end of the country, or an office that has to be back
                online on Monday. The care that goes into them is the same.
              </p>
              <p>
                Moving is stressful for reasons mostly outside anyone's control — chains,
                solicitors, keys that arrive late. Our job is to make sure the part we're
                responsible for isn't one of the things you have to worry about.
              </p>
            </Prose>

            {businessClaims.yearsExperience ? (
              <p className="mt-8 rounded-2xl border border-border bg-surface p-6 text-[15px]">
                <strong>{businessClaims.yearsExperience}+ years</strong> of moving experience behind
                every job.
              </p>
            ) : null}
          </div>

          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground">
              <p className="text-4xl font-black tracking-[-0.06em]">TTT</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                {business.brandExpanded}
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-primary-foreground/80">
                {business.tagline} {business.positioning}
              </p>
              <dl className="mt-8 space-y-4 border-t border-primary-foreground/15 pt-6 text-sm">
                <div>
                  <dt className="text-primary-foreground/60">Registered name</dt>
                  <dd className="mt-1 font-semibold">{business.companyName}</dd>
                </div>
                <div>
                  <dt className="text-primary-foreground/60">Based in</dt>
                  <dd className="mt-1 font-semibold">{business.location}</dd>
                </div>
                <div>
                  <dt className="text-primary-foreground/60">Coverage</dt>
                  <dd className="mt-1 font-semibold">{business.serviceCoverage}</dd>
                </div>
                <div>
                  <dt className="text-primary-foreground/60">Hours</dt>
                  <dd className="mt-1 font-semibold">{business.businessHours}</dd>
                </div>
              </dl>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              See everything we move
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="How we work" title="Four things we don't compromise on" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-bold tracking-tight">{value.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{value.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <ReviewsSection />
      <CoverageSection />
      <CtaBand title="Let's talk about your move" />
    </SiteLayout>
  );
}
