import type { Metadata } from "next";
import { pageMetadata } from "../../config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Explore GO-AI case studies and deployment outcomes across inspection, safety, and operations.",
  path: "/case-studies/",
});

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="section-eyebrow">Case Studies</p>
        <h1 className="section-title mt-3">Deployment Outcomes</h1>
        <p className="section-desc mt-6 max-w-3xl text-left">
          Real projects demonstrate how GO-AI improves safety workflows, reduces manual effort,
          and increases operational visibility.
        </p>

        <section className="mt-10 space-y-4">
          <article className="rounded-2xl border border-border bg-card/45 p-6">
            <h2 className="text-xl font-semibold">Construction Safety Inspection</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Multimodal inspection workflows reduced report turnaround time and improved hazard
              traceability for site teams.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card/45 p-6">
            <h2 className="text-xl font-semibold">Autonomous Patrol Use Case</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              AI-enabled robotic patrol provided continuous on-site visibility and supported faster
              escalation of risk events.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
