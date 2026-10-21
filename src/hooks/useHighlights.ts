import { useEffect, useMemo, useState } from "react";
import type {
  HighlightLocale,
  HighlightsData,
  HighlightsSectionContent,
  HighlightSlide,
  ResolvedHighlightSlide,
} from "../types/highlights";

const HIGHLIGHTS_URL = "/data/highlights.json";

function normalizeLocale(language: string): HighlightLocale {
  return language.startsWith("zh") ? "zh" : "en";
}

function resolveSlide(
  slide: HighlightSlide,
  locale: HighlightLocale
): ResolvedHighlightSlide | null {
  const content = slide.locales[locale] ?? slide.locales.en;
  if (!content) return null;

  return {
    key: slide.id,
    imageSrcs: slide.imageSrcs,
    sourceName: slide.sourceName,
    sourceUrl: slide.sourceUrl,
    ...content,
  };
}

export function useHighlights(language: string) {
  const [data, setData] = useState<HighlightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadHighlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(HIGHLIGHTS_URL, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to load highlights (${response.status})`);
        }

        const json = (await response.json()) as HighlightsData;
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load highlights");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadHighlights();

    return () => {
      cancelled = true;
    };
  }, []);

  const locale = normalizeLocale(language);

  const slides = useMemo(() => {
    return (data?.slides ?? [])
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((slide) => resolveSlide(slide, locale))
      .filter((slide): slide is ResolvedHighlightSlide => slide !== null);
  }, [data, locale]);

  const section: HighlightsSectionContent | undefined =
    data?.section?.[locale] ?? data?.section?.en;

  return { slides, section, loading, error, meta: data?.meta };
}
