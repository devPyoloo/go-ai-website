"use client";

/**
 * Fixed film grain + soft vignette for depth (pointer-events none).
 */
export function SiteAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] mix-blend-multiply dark:opacity-[0.035] dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(0,0,0,0.04)_0%,transparent_55%,rgba(0,0,0,0.06)_100%)] dark:bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_55%,rgba(0,0,0,0.12)_100%)]"
        aria-hidden
      />
    </>
  );
}
