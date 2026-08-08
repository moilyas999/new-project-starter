/**
 * Single source of truth for TTT business information.
 *
 * Nothing in this file should be duplicated in components — import from here.
 *
 * VERIFICATION POLICY
 * -------------------
 * Values that were carried over from the legacy Total Transport Team website
 * are only treated as fact when they are contact details or service categories.
 * Marketing statistics, accreditations, prices and guarantees are held in
 * `businessClaims` / `pricing` below and default to `null` until the business
 * owner confirms them. Components must not render a claim that is `null`.
 */

export const business = {
  /** Customer-facing brand. */
  brandName: "TTT",
  /** Legal entity — use wherever the registered company name is required. */
  companyName: "Total Transport Team Ltd",
  /** What the initials stand for (used in the logo lockup and About page). */
  brandExpanded: "Total Transport Team",

  tagline: "Moving made simple.",
  positioning: "Professional removals across London & the UK.",

  email: "info@totaltransportteam.co.uk",

  primaryPhoneDisplay: "07719 734031",
  primaryPhoneTel: "+447719734031",
  secondaryPhoneDisplay: "07469 796618",
  secondaryPhoneTel: "+447469796618",

  location: "London, UK",
  serviceCoverage: "London and across the UK",
  coverageShort: "Serving London & the UK",
  businessHours: "Open 24/7",

  /**
   * Production domain — used for canonical URLs, sitemap entries and JSON-LD.
   * This is an existing, indexed domain: see docs/seo-migration.md.
   */
  siteUrl: "https://totaltransportteam.co.uk",
} as const;

/**
 * WhatsApp contact.
 *
 * The legacy website offered WhatsApp contact, but the exact number wired into
 * it could not be inspected during this rebuild (the old site was not reachable
 * from the build environment). The primary mobile number is used as the most
 * likely value.
 *
 * TODO(owner): confirm the WhatsApp number, then set `confirmed: true`.
 * If WhatsApp is not offered, set `number: null` and every WhatsApp CTA on the
 * site disappears automatically.
 */
export const whatsapp = {
  number: "447719734031" as string | null,
  confirmed: false,
  defaultMessage: "Hi TTT, I'd like a quote for a move. Here are a few details about it:",
} as const;

export const whatsappLink = whatsapp.number
  ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.defaultMessage)}`
  : null;

export const telLink = (tel: string) => `tel:${tel}`;
export const mailtoLink = `mailto:${business.email}`;

/**
 * Numerical / operational claims that appeared on the legacy website.
 *
 * `null` means "not yet confirmed by the business owner" and nothing is
 * rendered. Fill a value in only once it is genuinely accurate.
 *
 * Legacy website claims awaiting confirmation (do NOT publish as-is):
 *   yearsExperience         — old site said "20+ years"
 *   customersServed         — old site said "800+ happy customers"
 *   vehicleNetwork          — old site said "1,000+ vehicles and drivers"
 *   movesCompleted          — old site said "12,000+ loads moved"
 *   quoteResponseTime       — old site promised quotes "within one hour"
 *   bookingDepositPercentage— old site said a 10% deposit secures a booking
 *   noHiddenCharges         — old site repeatedly said "no hidden charges"
 *   foundedYear             — old site was self-contradictory (2003 vs "since 2005")
 *   accreditations          — old site claimed BAR membership; unverified
 */
export const businessClaims = {
  yearsExperience: null as number | null,
  customersServed: null as number | null,
  vehicleNetwork: null as number | null,
  movesCompleted: null as number | null,
  available24Hours: true,
  noHiddenCharges: null as boolean | null,
  /** e.g. "within 1 hour during business hours" */
  quoteResponseTime: null as string | null,
  bookingDepositPercentage: null as number | null,
  foundedYear: null as number | null,
  /** e.g. ["British Association of Removers"] — only when membership is verified. */
  accreditations: [] as string[],
} as const;

/**
 * Pricing.
 *
 * The legacy website advertised "from £40/hr". Prices change and this was not
 * confirmed for the rebuild, so the site leads with "Get a Free Quote" instead.
 * Set `hourlyFrom` (in whole pounds) once confirmed and the from-price appears
 * wherever pricing is surfaced.
 */
export const pricing = {
  hourlyFrom: null as number | null,
  currencySymbol: "£",
  showFromPrice: false,
} as const;

/**
 * Social profiles.
 *
 * The legacy brand has Facebook, Instagram and X profiles, but the exact
 * profile URLs could not be recovered during the rebuild. Handles are NOT
 * invented here — add the genuine URLs and the icons appear in the footer and
 * on the contact page, and the URLs are added to the JSON-LD `sameAs` array.
 */
export const socials = {
  facebook: null as string | null,
  instagram: null as string | null,
  x: null as string | null,
  linkedin: null as string | null,
} as const;

export const socialLinks = Object.entries(socials).filter(
  (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].length > 0,
);

/**
 * Google Business Profile.
 *
 * `reviewsUrl` should point at the genuine Google reviews listing. Rating and
 * review count are intentionally NOT hard-coded — see src/config/reviews.ts.
 */
export const googleBusiness = {
  profileUrl: null as string | null,
  reviewsUrl: null as string | null,
} as const;
