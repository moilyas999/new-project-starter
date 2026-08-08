import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { PageHero, Section, SectionHeading } from "@/components/site/primitives";
import { ContactActions } from "@/components/site/contact-actions";
import { CtaBand, HowItWorksSection, ServiceCard } from "@/components/site/sections";
import { business } from "@/config/business";
import { removalsServices, supportServices } from "@/config/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    seo({
      title: "Removals Services in London & the UK | House Moving Experts",
      description:
        "House, office, commercial, local, long-distance and international removals, plus packing, storage and furniture dismantling. London-based, UK-wide.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Removals services"
        lead="Everything we do is about moving homes and businesses — from a single-room flat move across London to a full office relocation or a move abroad."
        actions={<ContactActions size="lg" inverted />}
        meta={business.coverageShort}
      />

      <Section>
        <SectionHeading
          eyebrow="Removals"
          title="Moving homes and businesses"
          lead="The core of what we do. Pick the one closest to your move — we'll shape the rest around you."
        />
        <div className="ttt-snap-row mt-9 sm:mt-12">
          {removalsServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Moving support"
          title="The bits that make moving day easier"
          lead="Add any of these to your move and the same team handles them on the same day."
        />
        <div className="ttt-snap-row mt-9 sm:mt-12">
          {supportServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <HowItWorksSection />
      <CtaBand />
    </SiteLayout>
  );
}
