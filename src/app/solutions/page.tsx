import type { Metadata } from "next";
import { pageMetadata } from "../../config/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Solutions",
  description:
    "Explore GO-AI solutions for multimodal safety inspection, robotics, computer vision, and operational AI workflows.",
  path: "/solutions/",
});

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="section-eyebrow">Solutions</p>
        <h1 className="section-title mt-3">AI Solutions for Real-World Operations</h1>
        <p className="section-desc mt-6 max-w-3xl text-left">
          GO-AI delivers practical AI systems for inspection, reporting, and safety workflows.
          Our solutions combine computer vision, language models, and robotics to help teams
          automate routine tasks and make faster decisions on site.
        </p>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card/45 p-5">
            <h2 className="text-xl font-semibold">Multimodal Safety Inspection</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Detect hazards, capture evidence, and generate structured reports with vision and
              language AI working together.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-5">
            <h2 className="text-xl font-semibold">Robotic Site Patrol</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Deploy AI-enabled hardware for autonomous patrol and continuous environmental
              monitoring in complex operational settings.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-5">
            <h2 className="text-xl font-semibold">Video & Image Intelligence</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use advanced visual analytics to track activity, identify anomalies, and improve
              quality and compliance workflows.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-5">
            <h2 className="text-xl font-semibold">Scalable Deployment</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Start from pilot sites and expand across teams with cloud and edge deployment models
              plus centralized governance.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
