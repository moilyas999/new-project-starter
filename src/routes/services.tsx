import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/layout";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { ContactActions } from "@/components/site/contact-actions";
import { CtaBand, HowItWorksSection, ServiceCard } from "@/components/site/sections";
import { business } from "@/config/business";
import { removalsServices, supportServices } from "@/config/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    seo({
      title: "Removals Services in London & the UK | TTT",
      description:
        "House, office, commercial, local, long-distance and international removals from TTT, plus packing, storage and furniture dismantling. London-based, UK-wide.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="ttt-grid-backdrop absolute inset-0 text-primary-foreground" aria-hidden />
        <Container className="relative py-14 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            Removals services
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            Everything TTT does is about moving homes and businesses — from a single-room flat move
            across London to a full office relocation or a move abroad.
          </p>
          <ContactActions className="mt-8" size="lg" inverted />
          <p className="mt-6 text-sm text-primary-foreground/60">{business.coverageShort}</p>
        </Container>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Removals"
          title="Moving homes and businesses"
          lead="The core of what we do. Pick the one closest to your move — we'll shape the rest around you."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
