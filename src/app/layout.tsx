import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../components/I18nProvider";
import { LatestNewsPopup } from "../components/LatestNewsPopup";
import { ThemeProvider } from "../components/ThemeProvider";
import { SITE_URL } from "../config/seo";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "GO-AI | AI Visual Intelligence & Advanced AI Solutions",
    template: "%s | GO-AI",
  },
  description: "GO AI empowers businesses with cutting-edge AI solutions including computer vision, natural language processing, and real-time video analytics. Transform visual and language data into actionable intelligence.",
  keywords: [
    "AI solutions",
    "artificial intelligence",
    "computer vision",
    "machine learning",
    "video analytics",
    "OCR",
    "document processing",
    "robotic vision",
    "AI automation",
    "visual intelligence",
    "NLP",
    "natural language processing",
    "edge AI",
    "AI platform",
  ],
  authors: [{ name: "GO-AI" }],
  creator: "GO-AI",
  publisher: "GO-AI",
  metadataBase: new URL(SITE_URL),
  // Homepage canonical only. Child routes set their own via pageMetadata().
  // No hreflang until languages have distinct URLs (client i18n is not crawlable).
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "GO-AI",
    title: "GO-AI | AI Visual Intelligence & Advanced AI Solutions",
    description: "Transform your business with cutting-edge AI solutions. Computer vision, video analytics, OCR, and intelligent automation powered by advanced AI technology.",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "GO-AI - AI Visual Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GO-AI | AI Visual Intelligence & Advanced AI Solutions",
    description: "Transform your business with cutting-edge AI solutions. Computer vision, video analytics, OCR, and intelligent automation.",
    images: ["/images/thumbnail.png"],
    creator: "@goai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/images/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon-180.png",
  },
  verification: {
    google: "wnwtC7xug63bGAdEel9MhKYL5spIItSmAG0JfOZbDcA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GO-AI",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/thumbnail.png`,
    description:
      "GO AI empowers businesses with cutting-edge AI solutions including computer vision, natural language processing, and real-time video analytics.",
    email: "info@go-ai.one",
    telephone: "+852-9731-3100",
    areaServed: {
      "@type": "Country",
      name: "Hong Kong",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@go-ai.one",
      telephone: "+852-9731-3100",
      availableLanguage: ["English", "Chinese"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room 923, 9/F, Liven House, 61-63 King Yip Street",
      addressLocality: "Kwun Tong",
      addressRegion: "Kowloon",
      addressCountry: "HK",
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GO-AI",
    url: SITE_URL,
    description: "AI Visual Intelligence & Advanced AI Solutions Platform",
    inLanguage: "en",
  };

  return (
    <html lang="en" className={fontSans.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider>
            {children}
            <LatestNewsPopup />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

