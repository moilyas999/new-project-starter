import { business } from "@/config/business";

type SeoInput = {
  title: string;
  description: string;
  /** Absolute path, e.g. "/house-removals". Used for the canonical URL. */
  path: string;
  /** Set true only for pages that genuinely should not be indexed. */
  noindex?: boolean;
  image?: string;
};

export const canonicalFor = (path: string) => {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${business.siteUrl}${clean}`;
};

/**
 * Builds the `head` object for a route: title, description, Open Graph,
 * Twitter card and — importantly for this migration — a canonical URL.
 *
 * There is no site-wide noindex here by design: an accidental noindex on an
 * established domain is the fastest way to lose the search equity this rebuild
 * is meant to protect.
 */
export const seo = ({ title, description, path, noindex, image }: SeoInput) => {
  const url = canonicalFor(path);
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: `${business.brandName} — ${business.brandExpanded}` },
    { property: "og:locale", content: "en_GB" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, follow" });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
};
