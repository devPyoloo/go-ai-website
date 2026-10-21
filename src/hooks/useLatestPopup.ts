import { useEffect, useMemo, useState } from "react";
import type {
  LatestPopupData,
  PopupLocale,
  ResolvedLatestPopup,
} from "../types/latestPopup";

const POPUP_URL = "/data/latest-popup.json";
const DISMISS_PREFIX = "go-ai-latest-popup-dismissed:";

function normalizeLocale(language: string): PopupLocale {
  return language.startsWith("zh") ? "zh" : "en";
}

function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isDismissed(id: string): boolean {
  if (typeof window === "undefined") return false;

  // Clear legacy localStorage dismiss from earlier builds.
  window.localStorage.removeItem(`${DISMISS_PREFIX}${id}`);

  return window.sessionStorage.getItem(`${DISMISS_PREFIX}${id}`) === "1";
}

export function dismissLatestPopup(id: string): void {
  window.sessionStorage.setItem(`${DISMISS_PREFIX}${id}`, "1");
}

export function resetLatestPopupDismiss(id: string): void {
  window.sessionStorage.removeItem(`${DISMISS_PREFIX}${id}`);
}

function resolvePopup(
  data: LatestPopupData,
  locale: PopupLocale
): ResolvedLatestPopup | null {
  if (!data.meta.enabled) return null;

  const content = data.locales[locale] ?? data.locales.en;
  if (!content) return null;

  const publishedAt = parseDateOnly(data.meta.publishedAt);
  const expiresAt = addDays(publishedAt, data.meta.expiresAfterDays);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (today >= expiresAt) return null;

  return {
    id: data.meta.id,
    imageSrc: data.imageSrc,
    ctaHref: data.ctaHref,
    expiresAt,
    ...content,
  };
}

export function useLatestPopup(language: string) {
  const [data, setData] = useState<LatestPopupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadPopup = async () => {
      setLoading(true);

      try {
        const response = await fetch(POPUP_URL, { cache: "no-store" });
        if (!response.ok) return;

        const json = (await response.json()) as LatestPopupData;
        if (!cancelled) {
          setData(json);
          setDismissed(isDismissed(json.meta.id));
        }
      } catch {
        // Popup is optional — fail silently.
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPopup();

    return () => {
      cancelled = true;
    };
  }, []);

  const locale = normalizeLocale(language);

  const popup = useMemo(() => {
    if (!data || dismissed) return null;
    return resolvePopup(data, locale);
  }, [data, dismissed, locale]);

  return { popup, loading };
}
