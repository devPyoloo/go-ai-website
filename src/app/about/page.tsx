import type { Metadata } from "next";
import { pageMetadata } from "../../config/seo";

export const metadata: Metadata = pageMetadata({
  title: "About GO-AI",
  description:
    "Learn about GO-AI and our mission to bring practical, field-ready AI solutions to safety, inspection, and operations teams.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="section-eyebrow">About</p>
        <h1 className="section-title mt-3">Applied AI for Safer, Smarter Operations</h1>
        <p className="section-desc mt-6 max-w-3xl text-left">
          GO-AI focuses on practical implementation. We build AI systems that are designed for
          real-world workflows, not demo-only environments. Our work combines robotics, computer
          vision, and language models to support inspection, risk detection, and reporting.
        </p>

        <section className="mt-10 space-y-4">
          <article className="rounded-2xl border border-border bg-card/45 p-6">
            <h2 className="text-xl font-semibold">Our Approach</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We prioritize deployment readiness, measurable outcomes, and scalability from pilot
              to multi-site rollout.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-6">
            <h2 className="text-xl font-semibold">What We Build</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              AI-powered patrol systems, multimodal inspection workflows, and visual analytics
              solutions for operations and safety teams.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
