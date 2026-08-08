import { business, businessClaims, socialLinks } from "@/config/business";
import { canonicalFor } from "@/lib/seo";

/**
 * MovingCompany structured data.
 *
 * Deliberately omitted, because they are unverified:
 *  - postalAddress street details (the business is only publicly identified as
 *    London, UK — inventing a street address to game local SEO is not an option)
 *  - aggregateRating / reviewCount (see src/config/reviews.ts)
 *  - foundingDate (legacy site copy contradicted itself)
 *  - awards / accreditations
 */
export const movingCompanySchema = () => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${business.siteUrl}/#organization`,
    name: business.brandName,
    legalName: business.companyName,
    alternateName: business.brandExpanded,
    description: `${business.tagline} ${business.positioning}`,
    url: business.siteUrl,
    telephone: business.primaryPhoneTel,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    knowsAbout: [
      "House removals",
      "Office removals",
      "Commercial removals",
      "Local removals",
      "Long-distance removals",
      "International removals",
      "Packing and unpacking",
      "Storage",
    ],
  };

  if (businessClaims.available24Hours) {
    schema["openingHoursSpecification"] = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    };
  }

  if (socialLinks.length > 0) {
    schema["sameAs"] = socialLinks.map(([, url]) => url);
  }

  if (businessClaims.foundedYear) {
    schema["foundingDate"] = String(businessClaims.foundedYear);
  }

  return schema;
};

export const serviceSchema = (input: { name: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: input.name,
  name: input.name,
  description: input.description,
  url: canonicalFor(input.path),
  provider: { "@id": `${business.siteUrl}/#organization` },
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "Country", name: "United Kingdom" },
  ],
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: canonicalFor(c.path),
  })),
});
