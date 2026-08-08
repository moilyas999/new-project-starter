# House Moving Experts — rebrand & domain migration

The business is doing two things at once:

1. **Rebranding** from Total Transport Team (a general transport company) to
   **House Moving Experts** (a removals company).
2. **Moving domain** from `totaltransportteam.co.uk` to `housemovingexperts.com`.

Only the legal entity is unchanged: **Total Transport Team Ltd** remains the
registered company, with House Moving Experts as its trading name.

Doing both at once is the highest-risk kind of SEO change. A new domain starts
with zero authority, and the old domain holds every ranking the business has.
Everything below exists to move that authority across rather than abandon it.

> **The single most important file in this repo is
> `redirects/legacy-domain/_redirects`.** It is generated, it does NOT ship with
> this site, and it must be deployed on `totaltransportteam.co.uk`. Without it,
> the rebrand starts from nothing.

---

## 1. What was verified, and what wasn't

The old website could not be crawled from the build environment (the domain is
blocked by the network egress proxy), so the URL inventory below was
reconstructed from search-engine results plus the brief supplied by the owner.

**Before go-live you must reconcile this against the real inventory:**

1. Google Search Console → **Pages** report → export every indexed URL.
2. Search Console → **Performance** → export 12 months of pages by
   clicks/impressions, so pages with genuine removals traffic are obvious.
3. Server access logs / the old CMS sitemap for anything Search Console misses.
4. Compare against `src/config/redirects.ts` and add anything not covered.

Anything not in the map falls through to the catch-all rule and lands on the new
homepage. That prevents dead links, but a homepage catch-all passes far less
signal than a one-to-one redirect — so every URL worth keeping deserves an
explicit rule.

---

## 2. Paths that stay identical

These legacy removals paths exist unchanged on the new domain, so each gets a
clean one-to-one hop — the strongest signal to Google that the page simply moved
rather than being replaced by something vaguely similar.

| Path                              | On the new domain                              |
| --------------------------------- | ---------------------------------------------- |
| `/`                               | Homepage                                       |
| `/house-removals`                 | Rebuilt                                        |
| `/house-removals/slough`          | Rebuilt as a local landing page                |
| `/office-removals`                | Rebuilt                                        |
| `/commercial-moving`              | Rebuilt (now also covers warehouse moves)      |
| `/local-removals`                 | Rebuilt                                        |
| `/long-distance-moving`           | Rebuilt                                        |
| `/international-moving`           | Rebuilt, refocused on household/business moves |
| `/packing-and-unpacking-services` | Rebuilt                                        |
| `/storage-services`               | Rebuilt                                        |
| `/about`                          | Rewritten around removals and the new name     |
| `/contact`                        | Rebuilt                                        |

New paths added: `/services`, `/quote`, `/reviews`, `/areas-we-cover`,
`/furniture-dismantling-reassembly`, `/house-removals/<area>` (11 further areas)
and three legal pages.

## 3. Consolidated paths (301)

| From                             | To                   | Why                                             |
| -------------------------------- | -------------------- | ----------------------------------------------- |
| `/warehouse-moving`              | `/commercial-moving` | Warehouse moves folded into Commercial Removals |
| `/man-van-services`              | `/local-removals`    | Man-and-van intent is a short local move        |
| `/moving-services`               | `/services`          | Legacy services hub                             |
| `/quote-request`, `/get-a-quote` | `/quote`             | Legacy enquiry form                             |

## 4. Retired paths (not redirected)

The business no longer markets vehicle recovery, courier, pallet, chauffeur or
airport work, and no removals page matches the intent behind those searches.
Redirecting them to the new homepage would create soft 404s on a brand-new
domain that has no authority to spare, so they are retired:

`/vehicle-transport-recovery`, `/car-recovery`, `/car-transport`,
`/roadside-assistance`, `/jump-start-services`, `/breakdown-recovery/*`,
`/courier-services`, `/pallet-delivery`, `/executive-travel`, `/chauffeur-hire`,
`/airport-transfers`, `/limousine-hire`.

Preferred handling is **HTTP 410 Gone**; the generated files use `404` because
Cloudflare Pages' `_redirects` format doesn't support 410. On a host that does
(Netlify, or a small worker), switch them — Google drops 410s faster.

---

## 5. The two redirect files

`bun run seo:generate` writes both from `src/config/redirects.ts`:

| File                                 | Deploy on      | Purpose                                                    |
| ------------------------------------ | -------------- | ---------------------------------------------------------- |
| `public/_redirects`                  | **New** domain | Path consolidations for anyone landing on an old path here |
| `redirects/legacy-domain/_redirects` | **Old** domain | Absolute 301s onto the new domain — this is the migration  |

The legacy file ends with a `/*` catch-all to the new homepage so nothing dies,
but treat that as a safety net, not a plan.

---

## 6. Launch sequence

Order matters. Doing these out of sequence is how domain migrations lose
rankings.

1. **Launch the new site** on `housemovingexperts.com` and confirm it's fully
   crawlable — every page returns 200, canonicals point at the new domain, and
   there is no stray `noindex`.
2. **Verify both domains** in Google Search Console (you need ownership of both
   for step 4).
3. **Deploy `redirects/legacy-domain/_redirects`** on the old domain and spot-check
   a dozen URLs actually return `301` to the right target.
4. **File a Change of Address** in Search Console on the old property, pointing at
   the new one. This is the step most people skip; it materially speeds up
   transfer.
5. **Submit the new sitemap** (`https://housemovingexperts.com/sitemap.xml`) on the
   new property.
6. **Keep the old domain registered and redirecting for at least a year** —
   ideally permanently. Letting it lapse hands the redirects (and any residual
   traffic) to whoever buys it next.
7. **Update off-site references**: Google Business Profile, Facebook, Instagram,
   X, any directory listings, Checkatrade, invoices, van livery, email
   signatures. Inbound links pointing at the old domain still work via the
   redirects, but the profiles you control should point at the new domain
   directly.
8. **Watch Search Console** weekly for the first two months: Coverage errors,
   Performance on both properties (old should fall as new rises), and the
   crawl-stats graph.

Expect a dip. A well-executed domain move typically recovers over roughly
4–12 weeks. If the new domain is still flat after that, the usual causes are
missing redirects or a Change of Address that was never filed.

---

## 7. Brand-name searches

People already search for "Total Transport Team". Those searches must still land
somewhere sensible:

- The redirects handle anyone clicking an old search result.
- The site keeps `Total Transport Team Ltd` as the legal name in the footer,
  legal pages and JSON-LD `legalName`, and `Total Transport Team` as
  `alternateName` in the structured data — so the association is machine-readable.
- The About page explains the name change in plain English rather than pretending
  the business is new.

**TODO(owner):** rename the Google Business Profile rather than creating a new
one. Creating a second listing splits reviews and local ranking signals — the
existing profile carries the review history and should be edited in place.

---

## 8. Email is still on the old domain

`info@totaltransportteam.co.uk` is published site-wide because it is the
**confirmed working address**. It was deliberately not switched to a
`@housemovingexperts.com` address, because inventing a mailbox that doesn't
receive mail loses enquiries silently.

**TODO(owner):** set up mail on the new domain, forward the old address to it,
then change `business.email` in `src/config/business.ts` — one value, used
everywhere.

---

## 9. Generated SEO files

```sh
bun run seo:generate
```

Reads `src/config/{services,areas,redirects,business}.ts` and writes
`public/sitemap.xml`, `public/robots.txt`, `public/_redirects` and
`redirects/legacy-domain/_redirects`. Edit config, not the output. Re-run after
adding a service, an area or a redirect.

Also in place: a canonical URL on every page (`src/lib/seo.ts`), and
`MovingCompany` / `Service` / `FAQPage` / `BreadcrumbList` structured data
(`src/lib/structured-data.ts`). There is deliberately **no sitewide noindex** —
on a launching domain that is the fastest way to lose everything.

---

## 10. Facts awaiting owner confirmation

Nothing unverified is published. Each of these is `null` in config and renders
nothing until filled in.

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
| `available24Hours`         | "Open 24/7"                                | Confirmed by the owner — published                  |

A note on the new name: "Experts" is brand naming, not a factual claim, so it
sits outside this policy. But it does raise the bar on everything else — a
company called House Moving Experts publishing an unverifiable "12,000+ moves"
figure is a worse look than an anonymous one doing it.

### `src/config/business.ts` → `pricing`

Legacy site advertised "from £40/hr". Not carried over. Set `hourlyFrom` and
`showFromPrice: true` once confirmed.

### `src/config/business.ts` → `socials`, `googleBusiness`

Genuine profile URLs could not be recovered. Add them and they appear in the
footer and in the JSON-LD `sameAs` array.

### `src/config/business.ts` → `whatsapp`

The old site offered WhatsApp but its configuration couldn't be inspected. The
primary mobile is used as the most likely number, flagged `confirmed: false`.
**Confirm before launch.** Setting `number: null` removes every WhatsApp CTA
sitewide.

### `src/config/reviews.ts`

`approvedReviews` is empty and `googleSummary` is `null` — no invented reviewers,
no stale rating, and no `aggregateRating` in structured data. Until real reviews
are migrated, the reviews section shows the themes customers raise and links to
Google.

### Address

No street address is published or emitted in JSON-LD — the business is only
publicly identified as being in London. Inventing one for local SEO would be
false and a Google Business Profile risk.

---

## 11. Photography

The site ships with **no photography**. Genuine images couldn't be retrieved from
the old site, and stock imagery would undermine the trust this site needs.

**TODO(owner):** export the old gallery, pick the strongest genuine images,
convert to AVIF/WebP (keeping originals) and drop them into the hero, service and
area pages with descriptive alt text. Van livery in those photos will still show
the old branding — worth reshooting once vehicles are rebranded.

---

## 12. Pre-launch checklist

- [ ] Reconcile the URL inventory with Search Console (section 1)
- [ ] Deploy `redirects/legacy-domain/_redirects` on the old domain and spot-check it
- [ ] Work through the launch sequence in section 6 **in order**
- [ ] File the Change of Address in Search Console
- [ ] Rename the existing Google Business Profile (don't create a new one)
- [ ] Set up mail on the new domain, then update `business.email`
- [ ] Confirm every value in section 10, or leave it unpublished
- [ ] Confirm the WhatsApp number
- [ ] Add genuine social profile URLs and the Google reviews link
- [ ] Migrate genuine reviews / connect the reviews integration
- [ ] Add genuine photography
- [ ] Port or redirect the blog (`/blog/...` posts are indexed on the old domain)
- [ ] Set `QUOTE_WEBHOOK_URL` so quote submissions are delivered
- [ ] Check Name/Address/Phone consistency across the new site, GBP and directories
- [ ] Have the legal pages reviewed — they're a starting point, not legal advice

---

## 13. Quote delivery

`src/lib/quote-request.ts` posts each enquiry as JSON to `QUOTE_WEBHOOK_URL`
(email service, CRM, Zapier/Make hook, Supabase function — anything accepting a
JSON POST).

If it isn't set, or delivery fails, the enquiry isn't lost: the success screen
falls back to prefilled email and WhatsApp actions containing the full move
summary, and the server logs it. **Set it before launch anyway** — the fallback
depends on the customer taking one more action.
