# TTT removals rebuild — SEO migration & pre-launch checklist

This is a **repositioning of an existing business on an existing, indexed domain**
(`totaltransportteam.co.uk`), not a new site. The rebuild is designed to keep the
search equity that already sits on the removals pages while dropping the legacy
general-transport positioning.

---

## 1. What was verified, and what wasn't

The old website could not be crawled from the build environment (the domain is
blocked by the network egress proxy), so the URL inventory below was reconstructed
from search-engine results for the live domain plus the brief supplied by the
business owner.

**Before go-live you must reconcile this against the real inventory:**

1. Google Search Console → **Pages** report → export every indexed URL.
2. Google Search Console → **Performance** → export the last 12 months of pages by
   clicks/impressions, so pages with genuine removals traffic are obvious.
3. Server access logs / the old CMS sitemap for anything Search Console misses.
4. Compare against `src/config/redirects.ts` and add anything not covered.

Anything not in the redirect map will 404 at launch — which is correct for
retired services, and a loss of equity for anything else.

---

## 2. URLs preserved (do not change)

These legacy removals URLs are rebuilt in place — same path, new content. They
carry the site's existing rankings and must not be "tidied up":

| URL                               | Status                                         |
| --------------------------------- | ---------------------------------------------- |
| `/house-removals`                 | Rebuilt                                        |
| `/house-removals/slough`          | Rebuilt as a local landing page                |
| `/office-removals`                | Rebuilt                                        |
| `/commercial-moving`              | Rebuilt (now also covers warehouse moves)      |
| `/local-removals`                 | Rebuilt                                        |
| `/long-distance-moving`           | Rebuilt                                        |
| `/international-moving`           | Rebuilt, refocused on household/business moves |
| `/packing-and-unpacking-services` | Rebuilt                                        |
| `/storage-services`               | Rebuilt                                        |
| `/about`                          | Rewritten around removals                      |
| `/contact`                        | Rebuilt                                        |

New URLs added: `/services`, `/quote`, `/reviews`, `/areas-we-cover`,
`/furniture-dismantling-reassembly`, `/house-removals/<area>` (11 further areas),
and the three legal pages.

---

## 3. Redirects (301)

Legacy removals URLs whose content now lives inside a broader page:

| From                             | To                   | Why                                                                                |
| -------------------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| `/warehouse-moving`              | `/commercial-moving` | Warehouse moves folded into Commercial Removals to keep consumer navigation simple |
| `/man-van-services`              | `/local-removals`    | Man-and-van intent is a short local move                                           |
| `/moving-services`               | `/services`          | Legacy services hub                                                                |
| `/quote-request`, `/get-a-quote` | `/quote`             | Legacy enquiry form                                                                |

## 4. Retired URLs (not redirected)

TTT no longer markets vehicle recovery, courier, pallet, chauffeur or airport
work. There is no removals page that matches the intent behind those searches, so
redirecting them all to the homepage would create soft 404s and could drag the
whole domain's quality signals down. They are retired instead:

`/vehicle-transport-recovery`, `/car-recovery`, `/car-transport`,
`/roadside-assistance`, `/jump-start-services`, `/breakdown-recovery/*`,
`/courier-services`, `/pallet-delivery`, `/executive-travel`, `/chauffeur-hire`,
`/airport-transfers`, `/limousine-hire`.

**Preferred handling is HTTP 410 Gone.** The generated `public/_redirects` uses
`404` because Cloudflare Pages' `_redirects` format doesn't support 410. If the
site is hosted somewhere that does support it (Netlify, or a custom
worker/middleware), switch those rules to 410 — Google drops 410s from the index
faster than 404s.

> If the business ever decides some of these services are still commercially
> important, the right move is to bring the page back, not to redirect it.

## 5. Blog content

At least one legacy blog post is indexed
(`/blog/retirement-moves-a-gentle-guide-to-house-removals-in-slough`). Removals
blog content is worth keeping — it supports the local landing pages.

**TODO:** export the blog from the old site and either (a) port the removals posts
onto the new site at their existing URLs, or (b) 301 each one to the most relevant
new page. Legacy posts about vehicle recovery/courier work should be retired with
the rest of that content.

---

## 6. Generated SEO files

`public/sitemap.xml`, `public/robots.txt` and `public/_redirects` are **generated**:

```sh
bun run seo:generate
```

The generator reads `src/config/services.ts`, `src/config/areas.ts`,
`src/config/redirects.ts` and `src/config/business.ts`. Edit those, not the files
in `public/`. Re-run it after adding a service, an area or a redirect.

Also in place:

- Canonical URL on every page (`src/lib/seo.ts`)
- `MovingCompany` structured data sitewide, plus `Service`, `FAQPage` and
  `BreadcrumbList` on the relevant pages (`src/lib/structured-data.ts`)
- **No sitewide noindex** — deliberately. An accidental noindex on an established
  domain is the fastest way to lose everything this migration protects.

---

## 7. Facts awaiting owner confirmation

Nothing unverified is published. Each of these is `null` in config and simply
doesn't render until it's filled in.

### `src/config/business.ts` → `businessClaims`

| Field                      | Legacy site claimed                        | Status                                              |
| -------------------------- | ------------------------------------------ | --------------------------------------------------- |
| `yearsExperience`          | "20+ years"                                | **Unconfirmed**                                     |
| `customersServed`          | "800+ happy customers"                     | **Unconfirmed**                                     |
| `vehicleNetwork`           | "1,000+ vehicles and drivers"              | **Unconfirmed**                                     |
| `movesCompleted`           | "12,000+ loads moved"                      | **Unconfirmed**                                     |
| `noHiddenCharges`          | "no hidden charges"                        | **Unconfirmed** — strong conversion message if true |
| `quoteResponseTime`        | "quotes within 1 hour"                     | **Unconfirmed**                                     |
| `bookingDepositPercentage` | "10% deposit"                              | **Unconfirmed**                                     |
| `foundedYear`              | 2003 in one place, "since 2005" in another | **Contradictory — do not publish**                  |
| `accreditations`           | BAR membership                             | **Unconfirmed**                                     |
| `available24Hours`         | "Open 24/7"                                | Confirmed by the owner brief — published            |

### `src/config/business.ts` → `pricing`

The legacy site advertised "from £40/hr". Not carried over. Set `hourlyFrom` and
`showFromPrice: true` once current pricing is confirmed.

### `src/config/business.ts` → `socials`, `googleBusiness`

The genuine Facebook / Instagram / X profile URLs and the Google Business Profile
review link could not be recovered. Add them and they appear in the footer, the
reviews section, and the JSON-LD `sameAs` array.

### `src/config/business.ts` → `whatsapp`

The old site offered WhatsApp but its configuration could not be inspected. The
primary mobile (`+44 7719 734031`) is used as the most likely number and flagged
`confirmed: false`. **Confirm this before launch.** Setting `number: null` removes
every WhatsApp CTA sitewide automatically.

### `src/config/reviews.ts`

- `approvedReviews` is **empty** — no invented reviewers or quotes.
- `googleSummary` (rating + count) is **null**, so no stale rating is displayed and
  no `aggregateRating` is emitted in structured data.
- Until real reviews are migrated, the reviews section shows the _themes_ customers
  consistently raise, plus a link to Google.

**TODO:** migrate genuine approved Google reviews into `approvedReviews`, or wire a
live Google Business Profile / Places integration into `googleSummary`.

### Address

No street address is published anywhere, and none is emitted in the JSON-LD —
the business is only publicly identified as being in London. Inventing one for
local-SEO purposes would be both false and a Google Business Profile risk. The
contact page uses an abstract coverage panel instead of a map pin.

---

## 8. Photography

The rebuild ships with **no photography**. Genuine TTT photographs (vans, teams,
loading, packing, real moves) could not be retrieved from the old site or the
repository, and generic stock imagery would undermine exactly the trust this site
needs to build.

**TODO before launch:** export the old site's gallery, pick the strongest genuine
images, convert to AVIF/WebP (keeping high-quality originals), and drop them into
the hero, service pages and area pages with descriptive alt text. The dark sections
are built with an abstract grid backdrop that photography can replace directly.

---

## 9. Pre-launch checklist

- [ ] Reconcile the URL inventory with Search Console (section 1)
- [ ] Deploy `_redirects` and verify each rule returns 301/410 as expected
- [ ] Confirm every value in section 7, or leave it unpublished
- [ ] Confirm the WhatsApp number
- [ ] Add genuine social profile URLs and the Google reviews link
- [ ] Migrate genuine reviews / connect the reviews integration
- [ ] Add genuine photography
- [ ] Port or redirect the blog
- [ ] Set `QUOTE_WEBHOOK_URL` so quote submissions are delivered (see below)
- [ ] Check Name/Address/Phone consistency against the Google Business Profile
      (primary number `07719 734031`, London UK, no street address)
- [ ] Submit the new sitemap in Search Console and watch Coverage for two weeks
- [ ] Have the legal pages reviewed — they're a starting point, not legal advice

---

## 10. Quote delivery

`src/lib/quote-request.ts` posts each enquiry as JSON to the endpoint in the
`QUOTE_WEBHOOK_URL` environment variable (email service, CRM, Zapier/Make hook,
Supabase function — anything that accepts a JSON POST).

If it isn't set, or delivery fails, the enquiry isn't lost: the success screen
falls back to prefilled email and WhatsApp actions containing the full move
summary, and the server logs the enquiry. **Set it before launch anyway** — the
fallback depends on the customer taking one more action.
