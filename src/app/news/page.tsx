import type { Metadata } from "next";
import { pageMetadata } from "../../config/seo";

export const metadata: Metadata = pageMetadata({
  title: "News & Highlights",
  description:
    "Read the latest GO-AI media coverage, event participation, and company highlights.",
  path: "/news/",
});

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="section-eyebrow">News</p>
        <h1 className="section-title mt-3">News & Highlights</h1>
        <p className="section-desc mt-6 max-w-3xl text-left">
          Coverage and events featuring GO-AI technologies, including multimodal inspection and
          robotic safety demonstrations.
        </p>

        <section className="mt-10 space-y-4">
          <article className="rounded-2xl border border-border bg-card/45 p-6">
            <h2 className="text-xl font-semibold">GO-AI Featured at Hong Kong Construction AI Exhibition</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              GO-AI showcased practical multimodal AI workflows for safety inspection and
              on-site reporting.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-6">
            <h2 className="text-xl font-semibold">Industry Event Demonstration</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The team presented real deployment scenarios for AI-assisted patrol and operational
              risk detection in field environments.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
