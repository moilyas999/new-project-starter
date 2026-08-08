import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/components/site/service-page";
import { getService } from "@/config/services";
import { seo } from "@/lib/seo";

const service = getService("storage-services")!;

export const Route = createFileRoute("/storage-services")({
  head: () =>
    seo({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/${service.slug}`,
    }),
  component: () => <ServicePage service={service} />,
});
