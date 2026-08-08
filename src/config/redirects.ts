/**
 * 301 redirect map for the migration from the legacy Total Transport Team
 * website to the TTT removals site.
 *
 * Source of truth: `bun run seo:generate` writes public/_redirects,
 * public/robots.txt and public/sitemap.xml from this file and the service /
 * area configs. Edit here, not in public/.
 *
 * IMPORTANT: the legacy URL inventory below was assembled from search-engine
 * results for the live domain, because the old site itself was not reachable
 * from the build environment. Before go-live, export the full URL list from
 * Google Search Console (Pages report) and server logs and reconcile it with
 * this map — see docs/seo-migration.md.
 */

export type RedirectRule = {
  from: string;
  /** Where it goes. `null` means the page is retired with no relevant equivalent. */
  to: string | null;
  /** Why — kept so the map can be reviewed rather than trusted blindly. */
  note: string;
};

/**
 * Legacy removals URLs that are PRESERVED — same URL, rebuilt content.
 * These must not be redirected; they carry the site's existing search equity.
 */
export const preservedUrls: string[] = [
  "/house-removals",
  "/house-removals/slough",
  "/office-removals",
  "/commercial-moving",
  "/local-removals",
  "/long-distance-moving",
  "/international-moving",
  "/packing-and-unpacking-services",
  "/storage-services",
  "/about",
  "/contact",
];

/**
 * Consolidations — a legacy removals page whose content now lives inside a
 * broader page. These keep their equity by pointing at a genuinely relevant
 * replacement.
 */
export const consolidations: RedirectRule[] = [
  {
    from: "/warehouse-moving",
    to: "/commercial-moving",
    note: "Warehouse moves are now covered within Commercial Removals to keep consumer navigation simple.",
  },
  {
    from: "/man-van-services",
    to: "/local-removals",
    note: "Man-and-van enquiries are short local moves — Local Removals is the closest genuine equivalent.",
  },
  {
    from: "/moving-services",
    to: "/services",
    note: "Legacy services hub → new removals services hub.",
  },
  {
    from: "/services/house-removals",
    to: "/house-removals",
    note: "Defensive: any nested variant of the house removals URL.",
  },
  {
    from: "/quote-request",
    to: "/quote",
    note: "Legacy enquiry form → new multi-step quote flow.",
  },
  {
    from: "/get-a-quote",
    to: "/quote",
    note: "Legacy quote URL variant.",
  },
];

/**
 * Retired legacy transport services.
 *
 * TTT no longer markets these, and there is no removals page that genuinely
 * matches the intent behind them — someone searching for breakdown recovery is
 * not looking for a removals company. Redirecting them all to the homepage
 * would create soft 404s, so they are retired.
 *
 * Preferred handling is HTTP 410 Gone where the host supports it; the
 * generated _redirects file falls back to 404 on hosts that don't.
 */
export const retiredUrls: RedirectRule[] = [
  { from: "/vehicle-transport-recovery", to: null, note: "Legacy vehicle transport / recovery." },
  { from: "/car-recovery", to: null, note: "Legacy car recovery." },
  { from: "/car-transport", to: null, note: "Legacy car transport." },
  { from: "/roadside-assistance", to: null, note: "Legacy roadside assistance." },
  { from: "/jump-start-services", to: null, note: "Legacy jump start services." },
  { from: "/breakdown-recovery/*", to: null, note: "Legacy breakdown recovery local pages." },
  { from: "/courier-services", to: null, note: "Legacy courier services." },
  { from: "/pallet-delivery", to: null, note: "Legacy pallet delivery." },
  { from: "/executive-travel", to: null, note: "Legacy executive travel / chauffeur hire." },
  { from: "/chauffeur-hire", to: null, note: "Legacy chauffeur hire." },
  { from: "/airport-transfers", to: null, note: "Legacy airport transfers." },
  { from: "/limousine-hire", to: null, note: "Legacy limousine hire." },
];

export const allRules: RedirectRule[] = [...consolidations, ...retiredUrls];
