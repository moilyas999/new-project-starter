import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  Globe,
  Home,
  MapPin,
  MessageSquare,
  Package,
  Route as RouteIcon,
  ShieldCheck,
  Star,
  Truck,
  Warehouse,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";

import { ContactActions, QuoteButton, CallButton } from "@/components/site/contact-actions";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { business, businessClaims, googleBusiness, pricing } from "@/config/business";
import { approvedReviews, googleSummary, reviewThemes } from "@/config/reviews";
import { removalsServices, supportServices, type Service } from "@/config/services";
import { path } from "@/lib/paths";
import { cn } from "@/lib/utils";

const icons: Record<Service["icon"], ComponentType<{ className?: string }>> = {
  home: Home,
  briefcase: Briefcase,
  building: Building2,
  mapPin: MapPin,
  route: RouteIcon,
  globe: Globe,
  package: Package,
  warehouse: Warehouse,
  wrench: Wrench,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      to={path(`/${service.slug}`)}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/15 hover:shadow-lg"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-highlight group-hover:text-highlight-foreground">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-tight">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

export function ServicesSection({ tone = "default" }: { tone?: "default" | "surface" }) {
  return (
    <Section tone={tone} id="services">
      <SectionHeading
        eyebrow="What we move"
        title="Removals for homes and businesses"
        lead="One team for the whole move — packing, dismantling, transport and putting everything back together at the other end."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {removalsServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <h3 className="mt-16 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Moving support
      </h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {supportServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  );
}

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Care",
    body: "Your belongings are handled the way we'd want ours handled — wrapped, protected and packed properly before they go anywhere.",
  },
  {
    icon: Truck,
    title: "Reliability",
    body: "A professional team and a move that's been planned before the day, so we arrive when we said we would.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    body: "Clear updates from your first quote through to the last box, and a number that reaches an actual person.",
  },
  {
    icon: Clock,
    title: "Flexibility",
    body: "Straightforward moves and complicated ones. Confirmed dates, approximate dates, and chains that shift at the last minute.",
  },
];

export function TrustSection() {
  return (
    <Section tone="ink">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-highlight">
            Why move with TTT
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Moving day should be the boring part
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-foreground/75">
            Everything else about moving home is stressful enough. Our job is to make the part we're
            responsible for completely uneventful.
          </p>
          <ContactActions className="mt-8" inverted />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {trustPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-6"
            >
              <pillar.icon className="size-5 text-highlight" aria-hidden />
              <h3 className="mt-4 text-base font-bold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">{pillar.body}</p>
            </div>
          ))}
          {businessClaims.noHiddenCharges ? (
            <div className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-6 sm:col-span-2">
              <h3 className="text-base font-bold">Straightforward pricing</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">
                Clear quotes, from the first conversation to moving day. No nasty surprises.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

const steps = [
  {
    step: "01",
    title: "Tell us about your move",
    body: "Answer a few quick questions about where you're moving from, where you're going and roughly when.",
  },
  {
    step: "02",
    title: "Get your quote",
    body: businessClaims.quoteResponseTime
      ? `We review the details and come back to you ${businessClaims.quoteResponseTime}.`
      : "We review the details and come back to you with a quote and a plan for the day.",
  },
  {
    step: "03",
    title: "Book your date",
    body: "Confirm the day that works for you. If your date is still moving, tell us — we plan for that.",
  },
  {
    step: "04",
    title: "We move you",
    body: "Our team arrives, protects and loads everything, and puts it all back where it belongs at the other end.",
  },
];

export function HowItWorksSection() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps, no guesswork"
        lead="From first enquiry to the kettle going on in your new kitchen."
      />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <li key={item.step} className="rounded-2xl border border-border bg-card p-6">
            <span className="text-sm font-black tracking-tight text-highlight-foreground">
              {item.step}
            </span>
            <h3 className="mt-3 text-base font-bold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <QuoteButton size="lg" />
      </div>
    </Section>
  );
}

export function ReviewsSection({ tone = "default" }: { tone?: "default" | "surface" }) {
  const hasReviews = approvedReviews.length > 0;
  const summary = googleSummary;

  return (
    <Section tone={tone} id="reviews">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Reputation"
          title="Loved by our customers"
          lead="Customers keep coming back to the same few things when they talk about moving with TTT."
        />
        {summary ? (
          <div className="shrink-0 rounded-2xl border border-border bg-card px-5 py-4">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-4",
                    i < Math.round(summary.rating)
                      ? "fill-highlight text-highlight"
                      : "text-border",
                  )}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold">{summary.rating.toFixed(1)} on Google</p>
            <p className="text-xs text-muted-foreground">from {summary.reviewCount} reviews</p>
          </div>
        ) : null}
      </div>

      {hasReviews ? (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {approvedReviews.map((review, i) => (
            <figure
              key={`${review.author}-${i}`}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} className="size-4 fill-highlight text-highlight" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                “{review.body}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold">
                {review.author}
                {review.service ? (
                  <span className="block text-xs font-normal text-muted-foreground">
                    {review.service}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviewThemes.map((theme) => (
            <div key={theme.title} className="rounded-2xl border border-border bg-card p-6">
              <Star className="size-5 fill-highlight text-highlight" aria-hidden />
              <h3 className="mt-4 text-base font-bold tracking-tight">{theme.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{theme.body}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {googleBusiness.reviewsUrl ? (
          <a
            href={googleBusiness.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-input bg-background px-5 text-[15px] font-semibold transition-colors hover:bg-accent"
          >
            Read our Google Reviews
            <ArrowRight className="size-4" aria-hidden />
          </a>
        ) : null}
        <Link
          to="/reviews"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-input bg-background px-5 text-[15px] font-semibold transition-colors hover:bg-accent"
        >
          More about our reviews
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}

export function CoverageSection() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Areas we cover
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            London-based removals, moving you anywhere in the UK
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We're based in London and we move customers across the capital every day — and out to
            destinations right across the country. Same team, same care, whether you're moving one
            postcode over or three hundred miles away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/areas-we-cover"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-input bg-background px-5 text-[15px] font-semibold transition-colors hover:bg-accent"
            >
              See areas we cover
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <CallButton size="md" variant="outline" showNumber />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary p-10 text-primary-foreground">
          <div className="ttt-grid-backdrop absolute inset-0 text-primary-foreground" aria-hidden />
          <div className="relative">
            <MapPin className="size-7 text-highlight" aria-hidden />
            <p className="mt-6 text-2xl font-extrabold tracking-tight">{business.location}</p>
            <p className="mt-2 text-primary-foreground/75">{business.coverageShort}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-primary-foreground/15 pt-8 text-sm">
              <div>
                <dt className="text-primary-foreground/60">Hours</dt>
                <dd className="mt-1 font-semibold">{business.businessHours}</dd>
              </div>
              <div>
                <dt className="text-primary-foreground/60">Coverage</dt>
                <dd className="mt-1 font-semibold">{business.serviceCoverage}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function FaqSection({
  faqs,
  title = "Common questions",
  tone = "surface",
}: {
  faqs: { q: string; a: string }[];
  title?: string;
  tone?: "default" | "surface";
}) {
  if (faqs.length === 0) return null;
  return (
    <Section tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          title={title}
          lead="Can't see your question? Give us a call — we'd rather talk it through."
        />
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-[15px] font-semibold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

export function CtaBand({
  title = "Ready to get moving?",
  body = "Tell us about your move and we'll come back with a quote and a plan for the day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-highlight text-highlight-foreground">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg leading-relaxed opacity-80">{body}</p>
            {pricing.showFromPrice && pricing.hourlyFrom ? (
              <p className="mt-3 text-sm font-semibold">
                From {pricing.currencySymbol}
                {pricing.hourlyFrom}/hr
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/quote"
              className="inline-flex h-14 items-center gap-2 rounded-xl bg-highlight-foreground px-7 text-base font-semibold text-highlight transition-transform hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <CallButton
              size="lg"
              showNumber
              className="border border-highlight-foreground/25 bg-transparent text-highlight-foreground hover:bg-highlight-foreground/10"
              variant="outline"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
