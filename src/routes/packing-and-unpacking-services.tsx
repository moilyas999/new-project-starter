import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/components/site/service-page";
import { getService } from "@/config/services";
import { seo } from "@/lib/seo";

const service = getService("packing-and-unpacking-services")!;

export const Route = createFileRoute("/packing-and-unpacking-services")({
  head: () =>
    seo({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/${service.slug}`,
    }),
  component: () => <ServicePage service={service} />,
});
