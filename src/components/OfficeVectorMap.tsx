"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import DottedMap from "dotted-map";
import { WorldMap } from "./ui/WorldMap";

/** Liven House, Kwun Tong — matches Google Maps */
export const OFFICE_COORDINATES: [number, number] = [
  114.2237972, 22.3091351,
];

const HK_OFFICE = {
  lat: 22.3091351,
  lng: 114.2237972,
  label: "Kwun Tong",
};

/** Single HQ pin only — arcs + overlay circles duplicated HK (pin + SVG) and added Singapore. */
const OFFICE_PINS_ARR = [HK_OFFICE];

type OfficeVectorMapProps = {
  mapLink: string;
  mapOpenLabel: string;
  officeLabel: string;
  livePinLabel: string;
  addressLabel: string;
};

/** Location block: dotted world map + office chrome. */
export function OfficeVectorMap({
  mapLink,
  mapOpenLabel,
  officeLabel,
  livePinLabel,
  addressLabel,
}: OfficeVectorMapProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const mapColors = useMemo(
    () => ({
      backgroundColor: isDark ? "#000000" : "#f4f4f5",
      mapDotColor: isDark
        ? "rgba(255,255,255,0.14)"
        : "rgba(0,0,0,0.14)",
    }),
    [isDark],
  );

  const pinAnchor = useMemo(() => {
    const map = new DottedMap({ height: 64, grid: "diagonal" });
    const placed = map.addPin({
      lat: HK_OFFICE.lat,
      lng: HK_OFFICE.lng,
      svgOptions: { color: "hsl(0, 78%, 58%)", radius: 0.42 },
    });
    if (!placed) return { left: 68.2, top: 45.2 };
    return {
      left: (placed.x / map.image.width) * 100,
      top: (placed.y / map.image.height) * 100,
    };
  }, []);

  return (
    <div className="group/map relative w-full overflow-hidden">
      <WorldMap
        connections={[]}
        pins={OFFICE_PINS_ARR}
        lineColor="hsl(0, 78%, 58%)"
        pinColor="hsl(0, 78%, 58%)"
        mapDotColor={mapColors.mapDotColor}
        backgroundColor={mapColors.backgroundColor}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_18%,rgba(255,0,76,0.06),transparent_45%),radial-gradient(circle_at_88%_70%,rgba(0,180,255,0.05),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-black/20 dark:from-black/15 dark:to-black/25"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background/90 to-transparent" />

      <div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[min(100%,18rem)] rounded-lg border border-border bg-card/90 px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground backdrop-blur-sm md:left-4 md:top-4 md:px-3 md:py-2 md:text-[11px]">
        <span className="text-primary">●</span> {livePinLabel}
      </div>
      <div
        className="pointer-events-none absolute z-20 hidden md:block"
        style={{ left: `${pinAnchor.left}%`, top: `${pinAnchor.top}%` }}
      >
        <span className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(239,68,68,0.2)]" />
        <div className="-ml-3 -translate-x-full -translate-y-[70%] rounded-xl border border-primary/30 bg-card/95 px-3.5 py-2.5 text-xs leading-relaxed text-foreground shadow-xl backdrop-blur-md md:min-w-[24rem]">
          {addressLabel}
        </div>
      </div>

      <a
        href={mapLink}
        target="_blank"
        rel="noreferrer"
        className="interactive-press absolute right-3 top-3 z-20 rounded-lg border border-border bg-card/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-foreground backdrop-blur-md transition-colors hover:border-primary/45 hover:bg-muted md:right-4 md:top-4 md:text-xs"
      >
        {mapOpenLabel}
      </a>

      <span className="sr-only">{officeLabel}</span>
    </div>
  );
}
