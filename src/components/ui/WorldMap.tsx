"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import DottedMap from "dotted-map";

/**
 * Aceternity-style dotted world map. Overlay geometry must use `dotted-map`’s
 * pixel grid (Mercator + snapping) — not raw lat/lng → 800×400 — or pulses/lines
 * won’t sit on the baked pins.
 */

export type WorldMapPoint = { lat: number; lng: number; label?: string };

export type WorldMapConnection = {
  start: WorldMapPoint;
  end: WorldMapPoint;
};

type WorldMapProps = {
  connections?: WorldMapConnection[];
  pins?: WorldMapPoint[];
  pinPulse?: boolean;
  lineColor?: string;
  pinColor?: string;
  mapDotColor?: string;
  backgroundColor?: string;
  className?: string;
};

type MapLayer = {
  dataUri: string;
  width: number;
  height: number;
  /** Pin centers in the same coordinate system as the map SVG (from `map.pins`). */
  pinPixels: Array<{ x: number; y: number }>;
  connectionLayers: Array<{
    pathD: string;
    dots: Array<{ x: number; y: number }>;
    i: number;
  }>;
};

function buildMapLayer(
  pins: WorldMapPoint[],
  connections: WorldMapConnection[],
  pinColor: string,
  mapDotColor: string,
  backgroundColor: string,
): MapLayer {
  const map = new DottedMap({ height: 64, grid: "diagonal" });
  const pinPixels: Array<{ x: number; y: number }> = [];
  for (const p of pins) {
    const placed = map.addPin({
      lat: p.lat,
      lng: p.lng,
      svgOptions: { color: pinColor, radius: 0.42 },
    });
    if (placed) pinPixels.push({ x: placed.x, y: placed.y });
  }

  const w = map.image.width;
  const h = map.image.height;
  const lift = Math.max(10, h * 0.08);

  const connectionLayers = connections
    .map((dot, i) => {
      const s = map.getPin({ lat: dot.start.lat, lng: dot.start.lng });
      const e = map.getPin({ lat: dot.end.lat, lng: dot.end.lng });
      if (!s || !e) return null;
      if (Math.hypot(s.x - e.x, s.y - e.y) < 4) return null;
      const midX = (s.x + e.x) / 2;
      const midY = Math.min(s.y, e.y) - lift;
      const pathD = `M ${s.x} ${s.y} Q ${midX} ${midY} ${e.x} ${e.y}`;
      return {
        pathD,
        dots: [
          { x: s.x, y: s.y },
          { x: e.x, y: e.y },
        ],
        i,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  const svg = map.getSVG({
    radius: 0.22,
    color: mapDotColor,
    shape: "circle",
    backgroundColor,
  });

  return {
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    width: w,
    height: h,
    pinPixels,
    connectionLayers,
  };
}

export function WorldMap({
  connections = [],
  pins = [],
  pinPulse = true,
  lineColor = "hsl(0, 78%, 58%)",
  pinColor = "hsl(0, 78%, 58%)",
  mapDotColor = "rgba(255,255,255,0.16)",
  backgroundColor = "#000000",
  className = "",
}: WorldMapProps) {
  const reduceMotion = useReducedMotion();

  const layer = useMemo(
    () =>
      buildMapLayer(
        pins,
        connections,
        pinColor,
        mapDotColor,
        backgroundColor,
      ),
    [pins, connections, pinColor, mapDotColor, backgroundColor],
  );

  const pathTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const };

  const { dataUri, width, height, pinPixels, connectionLayers } = layer;

  return (
    <div
      className={`relative w-full overflow-hidden bg-background ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img
        src={dataUri}
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none block h-full w-full select-none object-contain object-center"
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        {connectionLayers.map(({ pathD, i }) => (
          <motion.path
            key={`arc-${i}`}
            d={pathD}
            fill="none"
            stroke={lineColor}
            strokeWidth={1.1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ ...pathTransition, delay: reduceMotion ? 0 : 0.12 * i }}
          />
        ))}
        {connectionLayers.flatMap(({ dots, i }) =>
          dots.map((pt, j) => (
            <motion.circle
              key={`dot-${i}-${j}`}
              cx={pt.x}
              cy={pt.y}
              r={3.5}
              fill={pinColor}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : 0.35 + i * 0.08,
              }}
            />
          )),
        )}
        {pinPulse &&
          !reduceMotion &&
          pinPixels.map((pt, i) => (
            <g key={`pin-pulse-${i}`} transform={`translate(${pt.x},${pt.y})`}>
              <motion.g
                initial={{ scale: 0.62, opacity: 0.42 }}
                animate={{ scale: 1.48, opacity: 0 }}
                transition={{
                  duration: 2.35,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <circle
                  r={Math.max(14, height * 0.05)}
                  fill="none"
                  stroke={pinColor}
                  strokeWidth={1}
                />
              </motion.g>
              <motion.g
                initial={{ scale: 0.62, opacity: 0.32 }}
                animate={{ scale: 1.48, opacity: 0 }}
                transition={{
                  duration: 2.35,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.85,
                }}
              >
                <circle
                  r={Math.max(14, height * 0.05)}
                  fill="none"
                  stroke={pinColor}
                  strokeWidth={1}
                />
              </motion.g>
            </g>
          ))}
      </svg>
    </div>
  );
}
