import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";

import { ContactActions } from "@/components/site/contact-actions";
import { SiteLayout } from "@/components/site/layout";
import { PageHero, Section, SectionHeading } from "@/components/site/primitives";
import { CtaBand } from "@/components/site/sections";
import { areas } from "@/config/areas";
import { business } from "@/config/business";
import { path } from "@/lib/paths";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/areas-we-cover")({
  head: () =>
    seo({
      title: "Areas We Cover | Removals in London & Across the UK | TTT",
      description:
        "TTT is a London-based removals company covering every London borough and moves to destinations across the UK. Find your area or call us for anywhere else.",
      path: "/areas-we-cover",
    }),
  component: AreasPage,
});

function AreasPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Areas we cover"
        lead="Professional removals from London to destinations across the UK. We're based in London, we work across every borough, and we travel — so if your area isn't listed here, it doesn't mean we can't help."
        actions={<ContactActions size="lg" inverted />}
      />

      <Section>
        <SectionHeading
          eyebrow="Local removals"
          title="Find your area"
          lead="Local pages with practical notes about moving in and out of each area."
        />
        <div className="mt-9 grid gap-3.5 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              to={path(`/house-removals/${area.slug}`)}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-highlight group-hover:text-highlight-foreground">
                <MapPin className="size-5" aria-hidden />
              </span>
              <h2 className="mt-5 text-lg font-bold tracking-tight">{area.name}</h2>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {area.region}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {area.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                Removals in {area.name}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          <SectionHeading
            title="Moving somewhere that isn't listed?"
            lead={`We're a London-based removals company and we move customers to destinations across the UK — ${business.serviceCoverage}. Tell us where you're going and we'll quote for it.`}
          />
          <div className="rounded-2xl border border-border bg-card p-7">
            <h3 className="text-lg font-bold tracking-tight">Moving out of London?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Long-distance moves are one of the most common jobs we do. We pack for the journey,
              plan realistic arrival times, and keep you updated on the day.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/long-distance-moving"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-input px-5 text-[15px] font-semibold transition-colors hover:bg-accent"
              >
                Long-distance removals
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/international-moving"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-input px-5 text-[15px] font-semibold transition-colors hover:bg-accent"
              >
                International removals
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
