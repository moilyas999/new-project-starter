import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";

import { ContactActions } from "@/components/site/contact-actions";
import { SiteLayout } from "@/components/site/layout";
import { PageHero, Prose, Section, SectionHeading } from "@/components/site/primitives";
import { CtaBand, ReviewsSection } from "@/components/site/sections";
import { googleBusiness } from "@/config/business";
import { approvedReviews, googleSummary } from "@/config/reviews";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reviews")({
  head: () =>
    seo({
      title: "Customer Reviews | TTT Removals London",
      description:
        "What customers say about moving with TTT — careful handling, good communication and turning up when we said we would. Read our reviews.",
      path: "/reviews",
    }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Loved by our customers"
        lead="People trust us with everything they own. These are the things they tell us matter most."
        eyebrow={
          googleSummary ? (
            <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3">
              <Star className="size-5 fill-highlight text-highlight" aria-hidden />
              <span className="font-bold">{googleSummary.rating.toFixed(1)} on Google</span>
              <span className="text-primary-foreground/60">
                from {googleSummary.reviewCount} reviews
              </span>
            </div>
          ) : null
        }
        actions={<ContactActions size="lg" inverted />}
      />

      <ReviewsSection />

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <SectionHeading
            eyebrow="Our reviews"
            title="Real reviews, from real moves"
            lead="We only publish reviews customers have actually left us."
          />
          <Prose>
            <p>
              Our reviews come from customers on our Google Business Profile. We don't write
              testimonials for ourselves, and we don't publish a rating we can't stand behind.
            </p>
            {approvedReviews.length === 0 ? (
              <p>
                We're in the middle of moving our reviews across to this site. In the meantime, the
                quickest way to see what customers say is to read them on Google — or give us a call
                and ask us anything you like about how we work.
              </p>
            ) : null}
            <p>
              Moved with us recently? Leaving a review genuinely helps other people decide who to
              trust with their home.
            </p>
            {googleBusiness.reviewsUrl ? (
              <p>
                <a
                  href={googleBusiness.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-foreground hover:underline"
                >
                  Read our Google Reviews
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </p>
            ) : null}
          </Prose>
        </div>
      </Section>

      <CtaBand title="Ready to move with TTT?" />
    </SiteLayout>
  );
}
