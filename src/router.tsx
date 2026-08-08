import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Warm the next page as soon as a link is hovered or touched.
    defaultPreload: "intent",
    // Cross-document-style transitions between routes where supported;
    // silently ignored elsewhere, and disabled by prefers-reduced-motion.
    defaultViewTransition: true,
  });

  return router;
};
