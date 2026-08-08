# TTT — Total Transport Team Ltd

The removals website for **TTT** (Total Transport Team Ltd) — professional
removals from London to destinations across the UK.

This is a repositioning of an existing business on an existing, indexed domain,
not a new SEO property. **Read [`docs/seo-migration.md`](docs/seo-migration.md)
before changing URLs, and before launch** — it holds the redirect map, the URL
inventory and the pre-launch checklist.

## Where things live

| What                                                | Where                                          |
| --------------------------------------------------- | ---------------------------------------------- |
| Contact details, hours, coverage, brand names       | `src/config/business.ts`                       |
| Unverified marketing claims (all default to `null`) | `src/config/business.ts` → `businessClaims`    |
| Pricing                                             | `src/config/business.ts` → `pricing`           |
| Services (slugs match the legacy indexed URLs)      | `src/config/services.ts`                       |
| Areas covered / local landing pages                 | `src/config/areas.ts`                          |
| Reviews (empty until genuine ones are migrated)     | `src/config/reviews.ts`                        |
| Quote form options                                  | `src/config/quote.ts`                          |
| 301 redirect map                                    | `src/config/redirects.ts`                      |
| Meta, canonical URLs, JSON-LD                       | `src/lib/seo.ts`, `src/lib/structured-data.ts` |

Nothing above should be duplicated inside components — import it.

## Rules this codebase follows

1. **No unverified claims.** Customer counts, fleet size, founding year, response
   times, deposits, prices, accreditations and review ratings live in config and
   default to `null`. A `null` claim renders nothing.
2. **No invented facts.** No street address, no fake reviewers, no fake social
   handles, no `aggregateRating` in structured data.
3. **Removals only.** The legacy vehicle recovery, courier, pallet and chauffeur
   positioning is deliberately absent — see the redirect map.
4. **URLs are load-bearing.** Service slugs match the URLs already indexed on the
   live domain. Don't rename them for aesthetics.

## Regenerating SEO files

`public/sitemap.xml`, `public/robots.txt` and `public/_redirects` are generated
from config:

```sh
bun run seo:generate
```

## Quote submissions

Set `QUOTE_WEBHOOK_URL` in the hosting environment to any endpoint that accepts a
JSON POST. Without it, enquiries fall back to prefilled email/WhatsApp actions on
the success screen and are logged server-side.

---

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d6dbf86c-fca3-4dbf-9971-9c431cb463ae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
