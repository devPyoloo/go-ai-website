import type { Metadata } from "next";
import { pageMetadata } from "../../config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Technology",
  description:
    "Discover GO-AI technology capabilities across computer vision, multimodal language models, and scalable ML infrastructure.",
  path: "/technology/",
});

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="section-eyebrow">Technology</p>
        <h1 className="section-title mt-3">Technology Behind GO-AI</h1>
        <p className="section-desc mt-6 max-w-3xl text-left">
          Our platform combines computer vision, language intelligence, and machine learning
          infrastructure to deliver practical AI workflows for operations teams.
        </p>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card/45 p-5">
            <h2 className="text-lg font-semibold">Computer Vision</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Real-time detection, tracking, and visual analytics for field and industrial use cases.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-5">
            <h2 className="text-lg font-semibold">Multimodal LLM</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Language and visual context combined for explanation, reporting, and action support.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-5">
            <h2 className="text-lg font-semibold">ML Infrastructure</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Deploy on cloud or edge with scalable pipelines and governance-ready architecture.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
