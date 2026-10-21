export type HighlightLocale = "en" | "zh";

export interface HighlightSlideContent {
  featuredLabel: string;
  summary: string;
  articleTag: string;
  articleTitle: string;
  articleBody: string;
  caption: string;
  imageAlt: string;
}

export interface HighlightSlide {
  id: string;
  order?: number;
  imageSrcs: string[];
  sourceName: string;
  sourceUrl: string;
  locales: Partial<Record<HighlightLocale, HighlightSlideContent>>;
}

export interface HighlightsSectionContent {
  title: string;
  subtitle: string;
}

export interface HighlightsData {
  meta: {
    version: string;
    updatedAt: string;
  };
  section: Partial<Record<HighlightLocale, HighlightsSectionContent>>;
  slides: HighlightSlide[];
}

export interface ResolvedHighlightSlide extends HighlightSlideContent {
  key: string;
  imageSrcs: string[];
  sourceName: string;
  sourceUrl: string;
}
