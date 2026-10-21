export type PopupLocale = "en" | "zh";

export interface LatestPopupContent {
  badge: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageAlt: string;
  closeLabel: string;
  ctaLabel?: string;
}

export interface LatestPopupData {
  meta: {
    id: string;
    version: string;
    publishedAt: string;
    expiresAfterDays: number;
    enabled: boolean;
  };
  imageSrc: string;
  ctaHref?: string;
  locales: Partial<Record<PopupLocale, LatestPopupContent>>;
}

export interface ResolvedLatestPopup extends LatestPopupContent {
  id: string;
  imageSrc: string;
  ctaHref?: string;
  expiresAt: Date;
}
