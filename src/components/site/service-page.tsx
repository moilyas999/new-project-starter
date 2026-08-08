import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { ContactActions } from "@/components/site/contact-actions";
import { JsonLd } from "@/components/site/json-ld";
import { SiteLayout } from "@/components/site/layout";
import { PageHero, Prose, Section, SectionHeading } from "@/components/site/primitives";
import { CtaBand, FaqSection, ServiceCard } from "@/components/site/sections";
import { business, businessClaims } from "@/config/business";
import { services, type Service } from "@/config/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

export function ServicePage({ service }: { service: Service }) {
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <SiteLayout>
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.summary,
          path: `/${service.slug}`,
        })}
      />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/${service.slug}` },
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
                  to="/services"
                  className="inline-flex min-h-9 items-center hover:text-primary-foreground"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-primary-foreground">{service.title}</li>
            </ol>
          </nav>
        }
        title={service.title}
        lead={service.summary}
        actions={<ContactActions size="lg" inverted />}
        meta={
          <>
            {business.coverageShort}
            {businessClaims.available24Hours ? ` · ${business.businessHours}` : ""}
          </>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <Prose>
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>

            <div className="mt-10 space-y-8">
              {service.blocks.map((block) => (
                <div key={block.heading}>
                  <h2 className="text-xl font-bold tracking-tight">{block.heading}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                        <Check
                          className="mt-1 size-4 shrink-0 text-highlight-foreground"
                          aria-hidden
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 lg:sticky lg:top-28 lg:self-start">
            {service.highlights.map((highlight) => (
              <div key={highlight.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-bold tracking-tight">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {highlight.body}
                </p>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-base font-bold tracking-tight">Not sure what you need?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tell us about the move and we'll tell you honestly what's worth adding and what
                isn't.
              </p>
              <Link
                to="/quote"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-highlight text-[15px] font-bold text-highlight-foreground transition-transform hover:-translate-y-0.5"
              >
                Get a Free Quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <FaqSection faqs={service.faqs} title={`${service.title} — common questions`} />

      <Section>
        <SectionHeading eyebrow="Also from us" title="Other ways we can help" />
        <div className="ttt-snap-row mt-8 sm:mt-10">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <Link
          to="/services"
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
        >
          See all removals services
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Section>

      <CtaBand
        title={`Get a ${service.title.toLowerCase()} quote`}
        body="Tell us about your move and we'll come back with a quote and a plan for the day."
      />
    </SiteLayout>
  );
}
