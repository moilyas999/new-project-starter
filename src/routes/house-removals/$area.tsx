import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin } from "lucide-react";

import { ContactActions } from "@/components/site/contact-actions";
import { JsonLd } from "@/components/site/json-ld";
import { SiteLayout } from "@/components/site/layout";
import { PageHero, Prose, Section, SectionHeading } from "@/components/site/primitives";
import { CtaBand, FaqSection, ServiceCard } from "@/components/site/sections";
import { areas, getArea, type Area } from "@/config/areas";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { path } from "@/lib/paths";
import { seo } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

const areaFaqs = (area: Area) => [
  {
    q: `Do you cover ${area.name}?`,
    a: `Yes. We are based in London and cover ${area.name} and the surrounding ${area.region} area for house removals, flat moves, packing and storage.`,
  },
  {
    q: `Can you move me out of ${area.name} to another part of the UK?`,
    a: `Yes — long-distance moves out of ${area.name} are a regular job for us. Tell us your destination when you request a quote and we'll plan the day around the journey.`,
  },
  {
    q: `How much does a house move in ${area.name} cost?`,
    a: "It depends on the size of the property, the access at both ends, how much packing you'd like and the date. That's why we quote each move individually rather than publishing a headline price.",
  },
  {
    q: "What if my completion date changes?",
    a: "Tell us as soon as you know. Our quote form lets you mark your date as approximate or flexible, and we plan for chains that move.",
  },
];

export const Route = createFileRoute("/house-removals/$area")({
  loader: ({ params }) => {
    const area = getArea(params.area);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => {
    const area = loaderData?.area;
    if (!area) return {};
    return seo({
      title: `House Removals in ${area.name} | ${area.region} | House Moving Experts`,
      description: `Professional house removals in ${area.name}. We handle home and flat moves in ${area.name} and across ${area.region}, plus packing, storage and long-distance moves. Get a free quote.`,
      path: `/house-removals/${area.slug}`,
    });
  },
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();
  const relatedServices = services.filter((s) =>
    ["office-removals", "packing-and-unpacking-services", "storage-services"].includes(s.slug),
  );

  return (
    <SiteLayout>
      <JsonLd
        data={serviceSchema({
          name: `House Removals in ${area.name}`,
          description: `House and flat removals in ${area.name}, ${area.region}, from London-based removals company House Moving Experts.`,
          path: `/house-removals/${area.slug}`,
        })}
      />
      <JsonLd data={faqSchema(areaFaqs(area))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "House Removals", path: "/house-removals" },
          { name: area.name, path: `/house-removals/${area.slug}` },
        ])}
      />

      <PageHero
        breadcrumb={
          <nav aria-label="Breadcrumb" className="text-sm text-primary-foreground/60">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <Link
                  to="/"
                  className="inline-flex min-h-9 items-center hover:text-primary-foreground"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  to="/house-removals"
                  className="inline-flex min-h-9 items-center hover:text-primary-foreground"
                >
                  House Removals
                </Link>
              </li>
              <li aria-hidden className="hidden sm:list-item">
                /
              </li>
              <li className="hidden text-primary-foreground sm:list-item">{area.name}</li>
            </ol>
          </nav>
        }
        eyebrow={
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/80 sm:px-3.5 sm:text-xs">
            <MapPin className="size-3.5 text-highlight" aria-hidden />
            {area.region}
          </p>
        }
        title={`House removals in ${area.name}`}
        lead={area.summary}
        actions={<ContactActions size="lg" inverted />}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <Prose>
              {area.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>

            <h2 className="mt-10 text-xl font-bold tracking-tight">
              Moving in and out of {area.name}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {area.localNotes.map((note) => (
                <li key={note} className="flex gap-3 text-[15px] leading-relaxed">
                  <Check className="mt-1 size-4 shrink-0 text-highlight-foreground" aria-hidden />
                  <span className="text-muted-foreground">{note}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-bold tracking-tight">
              What we can do for your {area.name} move
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {[
                "House and flat removals",
                "Full, part and fragile packing",
                "Unpacking at your new home",
                "Furniture dismantling and reassembly",
                "Storage between properties",
                "Long-distance moves out of the area",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                  <Check className="mt-1 size-4 shrink-0 text-highlight-foreground" aria-hidden />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-base font-bold tracking-tight">
                Removals in {area.name}, from a London team
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {business.brandName} is based in {business.location} and covers {area.name} along
                with the rest of {area.region} — and moves customers on to destinations across the
                UK.
              </p>
              <Link
                to="/quote"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-highlight text-[15px] font-bold text-highlight-foreground transition-transform hover:-translate-y-0.5"
              >
                Get a Free Quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-base font-bold tracking-tight">Other areas</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {areas
                  .filter((a) => a.slug !== area.slug)
                  .slice(0, 8)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link
                        to={path(`/house-removals/${a.slug}`)}
                        className="inline-flex min-h-9 items-center rounded-lg border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent"
                      >
                        {a.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                to="/areas-we-cover"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              >
                All areas we cover
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <FaqSection faqs={areaFaqs(area)} title={`Removals in ${area.name} — common questions`} />

      <Section>
        <SectionHeading eyebrow="Also from us" title="More than just moving day" />
        <div className="ttt-snap-row mt-8 sm:mt-10">
          {relatedServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <CtaBand
        title={`Moving in ${area.name}?`}
        body="Tell us about your move and we'll come back with a quote and a plan for the day."
      />
    </SiteLayout>
  );
}
