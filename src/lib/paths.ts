import type { LinkProps } from "@tanstack/react-router";

/** Any route path known to the router. */
export type AppPath = NonNullable<LinkProps["to"]>;

/**
 * Narrows a path string built from config data (service slugs, area slugs) to
 * the router's path union. Route paths and config slugs are kept in sync
 * deliberately — see docs/seo-migration.md.
 */
export const path = (p: string) => p as AppPath;
