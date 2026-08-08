import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { ContactActions } from "@/components/site/contact-actions";
import { JsonLd } from "@/components/site/json-ld";
import { SiteLayout } from "@/components/site/layout";
import { Container, Prose, Section, SectionHeading } from "@/components/site/primitives";
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

      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="ttt-grid-backdrop absolute inset-0 text-primary-foreground" aria-hidden />
        <Container className="relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-primary-foreground/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-primary-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to="/services" className="hover:text-primary-foreground">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-primary-foreground">{service.title}</li>
            </ol>
          </nav>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            {service.summary}
          </p>
          <ContactActions className="mt-8" size="lg" inverted />
          <p className="mt-6 text-sm text-primary-foreground/60">
            {business.coverageShort}
            {businessClaims.available24Hours ? ` · ${business.businessHours}` : ""}
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
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

          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
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
        <SectionHeading eyebrow="Also from TTT" title="Other ways we can help" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <Link
          to="/services"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
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
