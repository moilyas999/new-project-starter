import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/components/site/service-page";
import { getService } from "@/config/services";
import { seo } from "@/lib/seo";

const service = getService("local-removals")!;

export const Route = createFileRoute("/local-removals")({
  head: () =>
    seo({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/${service.slug}`,
    }),
  component: () => <ServicePage service={service} />,
});
