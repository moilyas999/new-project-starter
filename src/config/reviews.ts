/**
 * Customer reviews.
 *
 * RULES
 * -----
 * 1. Never hard-code a Google rating or review count anywhere else in the
 *    codebase. `googleSummary` below is the only place it may live, and it
 *    stays `null` until it is either fetched live or confirmed by the owner.
 * 2. Never invent a reviewer or a quote. `approvedReviews` is empty until
 *    genuine, approved reviews are migrated in.
 * 3. Because the rating and count are unverified, they are deliberately NOT
 *    emitted as `aggregateRating` in structured data — publishing an unverified
 *    aggregate rating is a Google policy problem as well as a factual one.
 */

export type ApprovedReview = {
  /** Reviewer name exactly as published on the source platform. */
  author: string;
  /** 1–5. */
  rating: number;
  /** The review text, unedited. */
  body: string;
  /** ISO date the review was left, if known. */
  date?: string;
  /** Which service the review relates to, if known. */
  service?: string;
  source: "google" | "checkatrade" | "facebook" | "direct";
};

/**
 * Genuine, approved reviews.
 *
 * TODO(owner): migrate real reviews from the Google Business Profile here, or
 * connect the live integration below. Until then the site shows the themes
 * customers consistently raise (see `reviewThemes`) and links to Google,
 * rather than displaying invented testimonials.
 */
export const approvedReviews: ApprovedReview[] = [];

/**
 * Live Google Business Profile summary.
 *
 * TODO(owner): populate from a live Google Business Profile / Places
 * integration, or set explicitly once confirmed. Leave `null` and the rating
 * badge simply isn't rendered.
 */
export const googleSummary: { rating: number; reviewCount: number } | null = null;

/**
 * Themes that come up repeatedly in the company's existing customer feedback.
 * These are descriptions of what customers value — not quotes, and not
 * attributed to any individual.
 */
export const reviewThemes: { title: string; body: string }[] = [
  {
    title: "Careful with belongings",
    body: "Furniture and fragile items handled properly, and things arriving in the condition they left in.",
  },
  {
    title: "Turns up on time",
    body: "Punctuality on moving day, when the rest of the schedule depends on it.",
  },
  {
    title: "Good communication",
    body: "Knowing what's happening, who's coming and when — from the quote through to the last box.",
  },
  {
    title: "Available at short notice",
    body: "Help when plans change late, which in UK property chains they often do.",
  },
  {
    title: "Fair pricing",
    body: "A clear quote up front and no confusion about the number at the end.",
  },
  {
    title: "Friendly, professional team",
    body: "A crew that's easy to have in your home on a stressful day — and one people book again.",
  },
];
