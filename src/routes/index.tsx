import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, MapPin, ShieldCheck } from "lucide-react";

import { ContactActions } from "@/components/site/contact-actions";
import { JsonLd } from "@/components/site/json-ld";
import { SiteLayout } from "@/components/site/layout";
import { Container } from "@/components/site/primitives";
import {
  CoverageSection,
  CtaBand,
  FaqSection,
  HowItWorksSection,
  ReviewsSection,
  ServicesSection,
  TrustSection,
} from "@/components/site/sections";
import { business, businessClaims } from "@/config/business";
import { removalsServices } from "@/config/services";
import { path } from "@/lib/paths";
import { seo } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";

const homeFaqs = [
  {
    q: "What areas does TTT cover?",
    a: "We're based in London and cover the whole capital, as well as moves to and from destinations across the UK. We also arrange international removals.",
  },
  {
    q: "How do I get a quote?",
    a: "Use the quote form and tell us about your move — where you're going, roughly when, and what needs moving. You can also call or message us if you'd rather talk it through.",
  },
  {
    q: "What if my moving date isn't confirmed yet?",
    a: "That's completely normal with property chains. Our quote form lets you say your date is approximate, flexible, or not known yet, and we'll plan around it.",
  },
  {
    q: "Can you pack for me?",
    a: "Yes. We offer full packing, part packing for selected rooms, fragile-only packing, and unpacking at the other end. Add it to your quote request.",
  },
  {
    q: "Do you move offices and businesses as well as homes?",
    a: "Yes. Office removals and commercial removals — including warehouse and stockroom moves — are a big part of what we do, and can be planned around your working week.",
  },
  {
    q: "Can you store our belongings between properties?",
    a: "Yes. Storage can be built into your move for when your dates don't line up or you're renovating before you move in.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "TTT | Professional Removals in London & Across the UK",
      description:
        "TTT — Total Transport Team. Professional house, office and commercial removals from London to destinations across the UK. Careful packing, reliable teams, clear quotes.",
      path: "/",
    }),
  component: Home,
});

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="ttt-grid-backdrop absolute inset-0 text-primary-foreground" aria-hidden />
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/80">
              <MapPin className="size-3.5 text-highlight" aria-hidden />
              London-based removals
            </p>

            <h1 className="mt-6 text-[2.65rem] font-black leading-[1.03] tracking-tight sm:text-6xl">
              Moving made simple.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80 sm:text-xl">
              Professional removals across London &amp; the UK. TTT moves homes and businesses —
              packed properly, handled carefully, and delivered when we said we would.
            </p>

            <ContactActions className="mt-9" size="lg" inverted />

            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-primary-foreground/75">
              <li className="inline-flex items-center gap-2">
                <Check className="size-4 text-highlight" aria-hidden />
                Homes &amp; businesses
              </li>
              <li className="inline-flex items-center gap-2">
                <Check className="size-4 text-highlight" aria-hidden />
                Packing &amp; storage
              </li>
              {businessClaims.available24Hours ? (
                <li className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-highlight" aria-hidden />
                  {business.businessHours}
                </li>
              ) : null}
            </ul>
          </div>

          <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-7 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-6 text-highlight" aria-hidden />
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
                Start your move
              </p>
            </div>
            <p className="mt-5 text-xl font-bold leading-snug">
              Tell us about your move and we'll come back with a quote and a plan for the day.
            </p>
            <ul className="mt-6 space-y-3">
              {removalsServices.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={path(`/${service.slug}`)}
                    className="group flex items-center justify-between rounded-xl border border-primary-foreground/15 px-4 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
                  >
                    {service.title}
                    <ArrowRight
                      className="size-4 opacity-60 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/quote"
              className="mt-6 flex h-14 items-center justify-center gap-2 rounded-xl bg-highlight text-base font-bold text-highlight-foreground transition-transform hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Home() {
  return (
    <SiteLayout>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <ServicesSection />
      <TrustSection />
      <HowItWorksSection />
      <ReviewsSection />
      <CoverageSection />
      <FaqSection faqs={homeFaqs} />
      <CtaBand />
    </SiteLayout>
  );
}
