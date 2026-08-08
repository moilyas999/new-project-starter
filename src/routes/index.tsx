import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blank Start — Empty Project" },
      {
        name: "description",
        content: "An empty starting point, ready for your first feature.",
      },
      { property: "og:title", content: "Blank Start — Empty Project" },
      {
        property: "og:description",
        content: "An empty starting point, ready for your first feature.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Empty project
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Nothing here yet — tell me what to build.
        </p>
      </div>
    </main>
  );
}
