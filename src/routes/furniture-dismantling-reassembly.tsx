import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/components/site/service-page";
import { getService } from "@/config/services";
import { seo } from "@/lib/seo";

const service = getService("furniture-dismantling-reassembly")!;

export const Route = createFileRoute("/furniture-dismantling-reassembly")({
  head: () =>
    seo({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/${service.slug}`,
    }),
  component: () => <ServicePage service={service} />,
});
